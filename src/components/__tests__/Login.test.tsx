import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login, { ComponentProps } from "../login-page";
import * as ApiService from "../../utils/apis";

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mock ApiService
jest.mock("../../utils/apis");

describe("Login Component", () => {
  const setUserId = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login userId={0} setUserId={setUserId} />
      </MemoryRouter>
    );
  });

  test("renders login form", () => {
    expect(screen.getByLabelText(/user name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("updates username on input change", () => {
    const input = screen.getByLabelText(/user name/i);
    fireEvent.change(input, { target: { value: "testuser" } });
    expect(input).toHaveValue("testuser");
  });

  test("successful login navigates to events", async () => {
    (ApiService.validateUser as jest.Mock).mockResolvedValueOnce({
      data: { user_id: 1 },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await screen.findByRole("button", { name: /login/i }); // Wait for re-render

    expect(setUserId).toHaveBeenCalledWith(1);
    expect(mockedNavigate).toHaveBeenCalledWith("/events?userId=1");
  });

  test("displays error message on failed login", async () => {
    (ApiService.validateUser as jest.Mock).mockRejectedValueOnce({
      response: { data: { detail: "Invalid credentials" } },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Invalid credentials");
  });
});
