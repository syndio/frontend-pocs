import React from 'react';
import './Spinner.css';

interface ISpinner {
  className?: string;
  wrapperClassName?: string;
  size?: number;
}

export const Spinner = (props: ISpinner): JSX.Element => {
  const { className = '', wrapperClassName = '', size = 10 } = props;

  return (
    <div className={`syo-spinner ${wrapperClassName}`}>
      <div className={`syo-spinner__wrapper ${className}`}>
        <svg
          className={`syo-spinner__svg h-${size} w-${size}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="syo-spinner__circle"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="syo-spinner__path"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
};

Spinner.displayName = 'Spinner';
