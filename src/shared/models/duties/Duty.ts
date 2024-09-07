import { Duty as DutyT, ISODate } from "../../types/types";

/**
 * Abstract base class representing a duty or shift.
 * @implements {DutyT}
 */
export abstract class Duty implements DutyT {
  /** The name of the duty */
  name: string;
  /** The depot associated with the duty */
  depot: string;
  /** Unique identifier for the duty */
  id: number;
  /** Start time of the duty in ISO 8601 format */
  start: ISODate;
  /** End time of the duty in ISO 8601 format */
  end: ISODate;
  /** Any warning message associated with the duty */
  warning: string;

  /**
   * Creates a new Duty instance.
   * @param {DutyT} param0 - The duty data.
   * @param {number} param0.id - Unique identifier for the duty.
   * @param {string} param0.name - The name of the duty.
   * @param {string} param0.depot - The depot associated with the duty.
   * @param {ISODate} param0.start - Start time of the duty in ISO 8601 format.
   * @param {ISODate} param0.end - End time of the duty in ISO 8601 format.
   */
  constructor({ id, name, depot, start, end }: DutyT) {
    this.id = id;
    this.name = name;
    this.depot = depot;
    this.start = start;
    this.end = end;
    this.warning = "";
  }

  /**
   * Checks if this duty overlaps with another duty.
   * @param {Duty} otherDuty - The other duty to check for overlap.
   * @returns {boolean} True if the duties overlap, false otherwise.
   */
  overlapsWith(otherDuty: Duty): boolean {
    const thisStart = new Date(this.start);
    const thisEnd = new Date(this.end);
    const otherStart = new Date(otherDuty.start);
    const otherEnd = new Date(otherDuty.end);

    return thisStart < otherEnd && otherStart < thisEnd;
  }

  /**
   * Calculates the rest interval between this duty and another duty.
   * @param {Duty} otherDuty - The other duty to calculate the rest interval against.
   * @returns {number} The rest interval in some time unit (e.g., hours or minutes).
   * @abstract
   */
  abstract restInterval(otherDuty: Duty): number;
}
