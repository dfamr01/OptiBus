import { Duty } from "./Duty";
import { RuleManager } from "../rules/RuleManager";

/**
 * Represents a bus duty, extending the base Duty class with specific rules management.
 * @extends Duty
 */
export class BusDuty extends Duty {
  /** The rule manager associated with this bus duty */
  ruleManager: RuleManager;

  /**
   * Creates a new BusDuty instance.
   * @param {Object} params - The parameters for creating a bus duty.
   * @param {number} params.id - Unique identifier for the duty.
   * @param {string} params.name - The name of the duty.
   * @param {string} params.depot - The depot associated with the duty.
   * @param {string} params.start - Start time of the duty in ISO 8601 format.
   * @param {string} params.end - End time of the duty in ISO 8601 format.
   * @param {RuleManager} params.ruleManager - The rule manager to be used for this duty.
   */
  constructor({ id, name, depot, start, end, ruleManager }) {
    super({ id, name, depot, start, end });
    this.ruleManager = ruleManager;
  }

  /**
   * Calculates the rest interval between this duty and another duty based on the applicable rules.
   * @param {Duty} otherDuty - The other duty to calculate the rest interval against.
   * @returns {number | null} The applicable rest interval in hours, or null if no rule manager is set or no applicable rule is found.
   */
  restInterval(otherDuty: Duty): number | null {
    if (this.ruleManager) {
      const restInterval = this.ruleManager.getApplicableRestInterval(
        this,
        otherDuty
      );
      return restInterval;
    }
    return null;
  }
}
