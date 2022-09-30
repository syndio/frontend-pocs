import React, { useRef, ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Tooltip, ITooltip } from '@ui/Tooltip';
import { Direction } from '@ui/config';

const TooltipWrapper = ({
  tooltipProps,
}: {
  tooltipProps: Omit<ITooltip, 'targetRef'>;
}): ReactElement => {
  const tooltipToggleRef = useRef(null);
  return (
    <div>
      <span ref={tooltipToggleRef}>Top</span>
      <Tooltip {...tooltipProps} targetRef={tooltipToggleRef} />
    </div>
  );
};

describe('Tooltip component', () => {
  test('should not be visible by default', () => {
    render(
      <TooltipWrapper
        tooltipProps={{ isVisible: false, placement: Direction.Top, children: 'Tooltip body' }}
      />
    );

    expect(screen.queryByTestId('syo-tooltip')).not.toBeInTheDocument();
  });

  test('should be visible inline', async () => {
    render(
      <TooltipWrapper
        tooltipProps={{ isVisible: true, placement: Direction.Top, children: 'Tooltip body' }}
      />
    );
    const tooltip = await screen.findByTestId('syo-tooltip');

    expect(tooltip).toBeInTheDocument();
  });

  test('should be positioned relative to ref per specified placement', async () => {
    const tooltipProps = {
      isVisible: true,
      placement: Direction.Top,
      children: 'Tooltip body',
    };
    const { rerender } = render(<TooltipWrapper tooltipProps={{ ...tooltipProps }} />);
    const tooltip = await screen.findByTestId('syo-tooltip');

    expect(tooltip).toBeInTheDocument();

    await waitFor(() => {
      expect(tooltip?.getAttribute('data-popper-placement')).toBe('top');
    });

    rerender(
      <TooltipWrapper tooltipProps={{ ...tooltipProps, placement: Direction.Bottom }} />
    );

    await waitFor(() => {
      expect(tooltip?.getAttribute('data-popper-placement')).toBe('bottom');
    });

    rerender(
      <TooltipWrapper tooltipProps={{ ...tooltipProps, placement: Direction.Right }} />
    );

    await waitFor(() => {
      expect(tooltip?.getAttribute('data-popper-placement')).toBe('right');
    });

    rerender(<TooltipWrapper tooltipProps={{ ...tooltipProps, placement: Direction.Left }} />);

    await waitFor(() => {
      expect(tooltip?.getAttribute('data-popper-placement')).toBe('left');
    });
  });
});
