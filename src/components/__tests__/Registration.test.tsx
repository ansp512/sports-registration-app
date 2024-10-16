import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserRegistration, { ComponentProps } from "../registration";
import * as ApiService from "../../utils/apis";

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mock ApiService
jest.mock("../../utils/apis");

describe("UserRegistration Component", () => {
  const setUserId = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserRegistration userId={0} setUserId={setUserId} />
      </MemoryRouter>
    );
  });

  test("renders registration form", () => {
    expect(screen.getByLabelText(/user name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("updates username on input change", () => {
    const input = screen.getByLabelText(/user name/i);
    fireEvent.change(input, { target: { value: "newuser" } });
    expect(input).toHaveValue("newuser");
  });

  test("successful registration navigates to events", async () => {
    (ApiService.registerUser as jest.Mock).mockResolvedValueOnce({});
    (ApiService.validateUser as jest.Mock).mockResolvedValueOnce({
      data: { user_id: 1 },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await screen.findByRole("button", { name: /register/i }); // Wait for re-render

    expect(setUserId).toHaveBeenCalledWith(1);
    expect(mockedNavigate).toHaveBeenCalledWith("/events?userId=1");
  });

  test("displays error message on failed registration", async () => {
    (ApiService.registerUser as jest.Mock).mockRejectedValueOnce({
      response: { data: { detail: "Registration failed" } },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Registration failed");
  });
});
