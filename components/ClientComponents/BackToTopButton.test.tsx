import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import BackToTopButton from "./BackToTopButton";

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  fireEvent.scroll(window);
}

const scrollListenerCalls = (spy: { mock: { calls: unknown[][] } }) =>
  spy.mock.calls.filter(([type]) => type === "scroll").length;

describe("BackToTopButton", () => {
  it("is hidden near the top of the page", () => {
    render(<BackToTopButton />);
    scrollTo(100);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("appears after scrolling past 200 px and hides again when back at the top", () => {
    render(<BackToTopButton />);

    scrollTo(300);
    expect(screen.getByRole("button")).toBeInTheDocument();

    scrollTo(0);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("smooth-scrolls to the top when clicked", async () => {
    const user = userEvent.setup();
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<BackToTopButton />);
    scrollTo(500);

    await user.click(screen.getByRole("button"));

    expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("has an accessible name", () => {
    render(<BackToTopButton />);
    scrollTo(500);
    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  it("attaches one scroll listener however often it re-renders", () => {
    const add = vi.spyOn(window, "addEventListener");
    const { rerender } = render(<BackToTopButton />);

    scrollTo(300);
    scrollTo(0);
    scrollTo(300);
    rerender(<BackToTopButton />);

    expect(scrollListenerCalls(add)).toBe(1);
  });

  it("removes its scroll listener on unmount", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<BackToTopButton />);

    unmount();

    expect(scrollListenerCalls(remove)).toBe(1);
  });
});
