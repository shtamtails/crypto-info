import { getDefaultClassName } from "./getDefaultClassName";

describe("getDefaultClassName", () => {
  it("should return correct classNames", () => {
    expect(
      getDefaultClassName({
        props: { fullWidth: true },
        defaultClassName: "defaultClassName",
        withIndents: false,
      })
    ).toBe("defaultClassName fullWidth");

    expect(
      getDefaultClassName({
        props: { radius: "sm" },
        defaultClassName: "",
        withIndents: false,
      })
    ).toBe("border-radius-sm");

    expect(
      getDefaultClassName({
        props: { fullWidth: true },
        defaultClassName: "",
        withIndents: false,
      })
    ).toBe("fullWidth");

    expect(
      getDefaultClassName({
        props: { pl: "sm" },
        defaultClassName: "",
        withIndents: true,
      })
    ).toBe("padding-left-sm");

    expect(
      getDefaultClassName({
        props: { pr: "sm" },
        defaultClassName: "",
        withIndents: true,
      })
    ).toBe("padding-right-sm");

    expect(
      getDefaultClassName({
        props: { pt: "sm" },
        defaultClassName: "",
        withIndents: true,
      })
    ).toBe("padding-top-sm");

    expect(
      getDefaultClassName({
        props: { pb: "sm" },
        defaultClassName: "",
        withIndents: true,
      })
    ).toBe("padding-bottom-sm");

    expect(
      getDefaultClassName({
        props: { ml: "sm" },
        defaultClassName: "",
        withIndents: true,
      })
    ).toBe("margin-left-sm");

    expect(
      getDefaultClassName({
        props: { mr: "sm" },
        defaultClassName: "",
        withIndents: true,
      })
    ).toBe("margin-right-sm");

    expect(
      getDefaultClassName({
        props: { mt: "sm" },
        defaultClassName: "",
        withIndents: true,
      })
    ).toBe("margin-top-sm");

    expect(
      getDefaultClassName({
        props: { mb: "sm" },
        defaultClassName: "",
        withIndents: true,
      })
    ).toBe("margin-bottom-sm");
  });
});
