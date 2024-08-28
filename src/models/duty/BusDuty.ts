import { Duty } from "./Duty";
import { RuleManager } from "../rules/RuleManager";
export class BusDuty extends Duty {
  ruleManager: RuleManager;

  constructor({ id, name, depot, start, end, ruleManager }) {
    super({ id, name, depot, start, end });
    this.ruleManager = ruleManager;
  }

  restPeriod(otherDuty: Duty): number | null {
    if (this.ruleManager) {
      const restPeriod = this.ruleManager.getApplicableRestPeriod(
        this,
        otherDuty
      );
      return restPeriod;
    }
  }
}
