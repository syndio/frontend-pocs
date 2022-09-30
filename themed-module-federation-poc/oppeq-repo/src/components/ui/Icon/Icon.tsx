import React from 'react';
import iconsData from '@icons/syndio.json';
import { Sizes } from '@ui/config';
import './Icon.css';

// Would be cool to find a way to dynamically generate this
// array off of `iconsData.selection.map((s) => s.name);`
export enum Icons {
  ArrowDown = 'arrow-down',
  ArrowLeft = 'arrow-left',
  ArrowRight = 'arrow-right',
  ArrowUp = 'arrow-up',
  CheckBoxBG = 'checkbox-bg',
  CheckBoxBox = 'checkbox-box',
  CheckBoxCheck = 'checkbox-check',
  CheckBoxIndeterminate = 'checkbox-indeterminate',
  CheckCircle = 'check-circle',
  ChevronDown = 'chevron-down',
  ChevronLeft = 'chevron-left',
  ChevronRight = 'chevron-right',
  ChevronUp = 'chevron-up',
  ChevronEndDown = 'chevron-end-down',
  ChevronEndLeft = 'chevron-end-left',
  ChevronEndRight = 'chevron-end-right',
  ChevronEndUp = 'chevron-end-up',
  CloseWindow = 'close-window',
  Dash = 'dash',
  ErrorCircle = 'error-circle',
  ExclaimCircle = 'exclaim-circle',
  ExclaimTriangle = 'exclaim-triangle',
  ExclaimTriangleOutline = 'exclaim-triangle-outline',
  InfoCircle = 'info-circle',
  Lightbulb = 'lightbulb',
  Lock = 'lock',
  MagnifyingGlass = 'magnifying-glass',
  MagnifyingGlassCircle = 'magnifying-glass-circle',
  Person = 'person',
  QuestionCircle = 'question-circle',
  QuestionCircleOutline = 'question-circle-outline',
  Syndio = 'syndio',
  Switcher = 'switcher',
}

export interface IIconProps {
  className?: string;
  id?: string;
  name: Icons;
  size?: Sizes;
}

interface IIconObj {
  paths: string[];
  attrs: {
    fill?: string;
  }[];
  grid: number;
  tags: string[];
  colorPermutations: {
    [key: string]: {
      f: number;
    }[];
  };
  defaultCode?: number;
}

export const Icon = ({
  className = '',
  id = '',
  name,
  size = Sizes.sm,
}: IIconProps): JSX.Element => {
  const idProp = { ...(id ? { id } : {}) };

  const getIconMoon = () => {
    const index = iconsData.selection.findIndex((s) => s.name === name);
    const icon = iconsData.icons[index];
    const scale = 0.001 * parseInt(size, 10);

    if (!icon || !icon.paths) {
      throw new Error(
        `Icon "${name}" was not found in IconMoon. Are you sure it was named "${name}"?`
      );
    }

    const renderPath = (iconObj: IIconObj) => (path: string, i: number) => {
      // const attrs = (hasColor && iconObj.attrs && iconObj.attrs[i]) || {};
      const attrs = (iconObj.attrs && iconObj.attrs[i]) || {};

      delete attrs.fill; // handle with tailwind css instead
      return <path key={i} d={path} {...attrs} />;
    };

    return (
      <svg
        {...idProp}
        className={`ico ico--${name} ${className}`}
        version="1.1"
        width={parseInt(size, 10)}
        height={parseInt(size, 10)}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id={`icon-${name}`} transform={`scale(${scale} ${scale})`}>
          {icon.paths.map(renderPath(icon))}
        </g>
      </svg>
    );
  };

  return getIconMoon();
};

Icon.displayName = 'Icon';
