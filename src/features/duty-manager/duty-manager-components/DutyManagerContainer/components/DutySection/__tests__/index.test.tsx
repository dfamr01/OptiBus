/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from "@testing-library/react";
import DutySection from "../index";
import React from "react"; // Add this line
import { DriverShiftRule } from "../../../../../../../shared/models/rules/DriverShiftRule";
import { RuleManager } from "../../../../../../../shared/models/rules/RuleManager";
import { BusDuty } from "../../../../../../../shared/models/duties/BusDuty";

describe("DutySection", () => {
  const mockRuleManager = new RuleManager();
  mockRuleManager.addRule(new DriverShiftRule(8));
  const dutiesMockData = [
    {
      id: 140,
      depot: "Ealing",
      name: "Duty 1",
      start: "2024-11-01T05:15:00Z",
      end: "2024-11-01T08:45:00Z",
    },
    {
      id: 151,
      depot: "Westminster",
      name: "Duty 2",
      start: "2024-11-01T07:30:00Z",
      end: "2024-11-01T12:00:00Z",
    },
  ];
  const duties = dutiesMockData.map((duty) => {
    return new BusDuty({
      id: duty.id,
      depot: duty.depot,
      name: duty.name,
      start: new Date(duty.start),
      end: new Date(duty.end),
      ruleManager: mockRuleManager,
    });
  });

  const mockOnDutyClick = jest.fn();

  beforeEach(() => {
    mockOnDutyClick.mockClear();
  });

  test("renders the title", () => {
    render(
      <DutySection
        title="Available Duties"
        duties={duties}
        onDutyClick={mockOnDutyClick}
      />
    );

    const titleElement = screen.getByText("Available Duties");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the list of duties", () => {
    render(
      <DutySection
        title="Available Duties"
        duties={duties}
        onDutyClick={mockOnDutyClick}
      />
    );

    // Check that each duty is rendered
    duties.forEach((duty) => {
      expect(screen.getByText(duty.name)).toBeInTheDocument();
    });
  });

  test("calls onDutyClick when a duty is clicked", () => {
    render(
      <DutySection
        title="Available Duties"
        duties={duties}
        onDutyClick={mockOnDutyClick}
      />
    );

    const firstDutyCard = screen.getByText("Duty 1");
    fireEvent.click(firstDutyCard);

    expect(mockOnDutyClick).toHaveBeenCalledTimes(1);
    expect(mockOnDutyClick).toHaveBeenCalledWith(duties[0]);

    const secondDutyCard = screen.getByText("Duty 2");
    fireEvent.click(secondDutyCard);

    expect(mockOnDutyClick).toHaveBeenCalledTimes(2);
    expect(mockOnDutyClick).toHaveBeenCalledWith(duties[1]);
  });

  test("renders empty state when no duties are provided", () => {
    render(
      <DutySection
        title="Available Duties"
        duties={[]}
        onDutyClick={mockOnDutyClick}
      />
    );

    expect(screen.queryByTestId("duty-card")).not.toBeInTheDocument();
  });
});
