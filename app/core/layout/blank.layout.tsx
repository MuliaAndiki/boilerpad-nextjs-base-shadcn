'use client';

import classnames from 'classnames';
import { blankLayoutClasses } from './classes.layout';

type Props = {
  children: React.ReactNode;
};

const BlankLayout = (props: Props) => {
  // Props
  const { children } = props;

  return <div className={classnames(blankLayoutClasses.root, 'is-full bs-full')}>{children}</div>;
};

export default BlankLayout;
