import { Duty } from "../../types";

// Abstract Rule class
export abstract class Rule {
  abstract condition(duty: Duty, otherDuty?: Duty): boolean;
  abstract get restPeriod(): number;
}
