import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, renderHook, waitFor } from "@testing-library/react";
import Button from "../index";
import useTimeout from "../hooks/useTimeout";

describe("test Button component", () => {
  it("shoud mount and unmount normally", () => {
    const { unmount, rerender } = render(<Button />);
    expect(() => {
      rerender(<Button />);
      unmount();
    }).not.toThrow();
  });

  it("should render correctly", () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading", () => {
    const { findByText, asFragment } = render(<Button loading />);

    expect(findByText("loading")).toBeTruthy();

    expect(findByText("blank")).toBeTruthy();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render disabled and children", () => {
    const { findByText, asFragment } = render(
      <Button disabled children="hello" />
    );

    expect(findByText("hello")).toBeTruthy();

    expect(asFragment()).toMatchSnapshot();
  });

  it("onClick should be called", () => {
    const onClick = vi.fn();

    const { container } = render(<Button onClick={onClick} />);

    fireEvent.click(container.firstChild!);

    expect(onClick).toBeCalled();

    expect(onClick).toBeCalledTimes(1);
  });

  it("should render with timeout", () => {
    vi.useFakeTimers();

    const { container } = render(<Button timeout={1000} />);

    expect(container.firstChild).not.toMatch(/i am here/);

    vi.runAllTimers();

    waitFor(() => expect(container.firstChild).toMatch(/i am here/));

    vi.useRealTimers();
  });

  it("do not use size to be large", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(warnSpy).not.toHaveBeenCalled();

    render(<Button size="large" />);

    expect(warnSpy).toHaveBeenCalledWith("Dont be so large");
  });

  it("test useTimeout", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(() => useTimeout());

    expect(result.current.text).toBe("");

    rerender(() => useTimeout(500));

    vi.runAllTimers();

    waitFor(() => expect(result.current.text).toBe("i am here"));

    vi.useRealTimers();
  });
});
