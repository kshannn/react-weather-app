import { screen, render, waitFor } from "@testing-library/react";
import { WeatherResult } from "./WeatherResult";
import App from "../App";

describe("WeatherResult", () => {
  test("renders properly", () => {
    render(<WeatherResult />);
    const titleElement = screen.getByRole("heading", {
      name: `Today's Weather`,
    });
    expect(titleElement).toBeInTheDocument();
  });

  test("renders no result to display when no API is called", async () => {
    render(<WeatherResult />);
    const defaultWeather = await screen.findByText("No result to display");
    expect(defaultWeather).toBeInTheDocument();
  });

  test("renders results for Singapore by default", async () => {
    render(<App />);
    await waitFor(() => {
      const countryNameElement = screen.getByTitle("country");
      expect(countryNameElement).toHaveTextContent("Singapore, SG");
    });
  });
});
