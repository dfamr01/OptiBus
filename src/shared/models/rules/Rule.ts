import { Duty } from "../duties/Duty";

/**
 * Abstract base class representing a rule for determining rest periods between duties.
 */
export abstract class Rule {
  /**
   * Evaluates whether this rule applies to the given duty or duties.
   * @param {Duty} duty - The primary duty to evaluate.
   * @param {Duty} [otherDuty] - An optional secondary duty to consider in the evaluation.
   * @returns {boolean} True if the rule applies, false otherwise.
   */
  abstract condition(duty: Duty, otherDuty?: Duty): boolean;

  /**
   * Gets the rest period associated with this rule.
   * @returns {number} The duration of the rest period in some time unit (e.g., minutes or hours).
   */
  abstract get restPeriod(): number;
}
