import React, { ReactChild, ReactChildren, useState, useRef, MutableRefObject } from 'react';
import { usePopper } from 'react-popper';
import { Intent, Direction } from '@ui/config';
import './Tooltip.css';

export type ITooltip = {
  targetRef: MutableRefObject<null>;
  isVisible: boolean;
  children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  placement?: Direction;
  intent?: Intent;
};

export const Tooltip = ({
  targetRef,
  isVisible,
  children,
  placement = Direction.Top,
  intent = Intent.Primary,
}: ITooltip): JSX.Element => {
  const popperRef = useRef(null);
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(targetRef.current, popperRef.current, {
    placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowRef,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  if (!isVisible) return <></>;

  return (
    <div
      ref={popperRef}
      style={styles.popper}
      {...attributes.popper}
      className={`syo-tooltip fade-in-down syo-tooltip--${intent}`}
      data-testid="syo-tooltip"
    >
      <div ref={setArrowRef} style={styles.arrow} className="syo-tooltip__arrow" />
      {children}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
