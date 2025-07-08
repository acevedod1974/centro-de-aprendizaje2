import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToleranciaCalculator from "../ToleranciaCalculator";

// Polyfills and mocks for jsdom limitations and Chart.js
beforeAll(() => {
  // Mock getComputedStyle
  if (!window.getComputedStyle) {
    window.getComputedStyle = () => ({
      getPropertyValue: () => "",
    });
  }
  // Mock scrollTo
  if (!window.scrollTo) {
    window.scrollTo = () => {};
  }
  // Mock canvas getContext
  if (!HTMLCanvasElement.prototype.getContext) {
    HTMLCanvasElement.prototype.getContext = () => ({
      fillRect: () => {},
      clearRect: () => {},
      getImageData: () => ({ data: [] }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 0 }),
      transform: () => {},
      rect: () => {},
      clip: () => {},
    });
  }
});

describe("ToleranciaCalculator", () => {
  it("renders input fields", () => {
    render(<ToleranciaCalculator />);
    expect(
      screen.getByLabelText("Dimensión nominal del agujero")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Dimensión nominal del eje")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Grado de tolerancia")).toBeInTheDocument();
    expect(screen.getByLabelText("Desviación fundamental")).toBeInTheDocument();
  });

  // Add more tests for calculation and error handling
});

describe("ToleranciaCalculator (integración y casos avanzados)", () => {
  it("muestra advertencia si la dimensión nominal es inválida o extrema", async () => {
    render(<ToleranciaCalculator />);
    const input = screen.getByLabelText("Dimensión nominal del agujero");
    fireEvent.change(input, { target: { value: -10 } });
    // Si hay validación, debería mostrar advertencia o error
    // (ajustar el texto según la implementación real)
    expect(
      screen.getAllByText(/inválido|error|fuera de rango/i).length
    ).toBeGreaterThan(0);
    fireEvent.change(input, { target: { value: 10000 } });
    expect(
      screen.getAllByText(/inválido|error|fuera de rango/i).length
    ).toBeGreaterThan(0);
  });

  it("calcula y muestra ajuste con holgura, interferencia y transición", async () => {
    render(<ToleranciaCalculator />);
    // Holgura
    fireEvent.change(screen.getByLabelText("Dimensión nominal del agujero"), {
      target: { value: 50 },
    });
    fireEvent.change(screen.getByLabelText("Grado de tolerancia"), {
      target: { value: "IT7" },
    });
    fireEvent.change(screen.getByLabelText("Desviación fundamental"), {
      target: { value: "h" },
    });
    fireEvent.change(screen.getByLabelText("Dimensión nominal del eje"), {
      target: { value: 49 },
    });
    fireEvent.change(screen.getByLabelText("Tolerancia del eje"), {
      target: { value: "g6" },
    });
    expect(screen.getByText(/ajuste con holgura/i)).toBeInTheDocument();
    // Interferencia
    fireEvent.change(screen.getByLabelText("Dimensión nominal del eje"), {
      target: { value: 52 },
    });
    expect(screen.getByText(/ajuste con interferencia/i)).toBeInTheDocument();
    // Transición
    fireEvent.change(screen.getByLabelText("Dimensión nominal del eje"), {
      target: { value: 50 },
    });
    expect(screen.getByText(/ajuste de transición/i)).toBeInTheDocument();
  });

  it("restablece los valores al hacer clic en reiniciar", async () => {
    render(<ToleranciaCalculator />);
    fireEvent.change(screen.getByLabelText("Dimensión nominal del agujero"), {
      target: { value: 80 },
    });
    fireEvent.click(screen.getByLabelText(/reiniciar calculadora/i));
    await waitFor(() => {
      expect(
        screen.getByLabelText("Dimensión nominal del agujero")
      ).toHaveValue(50);
    });
  });

  it("muestra advertencia si se selecciona un grado o desviación inválida", async () => {
    render(<ToleranciaCalculator />);
    fireEvent.change(screen.getByLabelText("Grado de tolerancia"), {
      target: { value: "IT99" },
    });
    expect(
      screen.getAllByText(/inválido|error|no soportado/i).length
    ).toBeGreaterThan(0);
    fireEvent.change(screen.getByLabelText("Desviación fundamental"), {
      target: { value: "z" },
    });
    expect(
      screen.getAllByText(/inválido|error|no soportado/i).length
    ).toBeGreaterThan(0);
  });
});
