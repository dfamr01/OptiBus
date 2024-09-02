import { Duty } from "../../../types";
import { Rule } from "../Rule";

// Concrete implementation of Rule for testing
class TestRule extends Rule {
  constructor(private testRestPeriod: number) {
    super();
  }

  condition(duty: Duty, otherDuty?: Duty): boolean {
    return true; // Always true for testing
  }

  get restPeriod(): number {
    return this.testRestPeriod;
  }
}
describe("Rule", () => {
  test("can be extended", () => {
    const testRule = new TestRule(8);
    expect(testRule).toBeInstanceOf(Rule);
  });

  test("abstract methods can be implemented", () => {
    const testRule = new TestRule(8);
    const mockDuty: Duty = {
      id: 1,
      name: "Test Duty",
      depot: "Test Depot",
      start: "2022-11-01T05:15:00Z",
      end: "2022-11-01T08:45:00Z",
    };

    expect(testRule.condition(mockDuty)).toBe(true);
    expect(testRule.restPeriod).toBe(8);
  });
});
