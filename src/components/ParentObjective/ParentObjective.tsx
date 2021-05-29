import React, { useState } from 'react';
import './ParentObjective.css';
import OkrObjective from '../OkrObjective/OkrObjective';
import { OkrRecord } from '../../utils/Utils';

type OkrParentProps = {
  /** Index of the Parent Objective */
  bullet: number;
  /** Title of Parent Objective  */
  title: string;
  /** Child Objectives */
  childObjectives: Array<OkrRecord>;
};

/**
 * Reusable Parent Objective Component
 * Only passing required props
 * (if modal on click needed to be implemented than passing whole objet would have made more sense)
 * @param param OkrParentProps
 */

const ParentObjective: React.FC<OkrParentProps> = ({ bullet, title, childObjectives }) => {
  const [show, setShow] = useState(true);
  return (
    <div className="parentObjective">
      <OkrObjective bullet={bullet} title={title} isParent show={setShow} noChildren={childObjectives.length === 0} />
      {show ? (
        <div>
          {/** Iterate over child objectives */}
          <div className="childObjectives">
            {childObjectives.map((okr, index) => {
              /** Adding key as per objective unique id */
              return <OkrObjective key={`child_${okr.id}`} bullet={index + 1} title={okr.title} />;
            })}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ParentObjective;
