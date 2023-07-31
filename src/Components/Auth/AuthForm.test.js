import { render, screen } from "@testing-library/react";
import AuthForm from "./AuthForm";

describe("All component", () => {
  test("Auth Form", () => {
    render(<AuthForm />);
    const loginElememnt = screen.getByText("Login");
    expect(loginElememnt).toBeInTheDocument();
  });
});
