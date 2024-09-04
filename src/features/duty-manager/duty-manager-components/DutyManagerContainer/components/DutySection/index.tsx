import { Duty } from "../../../../../../shared/models/duties/Duty";
import DutyCard from "../DutyCard";
import React from "react";

interface DutySectionProps {
  title: string;
  duties: Duty[];
  onDutyClick: (duty: Duty) => void;
}

const DutySection: React.FC<DutySectionProps> = ({
  title = "",
  onDutyClick,
  duties = [],
}) => {
  const titleId = `duty-section-${title.replace(/\s+/g, '-')}`;

  return (
    <section className="duty-section" aria-labelledby={titleId}>
      <h2 id={titleId}>{title}</h2>
      <ol className="duty-list" aria-label={`Ordered list of duties for ${title}`}>
        {duties.map((duty) => (
          <DutyCard
            key={duty.id}
            onDutyClick={onDutyClick}
            duty={duty}
          />
        ))}
      </ol>
    </section>
  )
}


export default React.memo(DutySection);
