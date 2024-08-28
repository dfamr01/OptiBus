import { RuleManager } from "../../rules/RuleManager";
import { BusDuty } from "../BusDuty";

// Mock RuleManager
jest.mock("../../models/rules/RuleManager");

describe("BusDuty", () => {
  let busDuty: BusDuty;
  let mockRuleManager: jest.Mocked<RuleManager>;

  beforeEach(() => {
    mockRuleManager = new RuleManager() as jest.Mocked<RuleManager>;
    busDuty = new BusDuty({
      id: 1,
      name: "Test Bus Duty",
      depot: "Test Depot",
      start: "2022-11-01T05:15:00Z",
      end: "2022-11-01T08:45:00Z",
      ruleManager: mockRuleManager,
    });
  });

  test("constructor initializes properties correctly", () => {
    expect(busDuty.id).toBe(1);
    expect(busDuty.name).toBe("Test Bus Duty");
    expect(busDuty.depot).toBe("Test Depot");
    expect(busDuty.start).toBe("2022-11-01T05:15:00Z");
    expect(busDuty.end).toBe("2022-11-01T08:45:00Z");
    expect(busDuty.warning).toBe("");
    expect(busDuty.ruleManager).toBe(mockRuleManager);
  });

  describe("restPeriod", () => {
    test("calls ruleManager.getApplicableRestPeriod with correct arguments", () => {
      const otherDuty = new BusDuty({
        id: 2,
        name: "Other Bus Duty",
        depot: "Other Depot",
        start: "2022-11-01T09:15:00Z",
        end: "2022-11-01T12:45:00Z",
        ruleManager: mockRuleManager,
      });

      mockRuleManager.getApplicableRestPeriod.mockReturnValue(8);

      const result = busDuty.restPeriod(otherDuty);

      expect(mockRuleManager.getApplicableRestPeriod).toHaveBeenCalledWith(
        busDuty,
        otherDuty
      );
      expect(result).toBe(8);
    });

    test("returns null if ruleManager is not set", () => {
      const busDutyWithoutRuleManager = new BusDuty({
        id: 1,
        name: "Test Bus Duty",
        depot: "Test Depot",
        start: "2022-11-01T05:15:00Z",
        end: "2022-11-01T08:45:00Z",
        ruleManager: null,
      });

      const otherDuty = new BusDuty({
        id: 2,
        name: "Other Bus Duty",
        depot: "Other Depot",
        start: "2022-11-01T09:15:00Z",
        end: "2022-11-01T12:45:00Z",
        ruleManager: null,
      });

      const result = busDutyWithoutRuleManager.restPeriod(otherDuty);

      expect(result).toBeUndefined();
    });
  });
});
