import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DutyCard from "../index";
import "@testing-library/jest-dom";
import { RuleManager } from "../../../../../../../shared/models/rules/RuleManager";
import { BusDuty } from "../../../../../../../shared/models/duties/BusDuty";

jest.mock("../../../../../../../shared/models/rules/RuleManager", () => {
  return {
    RuleManager: jest.fn().mockImplementation(() => ({
      getApplicableRestPeriod: jest.fn().mockReturnValue(8),
    })),
  };
});

describe("DutyCard Component with mocked ruleManager", () => {
  const mockRuleManager = new RuleManager();
  const mockDuty = new BusDuty({
    id: 1,
    name: "Morning Shift",
    depot: "Depot A",
    start: "2024-09-01T08:00:00Z",
    end: "2024-09-01T12:00:00Z",
    ruleManager: mockRuleManager,
  });

  it("should render the duty name, depot, and time", () => {
    render(<DutyCard duty={mockDuty} onDutyClick={() => { }} />);

    expect(screen.getByText("Morning Shift")).toBeInTheDocument();
    expect(screen.getByText("Depot A")).toBeInTheDocument();
    expect(screen.getByText("Sun 1st Sep,")).toBeInTheDocument();
    expect(screen.getByText("08:00 - 12:00")).toBeInTheDocument();
  });

  it("should call onDutyClick when clicked", () => {
    const handleClick = jest.fn();
    render(<DutyCard duty={mockDuty} onDutyClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockDuty);
  });

  it("should display a warning if duty has a warning", () => {
    const dutyWithWarning = Object.assign(
      Object.create(Object.getPrototypeOf(mockDuty)),
      mockDuty
    );
    dutyWithWarning.warning = "You have duty at this time";

    render(<DutyCard duty={dutyWithWarning} onDutyClick={() => { }} />);

    expect(screen.getByText("⚠️")).toBeInTheDocument();
    expect(screen.getByText("You have duty at this time")).toBeInTheDocument();
  });

  it("should disable the button if duty has a warning", () => {
    const dutyWithWarning = Object.assign(
      Object.create(Object.getPrototypeOf(mockDuty)),
      mockDuty
    );
    dutyWithWarning.warning = "You have duty at this time";
    render(<DutyCard duty={dutyWithWarning} onDutyClick={() => { }} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should not display a warning if duty does not have one", () => {
    render(<DutyCard duty={mockDuty} onDutyClick={() => { }} />);
    expect(screen.queryByText("⚠️")).not.toBeInTheDocument();
  });

  it("should interact with the mocked ruleManager correctly", () => {
    // Assuming `restInterval` is called within DutyCard or elsewhere in the application
    const restInterval = mockDuty.restInterval(mockDuty);
    expect(mockRuleManager.getApplicableRestInterval).toHaveBeenCalled();
    expect(restInterval).toBe(8); // Based on the mock implementation
  });
});
