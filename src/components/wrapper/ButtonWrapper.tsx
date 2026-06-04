import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from '../atoms';

export interface ActionButtonProps extends ButtonProps {
  isPending?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, isPending = false, iconLeft, iconRight, disabled, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={isPending || disabled} {...props}>
        {isPending ? <Loader2 className="size-4 animate-spin shrink-0" /> : iconLeft}

        {children}

        {!isPending && iconRight}
      </Button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

export { ActionButton };
