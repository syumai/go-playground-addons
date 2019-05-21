import { Action } from './actions';
import { IState, INITIAL_STATE } from './store';

export default function reducer(state: IState = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case 'ENABLE_TABS': {
      // Unimplemented
      return state;
    }

    case 'DISABLE_TABS': {
      // Unimplemented
      return state;
    }

    case 'SWITCH_TAB': {
      return {
        ...state,
        activeTabIndex: action.index,
      };
    }

    case 'ADD_TAB': {
      const tabs = [...state.tabs];
      tabs.push({
        key: action.key,
        body: action.body,
      });
      const activeTabIndex = tabs.length - 1;
      return { ...state, tabs, activeTabIndex };
    }

    case 'UPDATE_TAB': {
      const tab = {
        ...state.tabs[action.index],
        key: action.key,
        body: action.body,
      };
      state.tabs[action.index] = tab;
      return state;
    }

    case 'REMOVE_TAB': {
      const tabs = [...state.tabs];
      if (tabs.length === 1) {
        return state;
      }
      tabs.splice(action.index, 1);
      const activeTabIndex = action.index === 0 ? 0 : action.index - 1;
      return { ...state, activeTabIndex, tabs };
    }

    case 'MOVE_TAB': {
      // Unimplemented
      return state;
    }

    default:
      return state;
  }
}
