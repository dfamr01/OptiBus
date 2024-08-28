import { Duty } from "../../types";
import { Rule } from "./Rule";

export class DriverShiftRule extends Rule {
  constructor(private hours: number) {
    super();
  }

  condition(duty: Duty, otherDuty: Duty): boolean {
    const [earlierDuty, laterDuty] = this.orderDuties(duty, otherDuty);
    const restHours = this.calculateRestHours(earlierDuty.end, laterDuty.start);
    return restHours < this.hours;
  }

  get restPeriod(): number {
    return this.hours;
  }

  private orderDuties(duty1: Duty, duty2: Duty): [Duty, Duty] {
    return new Date(duty1.end) <= new Date(duty2.start)
      ? [duty1, duty2]
      : [duty2, duty1];
  }

  private calculateRestHours(endTime: string, startTime: string): number {
    const endDateTime = new Date(endTime);
    const startDateTime = new Date(startTime);
    const restMilliseconds = startDateTime.getTime() - endDateTime.getTime();
    return restMilliseconds / (1000 * 60 * 60);
  }
}
