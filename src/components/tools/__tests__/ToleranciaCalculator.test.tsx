import { render, screen } from "@testing-library/react";
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
    expect(screen.getByLabelText(/dimensión nominal/i)).toBeInTheDocument();
  });

  // Add more tests for calculation and error handling
});
