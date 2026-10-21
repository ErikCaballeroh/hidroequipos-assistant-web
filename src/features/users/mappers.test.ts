import { describe, expect, it } from "vitest";
import { roleLabel } from "./mappers";

describe("roleLabel", () => {
  it("labels supervisor", () => {
    expect(roleLabel("supervisor")).toBe("Supervisor");
  });

  it("labels employee", () => {
    expect(roleLabel("employee")).toBe("Empleado");
  });
});
