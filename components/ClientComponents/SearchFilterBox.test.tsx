import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterBox, SearchBox } from "./SearchFilterBox";

describe("FilterBox", () => {
  it("shows a placeholder when nothing is selected", () => {
    render(<FilterBox dataType="type" setFilter={vi.fn()} initialValue="" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Select type...");
  });

  it("shows the label of the initial value", () => {
    render(<FilterBox dataType="generation" setFilter={vi.fn()} initialValue="4" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Sinnoh (Gen IV)");
  });

  it("lists every option when opened", async () => {
    const user = userEvent.setup();
    render(<FilterBox dataType="generation" setFilter={vi.fn()} initialValue="" />);

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findAllByRole("option")).toHaveLength(10);
  });

  it("selects an option, reports it and closes", async () => {
    const user = userEvent.setup();
    const setFilter = vi.fn();
    render(<FilterBox dataType="type" setFilter={setFilter} initialValue="" />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Water" }));

    expect(setFilter).toHaveBeenCalledWith("Water");
    expect(screen.getByRole("combobox")).toHaveTextContent("Water");
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("clears the selection when the selected option is picked again", async () => {
    const user = userEvent.setup();
    const setFilter = vi.fn();
    render(<FilterBox dataType="type" setFilter={setFilter} initialValue="Water" />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Water" }));

    expect(setFilter).toHaveBeenCalledWith("");
    expect(screen.getByRole("combobox")).toHaveTextContent("Select type...");
  });

  it("narrows options as you type", async () => {
    const user = userEvent.setup();
    render(<FilterBox dataType="type" setFilter={vi.fn()} initialValue="" />);

    await user.click(screen.getByRole("combobox"));
    await user.type(await screen.findByPlaceholderText("Search type..."), "wat");

    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Water"]);
  });

  it("gives the combobox an accessible name [bug 2.9]", () => {
    render(<FilterBox dataType="type" setFilter={vi.fn()} initialValue="" />);
    expect(screen.getByRole("combobox", { name: /type/i })).toBeInTheDocument();
  });

  it("finds generations by region name, e.g. Kanto", async () => {
    const user = userEvent.setup();
    render(<FilterBox dataType="generation" setFilter={vi.fn()} initialValue="" />);

    await user.click(screen.getByRole("combobox"));
    await user.type(await screen.findByPlaceholderText("Search generation..."), "Kanto");

    expect(screen.getByRole("option", { name: "Kanto (Gen I)" })).toBeInTheDocument();
  });
});

describe("SearchBox", () => {
  it("starts with the initial value", () => {
    render(<SearchBox setQuery={vi.fn()} initialValue="pika" />);
    expect(screen.getByRole("searchbox")).toHaveValue("pika");
  });

  it("reports each change", async () => {
    const user = userEvent.setup();
    const setQuery = vi.fn();
    render(<SearchBox setQuery={setQuery} initialValue="" />);

    await user.type(screen.getByRole("searchbox"), "ab");

    expect(setQuery).toHaveBeenNthCalledWith(1, "a");
    expect(setQuery).toHaveBeenNthCalledWith(2, "ab");
  });
});
