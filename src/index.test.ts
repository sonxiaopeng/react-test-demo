import { expect, describe, it } from "vitest";

export function sum(a: number, b: number) {
  return a + b;
}

describe("第一个测试文件", () => {
  it("测试", () => {
    expect(sum(1, 1)).toBe(2);
  });
});
