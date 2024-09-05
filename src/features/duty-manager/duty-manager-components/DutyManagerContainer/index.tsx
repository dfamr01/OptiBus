import React, { useEffect, useState, useCallback } from "react";
import data from "../../../../data.json";
import DutySection from "./components/DutySection";
import { Duty as DutyT } from "../../../../shared/types/types";
import { useDuty } from "../../duty-manager-hooks/duty-manager.hooks";
import { Duty } from "../../../../shared/models/duties/Duty";
import { RuleManager } from "../../../../shared/models/rules/RuleManager";
import { DriverShiftRule } from "../../../../shared/models/rules/DriverShiftRule";
import { BusDuty } from "../../../../shared/models/duties/BusDuty";

const DutyManagerContainer: React.FC = () => {
  const [availableDuties, setAvailableDuties] = useState<Duty[]>([]);
  const [assignedDuties, setAssignedDuties] = useState<Duty[]>([]);

  useEffect(() => {
    const ruleManager = initializeRuleManager();
    const duties = createDutiesFromData(data as DutyT[], ruleManager);
    setAvailableDuties(duties);
  }, []);

  const { availableDutiesMemo, assignedDutiesMemo } = useDuty({
    availableDuties,
    assignedDuties,
  });

  const assignDuty = useCallback((duty: Duty) => {
    if (isDutyAssignable(duty, assignedDuties)) {
      setAssignedDuties((prev) => [...prev, duty]);
      setAvailableDuties((prev) => prev.filter((d) => d.id !== duty.id));
    }
  }, [assignedDuties]);

  const unassignDuty = useCallback((duty: Duty) => {
    setAvailableDuties((prev) => [...prev, duty]);
    setAssignedDuties((prev) => prev.filter((d) => d.id !== duty.id));
  }, []);

  return (
    <div className="duty-manager-container">
      <DutySection
        title="Available duties"
        onDutyClick={assignDuty}
        duties={availableDutiesMemo}
      />
      <DutySection
        title="Duties you've signed up for"
        onDutyClick={unassignDuty}
        duties={assignedDutiesMemo}
      />
    </div>
  );
};

/**
 * Initialize the rule manager with necessary rules
 * @returns {RuleManager} Initialized rule manager
 */
function initializeRuleManager(): RuleManager {
  const ruleManager = new RuleManager();
  ruleManager.addRule(new DriverShiftRule(8));
  // Uncomment the following line if you want to add the NightShiftRule
  // ruleManager.addRule(new NightShiftRule(12));
  return ruleManager;
}

/**
 * Create BusDuty instances from raw data
 * @param {DutyT[]} data - Raw duty data
 * @param {RuleManager} ruleManager - Rule manager to associate with duties
 * @returns {BusDuty[]} Array of BusDuty instances
 */
function createDutiesFromData(data: DutyT[], ruleManager: RuleManager): BusDuty[] {
  return data.map((duty) => new BusDuty({
    id: duty.id,
    depot: duty.depot,
    name: duty.name,
    start: duty.start,
    end: duty.end,
    ruleManager,
  }));
}

/**
 * Check if a duty can be assigned
 * @param {Duty} duty - The duty to check
 * @param {Duty[]} assignedDuties - Currently assigned duties
 * @returns {boolean} True if the duty can be assigned, false otherwise
 */
function isDutyAssignable(duty: Duty, assignedDuties: Duty[]): boolean {
  if (assignedDuties.some((d) => d.overlapsWith(duty))) {
    alert("Cannot assign duty due to overlap.");
    return false;
  }

  if (assignedDuties.length > 0 && assignedDuties.some((d) => d.restPeriod(duty))) {
    alert("Cannot assign duty due to insufficient rest period.");
    return false;
  }

  return true;
}

export default React.memo(DutyManagerContainer);