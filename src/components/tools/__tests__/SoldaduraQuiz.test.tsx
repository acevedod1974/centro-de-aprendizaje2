import { render, screen } from "@testing-library/react";
import SoldaduraQuiz from "../SoldaduraQuiz";

describe("SoldaduraQuiz", () => {
  it("renders loading state", () => {
    render(<SoldaduraQuiz />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  // Add more tests for quiz logic, level selection, and error handling
});
