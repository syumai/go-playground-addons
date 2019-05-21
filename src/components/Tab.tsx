import React from 'react';
import { useTab } from '../hooks';

type TabProps = {
  index: number;
};

const Tab: React.FC<TabProps> = ({ index }) => {
  const { tab, switchTab, removeTab } = useTab(index);
  const classNames = ['tab'];
  if (tab.active) {
    classNames.push('active');
  }
  const removeTabWithConfirmation = () => {
    if (window.confirm('Are you sure you want to remove this file?')) {
      removeTab();
    }
  };
  return (
    <div className={classNames.join(' ')}>
      <div className="tab-title" onClick={switchTab}>
        {tab.key}
      </div>
      <div className="tab-delete-button" onClick={removeTabWithConfirmation}>
        ×
      </div>
    </div>
  );
};

export default Tab;
