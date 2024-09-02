import { useMemo } from "react";
import { Duty } from "../../../shared/models/duties/Duty";

/**
 * Props for the useDuty hook
 */
interface UseDutyProps {
  /** List of available duties */
  availableDuties: Duty[];
  /** List of assigned duties */
  assignedDuties: Duty[];
}

/**
 * Custom hook for processing and sorting duties
 * @param {UseDutyProps} props - The input duties
 * @returns {{ availableDutiesMemo: Duty[], assignedDutiesMemo: Duty[] }} Memoized and processed duties
 */
export const useDuty = ({ availableDuties, assignedDuties }: UseDutyProps) => {
  return useMemo(() => {
    const sortedAvailableDuties = sortDuties(availableDuties);
    const sortedAssignedDuties = sortDuties(assignedDuties);

    const processedAvailableDuties = processAvailableDuties(
      sortedAvailableDuties,
      sortedAssignedDuties
    );

    return {
      availableDutiesMemo: processedAvailableDuties,
      assignedDutiesMemo: sortedAssignedDuties,
    };
  }, [availableDuties, assignedDuties]);
};

/**
 * Sorts duties by start date in ascending order
 * @param {Duty[]} duties - The duties to sort
 * @returns {Duty[]} Sorted duties
 */
const sortDuties = (duties: Duty[]): Duty[] => {
  return [...duties].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
};

/**
 * Processes available duties, checking for overlaps and rest period violations
 * @param {Duty[]} availableDuties - The available duties to process
 * @param {Duty[]} assignedDuties - The assigned duties to check against
 * @returns {Duty[]} Processed available duties with warnings
 */
const processAvailableDuties = (
  availableDuties: Duty[],
  assignedDuties: Duty[]
): Duty[] => {
  return availableDuties.map((duty) => {
    const processedDuty = duty;

    if (checkForOverlap(processedDuty, assignedDuties)) {
      processedDuty.warning = "You have duty at this time";
      return processedDuty;
    }

    if (assignedDuties.length > 0) {
      const restViolation = checkForRestViolation(
        processedDuty,
        assignedDuties
      );
      if (restViolation) {
        processedDuty.warning = `Less than ${restViolation}hrs since last duty`;
        return processedDuty;
      }
    }
    processedDuty.warning = "";

    return processedDuty;
  });
};

/**
 * Checks if a duty overlaps with any of the assigned duties
 * @param {Duty} duty - The duty to check
 * @param {Duty[]} assignedDuties - The assigned duties to check against
 * @returns {boolean} True if there's an overlap, false otherwise
 */
const checkForOverlap = (duty: Duty, assignedDuties: Duty[]): boolean => {
  return assignedDuties.some((d) => d.overlapsWith(duty));
};

/**
 * Checks if a duty violates the rest period of any assigned duty
 * @param {Duty} duty - The duty to check
 * @param {Duty[]} assignedDuties - The assigned duties to check against
 * @returns {number | null} The violated rest period in hours, or null if no violation
 */
const checkForRestViolation = (
  duty: Duty,
  assignedDuties: Duty[]
): number | null => {
  for (const assignedDuty of assignedDuties) {
    const restNeeded = assignedDuty.restPeriod(duty);
    if (restNeeded) {
      return restNeeded;
    }
  }
  return null;
};
