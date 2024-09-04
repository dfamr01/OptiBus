import React from "react";
import {
  formatDateFromISOString,
  formatTimeFromISOString,
} from "../../../../../../shared/utils";
import { Duty } from "../../../../../../shared/models/duties/Duty";

interface DutyCardProps {
  duty: Duty;
  onDutyClick: (duty: Duty) => void;
}

const DutyCard: React.FC<DutyCardProps> = ({ duty, onDutyClick }) => {
  const { name, depot, start, end, warning } = duty;

  const formattedDate = formatDateFromISOString(start);
  const formattedStartTime = formatTimeFromISOString(start);
  const formattedEndTime = formatTimeFromISOString(end);

  const onClick = () => {
    onDutyClick(duty);
  };
  const ariaLabel = `Duty ${name} at ${depot}, ${formattedDate}, ${formattedStartTime} to ${formattedEndTime}`;

  return (
    <button
      dir="auto"
      onClick={onClick}
      disabled={!!warning}
      className={`duty-card`}
      aria-label={ariaLabel}
    >
      <div className="duty-info">
        <span className="font-bold">{name}</span>
        <span className="spacer" aria-hidden="true">
          |
        </span>
        <span>{depot}</span>
      </div>
      <div className="duty-time">
        <span>{formattedDate}, </span>
        <span>
          {formattedStartTime} - {formattedEndTime}
        </span>
      </div>
      {warning && (
        <div className="warning" role="alert" aria-live="polite">
          <span aria-hidden="true">⚠️</span>
          <span className="warning-text">{warning}</span>
        </div>
      )}
    </button>
  );
};

DutyCard.displayName = 'DutyCard';

export default DutyCard;
