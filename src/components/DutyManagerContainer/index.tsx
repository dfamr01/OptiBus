import React, { useEffect, useState, useCallback } from "react";
import DutyList from "./components/DutyList";
import data from "../../data.json";
import { Duty } from "../../models/duty/Duty";
import { BusDuty } from "../../models/duty/BusDuty";
import { Duty as DutyT } from "../../types";
import { useDuty } from "../../hooks/duty.hooks";
import { DayShiftRule } from "../../models/rules/DayShiftRule";
import { RuleManager } from "../../models/rules/RuleManager";
import { DriverShiftRule } from "../../models/rules/DriverShiftRule";

/**
 * Container component for managing duties
 */
const DutyManagerContainer: React.FC = () => {
  const [availableDuties, setAvailableDuties] = useState<Duty[]>([]);
  const [assignedDuties, setAssignedDuties] = useState<Duty[]>([]);

  /**
   * Initialize available duties from data
   */
  useEffect(() => {
    const ruleManager = initializeRuleManager();
    const duties = createDutiesFromData(data as DutyT[], ruleManager);
    setAvailableDuties(duties);
  }, []);

  const { availableDutiesMemo, assignedDutiesMemo } = useDuty({
    availableDuties,
    assignedDuties,
  });

  /**
   * Assign a duty if it doesn't overlap and respects rest periods
   * @param {Duty} duty - The duty to assign
   */
  const assignDuty = useCallback((duty: Duty) => {
    if (isDutyAssignable(duty, assignedDuties)) {
      setAssignedDuties((prev) => [...prev, duty]);
      setAvailableDuties((prev) => prev.filter((d) => d.id !== duty.id));
    }
  }, [assignedDuties]);

  /**
   * Unassign a duty
   * @param {Duty} duty - The duty to unassign
   */
  const unassignDuty = useCallback((duty: Duty) => {
    setAvailableDuties((prev) => [...prev, duty]);
    setAssignedDuties((prev) => prev.filter((d) => d.id !== duty.id));
  }, []);

  return (
    <div className="duty-manager-container">
      <DutyList
        title="Available duties"
        onDutyClick={assignDuty}
        duties={availableDutiesMemo}
      />
      <DutyList
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