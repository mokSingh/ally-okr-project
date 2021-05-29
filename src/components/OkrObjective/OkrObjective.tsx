import React, { useState, useEffect } from 'react';
import './OkrObjective.css';

export type OkrObjectiveProps = {
  /** Index of the Objective */
  bullet: number;
  /** Title of the Objective */
  title: string;
  /** Is this Objective a parent  */
  isParent?: boolean;
  /** Function to show/ hide child objectives */
  show?: Function;
  /** Disable click on showing / hiding objective in case of no children, optional prop */
  noChildren?: boolean;
};

/**
 * Reusable OkrObjective component used in Parent Objective and Also to create Child objectives
 * as basic structure remains same.
 * @param param
 */
const OkrObjective: React.FC<OkrObjectiveProps> = ({ bullet, title, isParent, show, noChildren }) => {
  /** To decide which icon to show */
  const [isDown, setIsDown] = useState(true);

  /** Handler to change isDown state */
  const showHide = () => {
    setIsDown(!isDown);
  };

  /**
   * Call parent show function to show/hide the objectives
   * To be called whenever show or isDown is updated
   */
  useEffect(() => {
    if (show) {
      show(isDown);
    }
  }, [isDown, show]);

  /**
   * Reusable objective component
   */
  return (
    <div className="okrObjective">
      {isParent ? (
        <button type="button" className="button" onClick={() => showHide()} disabled={noChildren}>
          <div className={isDown ? 'button__arrow button__arrow--up' : 'button__arrow button__arrow--down'} />
        </button>
      ) : (
        ''
      )}
      <img src="../../assets/avatar.png" alt="Avatar" className="avatar" />
      <span>{bullet}</span>
      <div className="content"> {title}</div>
    </div>
  );
};

export default OkrObjective;
