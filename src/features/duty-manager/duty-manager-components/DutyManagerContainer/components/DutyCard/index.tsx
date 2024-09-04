import React from 'react';
import { formatDateFromISOString, formatTimeFromISOString } from '../../../../../../shared/utils';
import { Duty } from '../../../../../../shared/models/duties/Duty';

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
    onDutyClick(duty)
  }

  return (
    <button
      dir="auto"
      onClick={onClick}
      disabled={!!warning}
      className={`duty-card ${warning ? 'disabled' : ''}`}
      aria-label={`Duty ${name} at ${depot}, ${formattedDate}, ${formattedStartTime} to ${formattedEndTime}`}
    >
      <div className="duty-info">
        <span className="font-bold">{name}</span>
        <span className="spacer" aria-hidden="true">|</span>
        <span>{depot}</span>
      </div>
      <div className="duty-time">
        <span>{formattedDate}, </span>
        <span>{formattedStartTime} - {formattedEndTime}</span>
      </div>
      {warning && (
        <div className="warning" role="alert">
          <span aria-hidden="true">⚠️</span>
          <span className="warning-text">{warning}</span>
        </div>
      )}
    </button>
  );
};

export default DutyCard;