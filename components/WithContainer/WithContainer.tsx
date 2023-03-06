import { ComponentPropsWithoutRef, FC } from 'react';
import classNames from 'classnames';

const WithContainer: FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(
        'container max-w-screen-xl mx-auto px-7 min-h-screen',
        className
      )}
    />
  );
};

export default WithContainer;
