import { render, screen } from "@testing-library/react";
import MecanizadoSimulator from "../MecanizadoSimulator";

describe("MecanizadoSimulator", () => {
  it("renders loading state", () => {
    render(<MecanizadoSimulator />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  // Add more tests for simulation and analytics
});
