import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import CountersDropdown from "./CountersDropdown";

async function open(counters: Record<string, number>) {
  const user = userEvent.setup();
  render(<CountersDropdown counters={counters} />);
  await user.click(screen.getByRole("button", { name: "Counters" }));
  return screen.findByRole("menu");
}

/** Type badges listed under a group heading. */
function typesUnder(heading: string) {
  const group = screen.getByText(heading).closest("[role=group]") as HTMLElement;
  return [...group.querySelectorAll("[data-slot=badge]")].map((b) => b.textContent);
}

describe("CountersDropdown", () => {
  it("splits counters into best (≥ 2.56×) and good (≥ 1.6×)", async () => {
    await open({ Fairy: 2.56, Dark: 1.6, Ghost: 1.6, Ice: 1 });

    expect(typesUnder("Best Counters - 2.56x")).toEqual(["Fairy"]);
    expect(typesUnder("Good Counters - 1.6x")).toEqual(["Dark", "Ghost"]);
  });

  it("leaves out types below 1.6×", async () => {
    const menu = await open({ Fairy: 2.56, Ice: 1, Water: 0.625 });
    expect(menu).not.toHaveTextContent("Ice");
    expect(menu).not.toHaveTextContent("Water");
  });

  it("hides the best group when nothing reaches 2.56×", async () => {
    await open({ Dark: 1.6 });
    expect(screen.queryByText("Best Counters - 2.56x")).not.toBeInTheDocument();
    expect(screen.getByText("Good Counters - 1.6x")).toBeInTheDocument();
  });

  it("hides the good group when nothing is between 1.6× and 2.56×", async () => {
    await open({ Fairy: 2.56 });
    expect(screen.queryByText("Good Counters - 1.6x")).not.toBeInTheDocument();
  });
});
