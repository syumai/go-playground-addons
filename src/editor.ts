import { Store } from "redux";
import { IState } from "./store";
import { Action } from "./actions";
import { concatTabs, splitTabs } from "./helpers";
import { codeRepo, codeAddonRepo } from "./repository";
import { Tab } from "./models";
import { handleKeys } from "./editor-helpers";
import { GoPlayground } from "@syumai/goplayground";

const gp = new GoPlayground();

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
      handleKeys(e, async () => {
        this.save();
      });
      this.handleFmt(e);
    });
    this.el = el;

    const originalFmtBtn = document.getElementById("fmt") as HTMLInputElement;
    const fmtBtn = originalFmtBtn.cloneNode(true) as HTMLInputElement;
    originalFmtBtn.parentNode?.replaceChild(fmtBtn, originalFmtBtn);
    fmtBtn.addEventListener("click", () => {
      this.handleFmt();
    });
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
    this.el?.focus();
  }

  private async handleFmt(e?: KeyboardEvent) {
    if (e !== undefined && (e.key !== "Enter" || !e.ctrlKey)) {
      return;
    }
    this.save();
    const importsInput = document.getElementById("imports") as HTMLInputElement;
    const result = await gp.format(codeRepo.load(), importsInput.checked);
    if (result.Error !== "") {
      const outputContainer = document.getElementById(
        "output"
      ) as HTMLDivElement;
      const pre = outputContainer.firstChild as HTMLPreElement;
      pre.className = "error";
      pre.textContent = result.Error;
      return;
    }
    codeRepo.save(result.Body);
    const tabs = splitTabs(result.Body);
    tabs.forEach((tab, i) => {
      if (!this.store) {
        return;
      }
      this.store.dispatch({
        type: "UPDATE_TAB",
        index: i,
        key: tab.key,
        body: tab.body,
      });
      codeAddonRepo.save(this.activeTab.body);
    });
  }
}

export const editor = new Editor();
