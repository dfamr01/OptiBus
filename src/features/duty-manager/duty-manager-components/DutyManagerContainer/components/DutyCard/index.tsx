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

  return (
    <button
      dir="auto"
      onClick={() => onDutyClick(duty)}
      disabled={!!warning}
      className="duty-card"
    >
      <div className="duty-info">
        <span className="font-bold">{name}</span>
        <span className="spacer">|</span>
        <span>{depot}</span>
      </div>
      <div className="duty-time">
        <span>{formattedDate}, </span>
        <span>{formattedStartTime} - {formattedEndTime}</span>
      </div>
      {warning && (
        <div className="warning">
          <span aria-label="warning">⚠️</span>
          <span className="warning-text">{warning}</span>
        </div>
      )}
    </button>
  );
};

export default DutyCard;