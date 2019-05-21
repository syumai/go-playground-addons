import { createStore, Store } from 'redux';
import { create } from 'redux-react-hook';
import { Action } from './actions';
import reducer from './reducer';
import { Tab } from './models';
import { splitTabs } from './helpers';

export type IState = {
  tabs: Tab[];
  activeTabIndex: number;
  tabsEnabled: boolean;
};

export const INITIAL_STATE: IState = {
  tabs: [],
  activeTabIndex: 0,
  tabsEnabled: false,
};

export function initStore(initailCode: string): Store<IState, Action> {
  const tabs = splitTabs(initailCode);
  return createStore(reducer, { ...INITIAL_STATE, tabs });
}

export const { StoreContext, useDispatch, useMappedState } = create<
  IState,
  Action,
  Store<IState, Action>
>();
