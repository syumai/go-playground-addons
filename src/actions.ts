export type Action =
  | {
      type: 'ENABLE_TABS';
    }
  | {
      type: 'DISABLE_TABS';
    }
  | {
      type: 'SWITCH_TAB';
      index: number;
    }
  | {
      type: 'ADD_TAB';
      key: string;
      body: string;
    }
  | {
      type: 'UPDATE_TAB';
      index: number;
      key: string;
      body: string;
    }
  | {
      type: 'REMOVE_TAB';
      index: number;
    }
  | {
      type: 'MOVE_TAB';
      fromIndex: number;
      toIndex: number;
    };
