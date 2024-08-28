/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import DutyList from "./components/DutyList";
import data from "../../data.json";
import { Duty } from "../../models/duty/Duty";
import { BusDuty } from "../../models/duty/BusDuty";
import { Duty as DutyT } from "../../types";
import { useDuty } from "../../hooks/duty.hooks";
// import { NightShiftRule } from "../../models/rules/NightShiftRule ";
import { DayShiftRule } from "../../models/rules/DayShiftRule";
import { RuleManager } from "../../models/rules/RuleManager";
import { DriverShiftRule } from "../../models/rules/DriverShiftRule";
import React from "react";

const DutyManagerContainer = ({}) => {
  const [availableDuties, setAvailableDuties] = useState<Duty[]>([]);
  const [assignedDuties, setAssignedDuties] = useState<Duty[]>([]);

  useEffect(() => {
    const ruleManager = new RuleManager();
    ruleManager.addRule(new DriverShiftRule(8));
    // ruleManager.addRule(new NightShiftRule(12));

    const duties = (data as DutyT[]).reduce<BusDuty[]>((acc, duty) => {
      const newDuty = new BusDuty({
        id: duty.id,
        depot: duty.depot,
        name: duty.name,
        start: duty.start,
        end: duty.end,
        ruleManager,
      });
      acc.push(newDuty);
      return acc;
    }, []);

    setAvailableDuties(duties as Duty[]);
  }, []);

  const { availableDutiesMemo, assignedDutiesMemo } = useDuty({
    availableDuties,
    assignedDuties,
  });

  const assignDuty = (duty: Duty) => {
    if (assignedDuties.some((d) => d.overlapsWith(duty))) {
      alert("Cannot assign duty due to overlap.");
      return;
    }

    if (
      assignedDuties.length > 0 &&
      assignedDuties.some((d) => d.restPeriod(duty))
    ) {
      alert("Cannot assign duty due to insufficient rest period.");
      return;
    }

    setAssignedDuties([...assignedDuties, duty]);
    setAvailableDuties(availableDuties.filter((d) => d.id !== duty.id));
  };

  const unassignDuty = (duty: Duty) => {
    setAvailableDuties([...availableDuties, duty]);
    setAssignedDuties(assignedDuties.filter((d) => d.id !== duty.id));
  };

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

export default React.memo(DutyManagerContainer);
