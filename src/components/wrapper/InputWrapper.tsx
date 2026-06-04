import * as React from 'react';
import { Input } from '@/components/atoms';
import { cn } from '@/utils/classname';

export interface DecoratedInputProps extends React.ComponentProps<typeof Input> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const DecoratedInput = React.forwardRef<HTMLInputElement, DecoratedInputProps>(
  ({ className, iconLeft, iconRight, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {iconLeft && (
          <div className="absolute left-3 flex items-center justify-center text-muted-foreground pointer-events-none">
            {iconLeft}
          </div>
        )}

        <Input
          ref={ref}
          className={cn(iconLeft ? 'pl-10' : '', iconRight ? 'pr-10' : '', className)}
          {...props}
        />

        {iconRight && (
          <div className="absolute right-3 flex items-center justify-center text-muted-foreground">
            {iconRight}
          </div>
        )}
      </div>
    );
  }
);

DecoratedInput.displayName = 'DecoratedInput';

export { DecoratedInput };
