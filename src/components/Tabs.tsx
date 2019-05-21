import React, { useCallback } from 'react';
import Tab from './Tab';
import AddTabButton from './AddTabButton';
import { IState, useMappedState } from '../store';

const Tabs: React.FC = () => {
  const { tabCount } = useMappedState(
    useCallback(
      (state: IState) => ({
        tabCount: state.tabs.length,
      }),
      []
    )
  );

  return (
    <>
      {new Array(tabCount).fill(null).map((_, index) => (
        <Tab index={index} key={index} />
      ))}
      <AddTabButton />
    </>
  );
};

export default Tabs;
