import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TopNav from "./TopNav";

describe("TopNav", () => {
  it("links home from the logo", () => {
    render(<TopNav />);
    expect(screen.getByRole("link", { name: "ProfessorWillow" })).toHaveAttribute("href", "/");
  });

  it("links straight to pages without a menu", () => {
    render(<TopNav />);
    expect(screen.getByRole("link", { name: "Pokedex" })).toHaveAttribute("href", "/pokemon?gen=1");
    expect(screen.getByRole("link", { name: "Research" })).toHaveAttribute("href", "/research");
  });

  it("opens a menu of sub-pages with descriptions", async () => {
    const user = userEvent.setup();
    render(<TopNav />);

    await user.click(screen.getByRole("button", { name: "Raids" }));

    expect(await screen.findByRole("link", { name: /max battles/i })).toHaveAttribute("href", "/battles");
    expect(screen.getByText(/view all max battle pokemon/i)).toBeInTheDocument();
  });
});
