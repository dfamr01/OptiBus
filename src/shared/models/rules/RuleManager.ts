import { Duty } from "../duties/Duty";
import { Rule } from "./Rule";

/**
 * Manages a collection of rules and determines applicable rest intervals based on these rules.
 */
export class RuleManager {
  /** Array to store the rules */
  private rules: Rule[] = [];

  /**
   * Creates a new RuleManager instance.
   * @param {Rule[]} [rules] - Optional array of initial rules to be added.
   */
  constructor(rules?: Rule[]) {
    if (rules) {
      this.rules = rules;
    }
  }

  /**
   * Adds a new rule to the manager.
   * @param {Rule} rule - The rule to be added.
   */
  addRule(rule: Rule): void {
    this.rules.push(rule);
  }

  /**
   * Determines the applicable rest restInterval based on the given duty and optional other duty.
   * @param {Duty} duty - The primary duty to check against the rules.
   * @param {Duty} [otherDuty] - Optional secondary duty to consider in rule evaluation.
   * @returns {number | null} The applicable rest restInterval if a matching rule is found, or null if no rule applies.
   */
  getApplicableRestInterval(duty: Duty, otherDuty?: Duty): number | null {
    for (const rule of this.rules) {
      if (rule.condition(duty, otherDuty)) {
        return rule.restInterval;
      }
    }
    return null;
  }
}
