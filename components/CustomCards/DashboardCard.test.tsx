import { render, screen } from "@testing-library/react";
import { Star } from "lucide-react";
import { describe, expect, it } from "vitest";
import { DashboardCard } from "./DashboardCard";

describe("DashboardCard", () => {
  it("shows the title, description and content", () => {
    render(
      <DashboardCard title="Boosted Shinies" description="Live now">
        <p>content</p>
      </DashboardCard>,
    );
    expect(screen.getByText("Boosted Shinies")).toBeInTheDocument();
    expect(screen.getByText("Live now")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders an action in the header", () => {
    render(<DashboardCard title="Raids" action={<span>More</span>} />);
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("renders no footer link without a button", () => {
    render(<DashboardCard title="Raids" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders the footer button as a link", () => {
    render(
      <DashboardCard title="Events" button={{ text: "View all upcoming", href: "/events/upcoming", icon: Star }} />,
    );
    const link = screen.getByRole("link", { name: /view all upcoming/i });
    expect(link).toHaveAttribute("href", "/events/upcoming");
    expect(link).toHaveAttribute("target", "_self");
  });

  it("opens external links in a new tab when asked", () => {
    render(
      <DashboardCard
        title="Discord"
        button={{ text: "Join", href: "https://discord.gg/example", target: "_blank" }}
      />,
    );
    expect(screen.getByRole("link", { name: /join/i })).toHaveAttribute("target", "_blank");
  });

  it("doesn't nest a button inside the link [bug 2.1]", () => {
    const { container } = render(
      <DashboardCard title="Events" button={{ text: "View all", href: "/events" }} />,
    );
    expect(container.querySelector("a button, button a")).toBeNull();
  });
});
