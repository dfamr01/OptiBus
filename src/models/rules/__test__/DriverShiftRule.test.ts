import { DriverShiftRule } from "../../../models/rules/DriverShiftRule";
import { Duty } from "../../../types";

describe("DriverShiftRule", () => {
  let driverShiftRule: DriverShiftRule;

  beforeEach(() => {
    driverShiftRule = new DriverShiftRule(8);
  });

  test("condition returns true when rest period is less than specified hours", () => {
    const duty1: Duty = {
      id: 1,
      name: "Duty 1",
      depot: "Depot A",
      start: "2022-11-01T05:15:00Z",
      end: "2022-11-01T08:45:00Z",
    };
    const duty2: Duty = {
      id: 2,
      name: "Duty 2",
      depot: "Depot A",
      start: "2022-11-01T15:00:00Z",
      end: "2022-11-01T18:30:00Z",
    };

    expect(driverShiftRule.condition(duty1, duty2)).toBe(true);
  });

  test("condition returns false when rest period is equal to or greater than specified hours", () => {
    const duty1: Duty = {
      id: 1,
      name: "Duty 1",
      depot: "Depot A",
      start: "2022-11-01T05:15:00Z",
      end: "2022-11-01T08:45:00Z",
    };
    const duty2: Duty = {
      id: 2,
      name: "Duty 2",
      depot: "Depot A",
      start: "2022-11-01T17:00:00Z",
      end: "2022-11-01T20:30:00Z",
    };

    expect(driverShiftRule.condition(duty1, duty2)).toBe(false);
  });

  test("condition handles duties in reverse order", () => {
    const duty1: Duty = {
      id: 1,
      name: "Duty 1",
      depot: "Depot A",
      start: "2022-11-01T15:00:00Z",
      end: "2022-11-01T18:30:00Z",
    };
    const duty2: Duty = {
      id: 2,
      name: "Duty 2",
      depot: "Depot A",
      start: "2022-11-01T05:15:00Z",
      end: "2022-11-01T08:45:00Z",
    };

    expect(driverShiftRule.condition(duty1, duty2)).toBe(true);
  });

  test("restPeriod getter returns the specified hours", () => {
    expect(driverShiftRule.restPeriod).toBe(8);
  });
});
