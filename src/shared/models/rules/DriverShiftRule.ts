import { Duty } from "../duties/Duty";
import { Rule } from "./Rule";

/**
 * Represents a rule for determining rest intervals between driver shifts.
 * @extends Rule
 */
export class DriverShiftRule extends Rule {
  /**
   * Creates a new DriverShiftRule instance.
   * @param {number} hours - The minimum number of rest hours required between shifts.
   */
  constructor(private hours: number) {
    super();
  }

  /**
   * Determines if this rule applies to the given duties.
   * @param {Duty} duty - The first duty to evaluate.
   * @param {Duty} otherDuty - The second duty to evaluate.
   * @returns {boolean} True if the rest interval between duties is less than the required hours, false otherwise.
   */
  condition(duty: Duty, otherDuty: Duty): boolean {
    const [earlierDuty, laterDuty] = this.orderDuties(duty, otherDuty);
    const restHours = this.calculateRestHours(earlierDuty.end, laterDuty.start);
    return restHours < this.hours;
  }

  /**
   * Gets the required rest interval in hours.
   * @returns {number} The number of hours required for rest between shifts.
   */
  get restInterval(): number {
    return this.hours;
  }

  /**
   * Orders two duties chronologically.
   * @param {Duty} duty1 - The first duty to order.
   * @param {Duty} duty2 - The second duty to order.
   * @returns {[Duty, Duty]} An array of duties ordered chronologically.
   * @private
   */
  private orderDuties(duty1: Duty, duty2: Duty): [Duty, Duty] {
    return new Date(duty1.end) <= new Date(duty2.start)
      ? [duty1, duty2]
      : [duty2, duty1];
  }

  /**
   * Calculates the number of rest hours between two time points.
   * @param {string} endTime - The end time of the earlier duty (ISO 8601 format).
   * @param {string} startTime - The start time of the later duty (ISO 8601 format).
   * @returns {number} The number of rest hours between the two time points.
   * @private
   */
  private calculateRestHours(endTime: string, startTime: string): number {
    const endDateTime = new Date(endTime);
    const startDateTime = new Date(startTime);
    const restMilliseconds = startDateTime.getTime() - endDateTime.getTime();
    return restMilliseconds / (1000 * 60 * 60);
  }
}
