import { Duty } from "../duties/Duty";
import { Rule } from "./Rule";

/**
 * Represents a rule for determining if a duty ends during day hours and requires a specific rest interval.
 * @extends Rule
 */
export class DayShiftRule extends Rule {
  /**
   * Creates a new DayShiftRule instance.
   * @param {number} hours - The number of rest hours required after a day shift.
   */
  constructor(private hours: number) {
    super();
  }

  /**
   * Determines if this rule applies to the given duty.
   * @param {Duty} duty - The duty to evaluate.
   * @returns {boolean} True if the duty ends between 06:00 and 21:59, false otherwise.
   */
  condition(duty: Duty): boolean {
    const endTime = new Date(duty.end).getHours();
    return endTime >= 6 && endTime < 22;
  }

  /**
   * Gets the required rest interval in hours after a day shift.
   * @returns {number} The number of hours required for rest after a day shift.
   */
  get restInterval(): number {
    return this.hours;
  }
}
