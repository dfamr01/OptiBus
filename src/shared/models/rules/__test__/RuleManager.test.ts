import { RuleManager } from "../../../models/rules/RuleManager";
import { Rule } from "../../../models/rules/Rule";
import { Duty } from "../../../types";

class MockRule extends Rule {
  constructor(private testCondition: boolean, private testRestPeriod: number) {
    super();
  }

  condition(duty: Duty, otherDuty?: Duty): boolean {
    return this.testCondition;
  }

  get restInterval(): number {
    return this.testRestPeriod;
  }
}

describe("RuleManager", () => {
  let ruleManager: RuleManager;

  beforeEach(() => {
    ruleManager = new RuleManager();
  });

  test("addRule adds a rule to the rules array", () => {
    const rule = new MockRule(true, 8);
    ruleManager.addRule(rule);
    expect((ruleManager as any).rules).toContain(rule);
  });

  test("getApplicableRestPeriod returns the rest interval of the first matching rule", () => {
    const rule1 = new MockRule(false, 8);
    const rule2 = new MockRule(true, 10);
    const rule3 = new MockRule(true, 12);
    ruleManager.addRule(rule1);
    ruleManager.addRule(rule2);
    ruleManager.addRule(rule3);

    const mockDuty: Duty = {
      id: 1,
      name: "Test Duty",
      depot: "Test Depot",
      start: "2022-11-01T05:15:00Z",
      end: "2022-11-01T08:45:00Z",
    };

    expect(ruleManager.getApplicableRestInterval(mockDuty)).toBe(10);
  });

  test("getApplicableRestPeriod returns null if no rule matches", () => {
    const rule1 = new MockRule(false, 8);
    const rule2 = new MockRule(false, 10);
    ruleManager.addRule(rule1);
    ruleManager.addRule(rule2);

    const mockDuty: Duty = {
      id: 1,
      name: "Test Duty",
      depot: "Test Depot",
      start: "2022-11-01T05:15:00Z",
      end: "2022-11-01T08:45:00Z",
    };

    expect(ruleManager.getApplicableRestInterval(mockDuty)).toBeNull();
  });

  test("constructor initializes rules if provided", () => {
    const rule1 = new MockRule(true, 8);
    const rule2 = new MockRule(false, 10);
    const ruleManagerWithRules = new RuleManager([rule1, rule2]);

    expect((ruleManagerWithRules as any).rules).toContain(rule1);
    expect((ruleManagerWithRules as any).rules).toContain(rule2);
  });
});
