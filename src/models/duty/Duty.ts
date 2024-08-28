import { Duty as DutyT, ISODate } from "../../types";

export abstract class Duty implements DutyT {
  name: string;
  depot: string;
  id: number;
  start: ISODate;
  end: ISODate;
  warning: string;

  constructor({ id, name, depot, start, end }: DutyT) {
    this.id = id;
    this.name = name;
    this.depot = depot;
    this.start = start;
    this.end = end;
    this.warning = "";
  }

  overlapsWith(otherDuty: Duty): boolean {
    const thisStart = new Date(this.start);
    const thisEnd = new Date(this.end);
    const otherStart = new Date(otherDuty.start);
    const otherEnd = new Date(otherDuty.end);

    return thisStart < otherEnd && otherStart < thisEnd;
  }

  abstract restPeriod(otherDuty: Duty): number;
}
