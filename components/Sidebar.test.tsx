import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SidebarProvider } from "./shadcn/sidebar";
import { AppSidebar } from "./Sidebar";

function renderSidebar() {
  return render(
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>,
  );
}

describe("AppSidebar", () => {
  it("links to each sidebar page", () => {
    renderSidebar();
    expect(screen.getByRole("link", { name: "Events" })).toHaveAttribute("href", "/events");
    expect(screen.getByRole("link", { name: "Raids" })).toHaveAttribute("href", "/raids");
    expect(screen.getByRole("link", { name: "Pokedex" })).toHaveAttribute("href", "/pokemon?gen=1");
    expect(screen.getByRole("link", { name: "Research" })).toHaveAttribute("href", "/research");
  });

  it("leaves out pages hidden from the sidebar", () => {
    renderSidebar();
    expect(screen.queryByRole("link", { name: "More" })).not.toBeInTheDocument();
  });

  it("opens the Events submenu by default", () => {
    renderSidebar();
    expect(screen.getByRole("link", { name: "Live Events" })).toHaveAttribute("href", "/events/live");
    expect(screen.queryByRole("link", { name: "Max Battles" })).not.toBeInTheDocument();
  });

  it("toggles a submenu with its own labelled button", async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(screen.getByRole("button", { name: "Toggle Raids menu" }));
    expect(screen.getByRole("link", { name: "Max Battles" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Toggle Raids menu" }));
    expect(screen.queryByRole("link", { name: "Max Battles" })).not.toBeInTheDocument();
  });

  it("still toggles the submenu when the page link is clicked", async () => {
    const user = userEvent.setup();
    renderSidebar();

    await user.click(screen.getByRole("link", { name: "Raids" }));

    expect(screen.getByRole("link", { name: "Max Battles" })).toBeInTheDocument();
  });

  it("doesn't nest links and buttons", () => {
    const { container } = renderSidebar();
    const sidebar = within(container);
    expect(sidebar.getAllByRole("link").length).toBeGreaterThan(0);
    expect(container.querySelector("a button, button a")).toBeNull();
  });
});
