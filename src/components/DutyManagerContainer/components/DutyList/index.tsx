/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Duty } from "../../../../models/duty/Duty";
import DutyCard from "../DutyCard";

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
    <h2 className="">{title}</h2>
    <div className="duty-card-container">
      {duties.map((duty) => (
        <DutyCard
          onDutyClick={() => onDutyClick(duty)}
          key={duty.id}
          duty={duty}
        />
      ))}
    </div>
  </div>
);

export default DutyList;
