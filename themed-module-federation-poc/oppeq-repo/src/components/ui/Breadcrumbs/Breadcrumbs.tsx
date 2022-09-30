import React, { Children, cloneElement, isValidElement, ReactNode } from 'react';
import './Breadcrumbs.css';

interface IBreadcrumbs {
  children: ReactNode;
}

export const Breadcrumbs = ({ children }: IBreadcrumbs): JSX.Element => {
  const childrenArray = Children.toArray(children);
  return (
    <nav aria-label="breadcrumbs">
      <ol className="syo-breadcrumbs__wrapper">
        {Children.map(childrenArray, (child, index) => {
          const isLast = index === childrenArray.length - 1;
          if (isValidElement(child)) {
            return (
              <>
                <li>{cloneElement(child, { key: index })}</li>
                {!isLast && <li aria-hidden="true" className="mr-1"></li>}
              </>
            );
          }
        })}
      </ol>
    </nav>
  );
};
