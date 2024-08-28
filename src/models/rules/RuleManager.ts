import { Duty } from "../../types";
import { Rule } from "./Rule";

export class RuleManager {
  private rules: Rule[] = [];

  constructor(rules?: Rule[]) {
    if (rules) {
      this.rules = rules;
    }
  }

  addRule(rule: Rule): void {
    this.rules.push(rule);
  }

  getApplicableRestPeriod(duty: Duty, otherDuty?: Duty): number | null {
    for (const rule of this.rules) {
      if (rule.condition(duty, otherDuty)) {
        return rule.restPeriod;
      }
    }
    return null;
  }
}
