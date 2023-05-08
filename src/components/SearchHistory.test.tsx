import { render, screen } from "@testing-library/react";
import { SearchHistory } from "./SearchHistory";

describe("Search History", () => {
  test("renders properly", () => {
    render(<SearchHistory />);
    const titleElement = screen.getByRole("heading", {
      name: "Search History",
    });
    expect(titleElement).toBeInTheDocument();
  });

  test("render message when no history record", () => {
    render(<SearchHistory />);

    const queryElements = screen.queryAllByTitle("query");
    const noRecordMessage = screen.getByTitle("no-record");

    expect(queryElements).toHaveLength(0);
    expect(noRecordMessage).toBeInTheDocument();
  });
});
