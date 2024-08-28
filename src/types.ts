type Year = `${number}${number}${number}${number}`;
type Month = `${number}${number}`;
type Day = `${number}${number}`;
type Hours = `${number}${number}`;
type Minutes = `${number}${number}`;
type Seconds = `${number}${number}`;

export type ISODate = `${Year}-${Month}-${Day}T${Hours}:${Minutes}:${Seconds}Z`

export type Duty = {
  id: number;
  depot: string;
  name: string;
  start: ISODate;
  end: ISODate;
};
