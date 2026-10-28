import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageContainer from "./PageContainer";

describe("PageContainer", () => {
  it("shows the title as the page heading, with its description", () => {
    render(<PageContainer title="Raids" description="Current bosses" />);
    expect(screen.getByRole("heading", { level: 1, name: "Raids" })).toBeInTheDocument();
    expect(screen.getByText("Current bosses")).toBeInTheDocument();
  });

  it("renders no heading without a title", () => {
    render(<PageContainer>content</PageContainer>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("isn't a <main> landmark (the layout's SidebarInset already is)", () => {
    render(<PageContainer title="Raids" />);
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });
});
