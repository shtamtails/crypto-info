import { getDefaultClassName } from "./getDefaultClassName";

describe("getDefaultClassName() should work fine", () => {
  test("Get Default ClassName should return correct className", () => {
    const defaultClassName = ["button"];

    expect(getDefaultClassName({ pl: "sm" }, defaultClassName)).toBe(
      "button padding-left-sm"
    );

    expect(getDefaultClassName({ radius: "sm" })).toBe("border-radius-sm");
    expect(getDefaultClassName({ fullWidth: true })).toBe("fullWidth");
    expect(getDefaultClassName({ pl: "sm" })).toBe("padding-left-sm");
    expect(getDefaultClassName({ pr: "sm" })).toBe("padding-right-sm");
    expect(getDefaultClassName({ pt: "sm" })).toBe("padding-top-sm");
    expect(getDefaultClassName({ pb: "sm" })).toBe("padding-bottom-sm");
    expect(getDefaultClassName({ ml: "sm" })).toBe("margin-left-sm");
    expect(getDefaultClassName({ mr: "sm" })).toBe("margin-right-sm");
    expect(getDefaultClassName({ mt: "sm" })).toBe("margin-top-sm");
    expect(getDefaultClassName({ mb: "sm" })).toBe("margin-bottom-sm");
  });
});
