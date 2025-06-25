import { render, screen } from "@testing-library/react";
import ForjadoSimulator from "../ForjadoSimulator";

describe("ForjadoSimulator", () => {
  it("renders loading state", () => {
    render(<ForjadoSimulator />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  // Add more tests for error, simulation, and analytics
});
