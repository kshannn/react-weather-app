import { render, screen } from "@testing-library/react";
import { SearchFields } from "./SearchFields";
import user from "@testing-library/user-event";

describe("SearchFields", () => {
  test("search fields render correctly", () => {
    render(<SearchFields />);
    const countryField = screen.getByPlaceholderText("Country");
    const cityField = screen.getByPlaceholderText("City");
    expect(countryField).toBeInTheDocument();
    expect(cityField).toBeInTheDocument();
  });

  test("search field buttons render correctly", () => {
    render(<SearchFields />);
    const searchElement = screen.getByTitle("searchIcon");
    const clearElement = screen.getByTitle("clearIcon");
    expect(searchElement).toBeInTheDocument();
    expect(clearElement).toBeInTheDocument();
  });

  test("search fields are empty on initial render", () => {
    render(<SearchFields />);
    const countryField = screen.getByPlaceholderText("Country");
    const cityField = screen.getByPlaceholderText("City");
    expect(countryField).toHaveTextContent("");
    expect(cityField).toHaveTextContent("");
  });

  test("search fields clears when clear button is clicked", async () => {
    user.setup();
    render(<SearchFields />);

    const countryField = screen.getByPlaceholderText("Country");
    const cityField = screen.getByPlaceholderText("City");
    const clearElement = screen.getByTitle("clearIcon");
    
    await user.type(countryField, "singapore");
    await user.type(cityField, "singapore");
    await user.click(clearElement);

    expect(countryField).toHaveValue("");
    expect(cityField).toHaveValue("");
  });
});
