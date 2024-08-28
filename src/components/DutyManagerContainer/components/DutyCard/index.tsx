/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Duty } from "../../../../models/duty/Duty";
import {
  formatDateFromISOString,
  formatTimeFromISOString,
} from "../../../../utils";
interface DutyCardProps {
  duty: Duty;
  onDutyClick: (duty: Duty) => void;
}
const DutyCard: React.FC<DutyCardProps> = ({ duty, onDutyClick }) => (
  <button
    onClick={() => onDutyClick(duty)}
    disabled={!!duty.warning}
    className="duty-card"
  >
    <span className="font-bold">{duty.name} </span>
    <span className="spacer">|</span>
    <span className="">{duty.depot} </span>
    <div>
      <span>
        {formatDateFromISOString(duty.start)}
        {", "}
      </span>
      <span>
        {formatTimeFromISOString(duty.start)} -{" "}
        {formatTimeFromISOString(duty.end)}
      </span>
      {duty.warning && (
        <div className="warning">
          <span aria-label="warning">⚠️</span>
          <span className="warning-text">{duty.warning}</span>
        </div>
      )}
    </div>
  </button>
);

export default DutyCard;
