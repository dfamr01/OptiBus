import { Duty } from "../Duty";

class TestDuty extends Duty {
  restInterval(_: Duty): number {
    return 0; // Dummy implementation
  }
}

describe("Duty", () => {
  let duty: TestDuty;

  beforeEach(() => {
    duty = new TestDuty({
      id: 1,
      name: "Test Duty",
      depot: "Test Depot",
      start: "2022-11-01T05:15:00Z",
      end: "2022-11-01T08:45:00Z",
    });
  });

  test("constructor initializes properties correctly", () => {
    expect(duty.id).toBe(1);
    expect(duty.name).toBe("Test Duty");
    expect(duty.depot).toBe("Test Depot");
    expect(duty.start).toBe("2022-11-01T05:15:00Z");
    expect(duty.end).toBe("2022-11-01T08:45:00Z");
    expect(duty.warning).toBe("");
  });

  describe("overlapsWith", () => {
    test("returns true for overlapping duties", () => {
      const otherDuty = new TestDuty({
        id: 2,
        name: "Overlapping Duty",
        depot: "Other Depot",
        start: "2022-11-01T07:00:00Z",
        end: "2022-11-01T10:30:00Z",
      });
      expect(duty.overlapsWith(otherDuty)).toBe(true);
    });

    test("returns false for non-overlapping duties", () => {
      const otherDuty = new TestDuty({
        id: 2,
        name: "Non-overlapping Duty",
        depot: "Other Depot",
        start: "2022-11-01T09:00:00Z",
        end: "2022-11-01T12:30:00Z",
      });
      expect(duty.overlapsWith(otherDuty)).toBe(false);
    });

    test("returns true for duties with same start time", () => {
      const otherDuty = new TestDuty({
        id: 2,
        name: "Same Start Duty",
        depot: "Other Depot",
        start: "2022-11-01T05:15:00Z",
        end: "2022-11-01T08:45:00Z",
      });
      expect(duty.overlapsWith(otherDuty)).toBe(true);
    });

    test("returns true for duties with same end time", () => {
      const otherDuty = new TestDuty({
        id: 2,
        name: "Same End Duty",
        depot: "Other Depot",
        start: "2022-11-01T06:15:00Z",
        end: "2022-11-01T08:45:00Z",
      });
      expect(duty.overlapsWith(otherDuty)).toBe(true);
    });
  });
});
