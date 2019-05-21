import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from './components/Tabs';
import { initStore, StoreContext } from './store';
import { codeRepo } from './repository';
import { editor } from './editor';
import { initDOM } from './dom';

initDOM();
const store = initStore(codeRepo.load());
editor.init(store);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Tabs />
  </StoreContext.Provider>,
  document.getElementById('tabs')
);
