/* eslint-disable react/prop-types */
import { Duty } from "../../../../../../shared/models/duties/Duty";
import DutyCard from "../DutyCard";
import React from "react";

interface DutyListProps {
  title: string;
  duties: Duty[];
  onDutyClick: (duty: Duty) => void;
}

const DutyList: React.FC<DutyListProps> = ({
  title = "",
  onDutyClick,
  duties = [],
}) => (
  <div className="duty-list">
    <h2>{title}</h2>
    <div className="duty-card-container">
      {duties.map((duty) => (
        <DutyCard
          onDutyClick={onDutyClick}
          key={duty.id}
          duty={duty}
        />
      ))}
    </div>
  </div>
);

export default React.memo(DutyList);
