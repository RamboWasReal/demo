import React from "react"
import { render, fireEvent, act, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Create from "@/pages/events/create"

jest.mock("next/router", () => require("next-router-mock"))

describe("Create Event", () => {
  describe("with empty inputs", () => {
    it("should have a disabled submit button", () => {
      const { getByRole } = render(<Create />)
      expect(getByRole("button")).toBeDisabled()
    })
  })

  describe("with valid inputs", () => {
    it("should have submit button not disabled when all fields are filled", async () => {
      const { getByLabelText } = render(<Create />)
      await act(async () => {
        fireEvent.input(screen.getByLabelText("Name"), { target: { value: "Test Event" } })
        fireEvent.input(getByLabelText("Description"), {
          target: { value: "Test Description" },
        })
        fireEvent.input(getByLabelText("Start"), { target: { value: "2026-09-01T09:00" } })
        fireEvent.input(getByLabelText("End"), { target: { value: "2026-09-01T10:00" } })
      })
      expect(screen.getByRole("button")).toBeEnabled()
    })
  })

  describe("with invalid input", () => {
    it("shows an error message when name is too long", async () => {
      const { getByLabelText, getByRole, getByTestId } = render(<Create />)
      await act(async () => {
        fireEvent.input(getByLabelText("Name"), {
          target: { value: "Name toooooooo long.....!!!!!!!!!!!" },
        })
        fireEvent.input(getByLabelText("Description"), { target: { value: "Test Description" } })
        fireEvent.input(getByLabelText("Start"), { target: { value: "2025-09-01T09:00" } })
        fireEvent.input(getByLabelText("End"), { target: { value: "2025-09-01T10:00" } })
      })
      await act(async () => {
        fireEvent.submit(getByRole("button"))
      })
      expect(getByTestId("error-name")).toHaveTextContent("Must be 32 or fewer characters long")
      expect(getByRole("button")).toBeDisabled()
    })

    it("shows an error message when start date is before now", async () => {
      const { getByLabelText, getByRole, getByTestId } = render(<Create />)
      await act(async () => {
        fireEvent.input(getByLabelText("Name"), {
          target: { value: "Test Event" },
        })
        fireEvent.input(getByLabelText("Description"), { target: { value: "Test Description" } })
        fireEvent.input(getByLabelText("Start"), { target: { value: "2021-09-01T09:00" } })
        fireEvent.input(getByLabelText("End"), { target: { value: "2021-09-01T10:00" } })
      })
      await act(async () => {
        fireEvent.submit(getByRole("button"))
      })
      expect(getByTestId("error-start")).toHaveTextContent("Start date cannot be earlier than now.")
      expect(getByRole("button")).toBeDisabled()
    })

    it("shows an error message when end date is before start date", async () => {
      const { getByLabelText, getByRole, getByTestId } = render(<Create />)
      await act(async () => {
        fireEvent.input(getByLabelText("Name"), {
          target: { value: "Test Event" },
        })
        fireEvent.input(getByLabelText("Description"), { target: { value: "Test Description" } })
        fireEvent.input(getByLabelText("Start"), { target: { value: "2021-09-01T09:00" } })
        fireEvent.input(getByLabelText("End"), { target: { value: "2021-09-01T08:00" } })
      })
      await act(async () => {
        fireEvent.submit(getByRole("button"))
      })
      expect(getByTestId("error-end")).toHaveTextContent(
        "End date cannot be earlier than start date."
      )
      expect(getByRole("button")).toBeDisabled()
    })
  })
})
