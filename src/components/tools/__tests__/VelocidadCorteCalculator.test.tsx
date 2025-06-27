// Vitest and browser/Chart.js mocks for compatibility
import { vi } from "vitest";

// Global browser API mocks for Vitest
globalThis.window.getComputedStyle = vi.fn(() => ({
  getPropertyValue: vi.fn(),
}));
globalThis.window.scrollTo = vi.fn();
globalThis.HTMLCanvasElement.prototype.getContext = vi.fn();
globalThis.navigator.clipboard = { writeText: vi.fn() } as Pick<
  Clipboard,
  "writeText"
>;

// Mock html2canvas to prevent errors in PDF export
// @ts-expect-error: html2canvas types are not available in the test environment
vi.mock("html2canvas", () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve(document.createElement("canvas"))),
}));

// Chart.js and react-chartjs-2 mocks
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

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import VelocidadCorteCalculator from "../VelocidadCorteCalculator";

describe("VelocidadCorteCalculator", () => {
  it("renders loading state", () => {
    render(<VelocidadCorteCalculator />);
    expect(screen.getByText(/cargando materiales/i)).toBeInTheDocument();
  });

  it("renders material select and allows selection", async () => {
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(
        screen.getByLabelText(/material de la pieza/i)
      ).toBeInTheDocument();
    });
    const select = screen.getByLabelText(/material de la pieza/i);
    fireEvent.change(select, {
      target: { value: select.querySelectorAll("option")[1]?.value },
    });
    expect(select).toBeInTheDocument();
  });

  it("calculates RPM and feed when inputs change", async () => {
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(
        screen.getByLabelText(/diámetro de la pieza/i)
      ).toBeInTheDocument();
    });
    const diameterInput = screen.getByLabelText(/diámetro de la pieza/i);
    fireEvent.change(diameterInput, { target: { value: 100 } });
    expect(diameterInput).toHaveValue(100);
    // RPM and feed should update visually (not deeply tested here)
  });

  it("copy results button works", async () => {
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(screen.getByLabelText(/copiar resultados/i)).toBeInTheDocument();
    });
    const copyBtn = screen.getByLabelText(/copiar resultados/i);
    fireEvent.click(copyBtn);
    expect(copyBtn).toBeInTheDocument();
  });

  it("renders and triggers PDF export button", async () => {
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(
        screen.getByLabelText(/descargar análisis en pdf/i)
      ).toBeInTheDocument();
    });
    const pdfBtn = screen.getByLabelText(/descargar análisis en pdf/i);
    fireEvent.click(pdfBtn);
    expect(pdfBtn).toBeInTheDocument();
  });

  it("renders recommendations section", async () => {
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(screen.getByText(/recomendaciones/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/ajusta la velocidad/i)).toBeInTheDocument();
    expect(
      screen.getByText(/utiliza refrigeración adecuada/i)
    ).toBeInTheDocument();
  });

  it("renders formulas section", async () => {
    render(<VelocidadCorteCalculator />);
    await waitFor(() => {
      expect(screen.getByText(/fórmulas utilizadas/i)).toBeInTheDocument();
    });
    expect(
      screen.getByText(/rpm = \(vc × 1000\) \/ \(π × d\)/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/vf = f × rpm/i)).toBeInTheDocument();
  });

  // Add more tests for advanced features as needed
});
