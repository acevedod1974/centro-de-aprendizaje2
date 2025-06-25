import { render, screen } from "@testing-library/react";
import MaterialesCalculator from "../MaterialesCalculator";

describe("MaterialesCalculator", () => {
  it("renders loading state", () => {
    render(<MaterialesCalculator />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  // Add more tests for material selection, calculation, and error handling
});
