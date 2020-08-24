import { Store } from "redux";
import { IState } from "./store";
import { Action } from "./actions";
import { concatTabs } from "./helpers";
import { codeRepo, codeAddonRepo } from "./repository";
import { Tab } from "./models";
import { handleKeys } from "./editor-helpers";

class Editor {
  private store: Store<IState, Action> | null = null;
  private el: HTMLInputElement | null = null;

  init(store: Store<IState, Action>) {
    this.store = store;
    codeAddonRepo.save(this.activeTab.body);

    const el = document.getElementById("codeAddon") as HTMLInputElement;
    el.addEventListener("change", () => {
      this.save();
    });
    el.addEventListener("keydown", (e) => {
      handleKeys(e, () => this.save());
    });
    this.el = el;
  }

  private get tabs(): Tab[] {
    if (!this.store) {
      return [];
    }
    const { tabs } = this.store.getState();
    return tabs;
  }

  private get activeTabIndex(): number {
    if (!this.store) {
      return 0;
    }
    const { activeTabIndex } = this.store.getState();
    return activeTabIndex;
  }

  private get activeTab(): Tab {
    if (!this.store) {
      return { key: "", body: "" };
    }
    const { tabs, activeTabIndex } = this.store.getState();
    return tabs[activeTabIndex];
  }

  save() {
    if (!this.store || !this.el) {
      return;
    }
    this.store.dispatch({
      type: "UPDATE_TAB",
      index: this.activeTabIndex,
      key: this.activeTab.key,
      body: this.el.value,
    });
    codeRepo.save(concatTabs(this.tabs));
  }

  focus() {
    if (!this.el) {
      return;
    }
    this.el.focus();
  }
}

export const editor = new Editor();
