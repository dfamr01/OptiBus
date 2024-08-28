import { useMemo } from "react";
import { Duty } from "../models/duty/Duty";

interface UseDutyProps {
  availableDuties: Duty[];
  assignedDuties: Duty[];
}

export const useDuty = ({ availableDuties, assignedDuties }: UseDutyProps) => {
  const { availableDutiesMemo, assignedDutiesMemo } = useMemo(() => {
    const sortByDateAsc = (a, b) =>
      new Date(a.start).getTime() - new Date(b.start).getTime();

    availableDuties.sort(sortByDateAsc);
    assignedDuties.sort(sortByDateAsc);

    availableDuties.forEach((duty: Duty) => {
      const overlaps = assignedDuties.some((d) => d.overlapsWith(duty));
      if (overlaps) {
        duty.warning = "You have duty at this time";
        return;
      }

      if (assignedDuties.length > 0) {
        for (const assignedDuty of assignedDuties) {
          const restNeeded = assignedDuty.restPeriod(duty);
          if (restNeeded) {
            duty.warning = `Less than ${restNeeded}hrs since last duty`;
            return;
          }
        }
      }

      duty.warning = "";
    });

    return {
      availableDutiesMemo: availableDuties,
      assignedDutiesMemo: assignedDuties,
    };
  }, [availableDuties, assignedDuties]);

  return { availableDutiesMemo, assignedDutiesMemo };
};
