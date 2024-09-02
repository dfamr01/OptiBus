import { Duty } from "../models/duties/Duty";

export interface RestPeriodRule {
  condition: (currentDuty: Duty, otherDuty: Duty) => boolean;
  restPeriod: number;
}
