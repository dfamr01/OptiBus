import { Duty } from "../duties/Duty";
import { Rule } from "./Rule";

/**
 * Represents a rule for determining if a duty ends during night hours and requires a specific rest period.
 * @extends Rule
 */
export class NightShiftRule extends Rule {
  /**
   * Creates a new NightShiftRule instance.
   * @param {number} hours - The number of rest hours required after a night shift.
   */
  constructor(private hours: number) {
    super();
  }

  /**
   * Determines if this rule applies to the given duty.
   * @param {Duty} duty - The duty to evaluate.
   * @returns {boolean} True if the duty ends between 22:00 and 05:59, false otherwise.
   */
  condition(duty: Duty): boolean {
    const endTime = new Date(duty.end).getHours();
    return endTime >= 22 || endTime < 6;
  }

  /**
   * Gets the required rest period in hours after a night shift.
   * @returns {number} The number of hours required for rest after a night shift.
   */
  get restPeriod(): number {
    return this.hours;
  }
}
