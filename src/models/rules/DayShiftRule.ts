import { Duty } from "../../types";
import { Rule } from "./Rule";

export class DayShiftRule extends Rule {
  constructor(private hours: number) {
    super();
  }

  condition(duty: Duty): boolean {
    const endTime = new Date(duty.end).getHours();
    return endTime < 22 || endTime > 6;
  }

  get restPeriod(): number {
    return this.hours;
  }
}
