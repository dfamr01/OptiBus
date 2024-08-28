import { Duty } from "./models/duty/Duty";

export interface RestPeriodRule {
  condition: (currentDuty: Duty, otherDuty: Duty) => boolean;
  restPeriod: number;
}
