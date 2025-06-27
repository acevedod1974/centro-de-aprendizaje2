import { render, screen } from "@testing-library/react";
import EngranajCalculator from "../EngranajCalculator";

describe("EngranajCalculator", () => {
  it("renders loading state for materials", () => {
    render(<EngranajCalculator />);
    expect(screen.getByText(/cargando datos/i)).toBeInTheDocument();
  });
  // Add more tests for material/app fetch, calculation, and error handling
});
