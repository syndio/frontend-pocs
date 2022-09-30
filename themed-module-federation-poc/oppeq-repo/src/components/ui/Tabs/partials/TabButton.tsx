import React, { useRef } from 'react';
import type { ITabButton } from '@ui/Tabs/types';

export const TabButton = ({
  onChange,
  onFocus,
  focusedTab,
  activeTab,
  id,
  title,
}: ITabButton): JSX.Element => {
  const selected = activeTab === id;
  const selectedCss = selected ? 'syo-tabs__tab--selected' : '';
  const tabId = `tab-${id}`;
  const ref = useRef<HTMLDivElement>(null);

  const onClick = (e: React.MouseEvent<Element>) => {
    onChange(e, id);
  };

  const onKeyDown = (e: React.KeyboardEvent<Element>) => {
    const itemEl = ref.current;

    if (e.key === 'ArrowLeft') {
      e.preventDefault(); // prevent key presses from scrolling <main /> region

      if (itemEl?.previousElementSibling) {
        const previousSibling = itemEl?.previousElementSibling as HTMLLIElement;

        previousSibling.focus();

        onFocus(previousSibling.id);
      } else {
        // if the focus is on the first tab and the user presses
        // the left arrow, move focus to the last tab so the user
        // can cycle through the tabs
        const lastSibling = itemEl?.parentNode?.lastChild as HTMLLIElement;

        lastSibling.focus();

        onFocus(lastSibling.id);
      }
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault(); // prevent key presses from scrolling <main /> region

      if (itemEl?.nextElementSibling) {
        const nextSibling = itemEl?.nextElementSibling as HTMLLIElement;

        nextSibling.focus();

        onFocus(nextSibling.id);
      } else {
        // if the focus is on the last tab and the user presses
        // the right arrow, move focus to the first tab so the
        // user can cycle through the tabs
        const firstSibling = itemEl?.parentNode?.firstChild as HTMLLIElement;

        firstSibling.focus();

        onFocus(firstSibling.id);
      }
    }

    // Enter for triggering click selection and spacebar for triggering collapse/expand
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // prevent key presses from scrolling <main /> region

      onChange(e, id);
    }
  };

  let tabIndex;

  if (focusedTab !== '') {
    tabIndex = focusedTab === tabId ? 0 : -1;
  } else {
    // on first render, set it by selected value
    tabIndex = selected ? 0 : -1;
  }

  return (
    <button
      ref={ref as unknown as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`syo-tabs__tab ${selectedCss}`}
      role="tab"
      aria-selected={selected}
      aria-controls={id}
      id={tabId}
      tabIndex={tabIndex}
    >
      {title}
    </button>
  );
};
