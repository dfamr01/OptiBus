import { render, screen, fireEvent } from "@testing-library/react";
import { RuleManager } from "../../../models/rules/RuleManager";
import { DriverShiftRule } from "../../../models/rules/DriverShiftRule";
import { BusDuty } from "../../../models/duty/BusDuty";
import { useDuty } from "../../../hooks/duty.hooks";
import DutyManagerContainer from "../index";
import React from "react";
// Mock the useDuty hook before importing the component
jest.mock("../../hooks/duty.hooks");

// Mock the data
const mockData = [
  {
    id: 140,
    depot: "Ealing",
    name: "Duty 140",
    start: "2024-11-01T05:15:00",
    end: "2024-11-01T08:45:00",
  },
  {
    id: 151,
    depot: "Westminster",
    name: "Duty 151",
    start: "2024-11-01T07:30:00",
    end: "2024-11-01T12:00:00",
  },
];

describe("DutyManagerContainer", () => {
  let duties;

  beforeEach(() => {
    const ruleManager = new RuleManager();
    ruleManager.addRule(new DriverShiftRule(8));

    duties = mockData.map((duty) => {
      return new BusDuty({
        id: duty.id,
        depot: duty.depot,
        name: duty.name,
        start: new Date(duty.start),
        end: new Date(duty.end),
        ruleManager,
      });
    });

    (useDuty as jest.Mock).mockReturnValue({
      availableDutiesMemo: duties,
      assignedDutiesMemo: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders all available duties with correct information", () => {
    render(<DutyManagerContainer />);

    // Check that each duty is rendered with the correct information
    duties.forEach((duty) => {
      expect(screen.getByText(duty.name)).toBeInTheDocument();
    });
  });

  test("moves duty from available to assigned on click", () => {
    render(<DutyManagerContainer />);

    // Click on the first duty to assign it
    const firstDuty = screen.getByText("Duty 140");
    fireEvent.click(firstDuty);

    // Check that it moved to the "Duties you've signed up for" list
    const assignedDuty = screen.getByText("Duty 140");
    expect(screen.getByText("Duties you've signed up for")).toBeInTheDocument();
    expect(assignedDuty).toBeInTheDocument();

    // Ensure it was removed from "Available duties"
    expect(screen.queryByText("Duty 140")).not.toBeInTheDocument();
  });

  test("removes duty from assigned and adds back to available on unassign click", () => {
    render(<DutyManagerContainer />);

    // Assign the duty
    const firstDuty = screen.getByText("Duty 140");
    fireEvent.click(firstDuty);

    // Unassign the duty
    fireEvent.click(firstDuty);

    // Check that it's back in the "Available duties" list
    expect(screen.getByText("Available duties")).toBeInTheDocument();
    expect(screen.getByText("Duty 140")).toBeInTheDocument();
  });
});
