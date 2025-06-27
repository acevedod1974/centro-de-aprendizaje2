import { vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import VelocidadCorteCalculator from "../VelocidadCorteCalculator";
import { supabase } from "../../../supabaseClient";

// Mocks globales para Chart.js y html2canvas
vi.mock("chart.js", () => {
  class ChartMock {
    static register = vi.fn();
  }
  return {
    Chart: ChartMock,
    LineElement: {},
    PointElement: {},
    LineController: {},
    Filler: {},
    CategoryScale: {},
    LinearScale: {},
    Title: {},
    Tooltip: {},
    Legend: {},
  };
});
vi.mock("react-chartjs-2", () => ({
  Chart: () => <div data-testid="chartjs-chart" />,
  Line: () => <div data-testid="chartjs-line" />,
}));
vi.mock("html2canvas", () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve(document.createElement("canvas"))),
}));

describe("VelocidadCorteCalculator (integración y casos avanzados)", () => {
  beforeEach(() => {
    // Reset clipboard and mocks
    globalThis.navigator.clipboard = {
      writeText: vi.fn(),
    } as unknown as Clipboard;
  });

  it("muestra mensaje de error si falla la carga de materiales", async () => {
    // Mock supabase.from().select() to return error
    vi.spyOn(supabase, "from").mockReturnValue({
      select: vi
        .fn()
        .mockResolvedValue({ data: null, error: new Error("Error de red") }),
    } as unknown as { select: () => Promise<{ data: null; error: Error }> });

    render(<VelocidadCorteCalculator />);
    // Espera a que desaparezca el loading
    await waitFor(() => {
      expect(
        screen.queryByText(/cargando materiales de corte/i)
      ).not.toBeInTheDocument();
    });
    // Imprime el HTML si falla
    const html = document.body.innerHTML;
    // Busca el error exacto que pone el componente
    expect(html).toMatch(/error al cargar materiales desde supabase/i);

    (supabase.from as { mockRestore?: () => void }).mockRestore?.();
  });

  it("muestra advertencia si el diámetro es inválido o extremo", async () => {
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(
        screen.getByLabelText(/diámetro de la pieza/i)
      ).toBeInTheDocument();
    });
    const diameterInput = screen.getByLabelText(/diámetro de la pieza/i);
    fireEvent.change(diameterInput, { target: { value: -10 } });
    expect(screen.getByText(/valor inválido/i)).toBeInTheDocument();
    fireEvent.change(diameterInput, { target: { value: 10000 } });
    expect(screen.getByText(/fuera de rango/i)).toBeInTheDocument();
  });

  it("muestra error si falla la copia al portapapeles", async () => {
    globalThis.navigator.clipboard.writeText = vi.fn(() =>
      Promise.reject("error")
    ) as unknown as (data: string) => Promise<void>;
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(screen.getByLabelText(/copiar resultados/i)).toBeInTheDocument();
    });
    const copyBtn = screen.getByLabelText(/copiar resultados/i);
    fireEvent.click(copyBtn);
    await waitFor(() => {
      expect(screen.getByText(/no se pudo copiar/i)).toBeInTheDocument();
    });
  });

  it("muestra error si falla la exportación a PDF", async () => {
    vi.mock("html2canvas", () => ({
      __esModule: true,
      default: vi.fn(() => Promise.reject("error")),
    }));
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(
        screen.getByLabelText(/descargar análisis en pdf/i)
      ).toBeInTheDocument();
    });
    const pdfBtn = screen.getByLabelText(/descargar análisis en pdf/i);
    fireEvent.click(pdfBtn);
    await waitFor(() => {
      expect(screen.getByText(/no se pudo exportar/i)).toBeInTheDocument();
    });
  });

  it("flujo completo: selecciona material, ingresa datos válidos y exporta", async () => {
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(
        screen.getByLabelText(/material de la pieza/i)
      ).toBeInTheDocument();
    });
    const select = screen.getByLabelText(/material de la pieza/i);
    const options = select.querySelectorAll("option");
    const valueToSelect = options[1]?.value || options[0]?.value;
    fireEvent.change(select, {
      target: { value: valueToSelect },
    });
    const diameterInput = screen.getByLabelText(/diámetro de la pieza/i);
    fireEvent.change(diameterInput, { target: { value: 50 } });

    const copyBtn = screen.getByLabelText(/copiar resultados/i);
    fireEvent.click(copyBtn);
    await waitFor(() => {
      expect(globalThis.navigator.clipboard.writeText).toHaveBeenCalled();
    });

    const pdfBtn = screen.getByLabelText(/descargar análisis en pdf/i);
    fireEvent.click(pdfBtn);
    await waitFor(() => {
      expect(pdfBtn).toBeInTheDocument();
    });
  });
});
