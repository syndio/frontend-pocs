import React from 'react';
import { Intent } from '@ui/config';
import { Button } from '@ui/Button';
interface FallbackProps {
  error: Error;
  resetErrorBoundary?: (...args: Array<unknown>) => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps): JSX.Element => {
  return (
    <div className="text-center mx-auto max-w-sm" role="alert">
      <div className="prose prose-header-3 mb-14">
        {error.message || <>The component didn&rsquo;t load because something went wrong.</>}
      </div>

      {resetErrorBoundary && (
        <Button intent={Intent.Secondary} onClick={resetErrorBoundary}>
          Try again
        </Button>
      )}
    </div>
  );
};

ErrorFallback.displayName = 'ErrorFallback';
