import React from 'libs/react';
import './Info.css'

export const Info = () => {
  return (
    <div className="info">
      <div className="info__icon">
        <div className="">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="transparent"></rect><rect x="3" y="1" width="19.3333" height="23.3611" rx="1" fill="#007B80"></rect><rect x="6.22217" y="4.22217" width="19.3333" height="23.3611" rx="1" fill="#41C4CC"></rect><rect x="9.44434" y="7.44434" width="19.3333" height="23.3611" rx="1" fill="#B8ECEF"></rect>
          </svg>
        </div>
      </div>
      <div className="info__copy">
        <div className="info__copy__row">
          Data Uploaded: <strong>8/29/22</strong>
        </div>
        <div className="info__copy__row">
          Total employees: <strong>4,776</strong>
        </div>
        <div>
          Missing data: <strong>3%</strong>
        </div>
      </div>
    </div>
  );
}