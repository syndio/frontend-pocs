import React, { ReactChild, ReactChildren, useRef, useState } from 'react';
import { Tooltip } from '@ui/Tooltip';
import { Icon, Icons } from '@ui/Icon';
import { Direction, Intent, Sizes } from '@ui';

export type ITooltipIcon = {
  children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  placement?: Direction;
  intent?: Intent;
  icon?: Icons;
  size?: Sizes;
  className?: string;
  iconClassname?: string;
};

export const TooltipIcon = ({
  children,
  placement = Direction.Top,
  intent = Intent.Primary,
  icon = Icons.QuestionCircleOutline,
  size = Sizes.md,
  className,
  iconClassname,
}: ITooltipIcon): JSX.Element => {
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  return (
    <a
      ref={tooltipRef}
      onMouseEnter={() => setTooltipIsVisible(true)}
      onMouseLeave={() => setTooltipIsVisible(false)}
      className={className}
    >
      <Icon className={iconClassname} name={icon} size={size} />
      <Tooltip
        targetRef={tooltipRef}
        intent={intent}
        isVisible={tooltipIsVisible}
        placement={placement}
      >
        {children}
      </Tooltip>
    </a>
  );
};

Tooltip.displayName = 'Tooltip';
