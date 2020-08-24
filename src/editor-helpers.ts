// Copyright 2015 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

export function handleKeys(e: KeyboardEvent, onSave: () => void): boolean {
  const el = e.target as HTMLInputElement;
  if (e.key === "Tab" && !e.ctrlKey) {
    insertTabs(el, 1);
    e.preventDefault();
    return false;
  }
  if (e.key === "Enter") {
    if (e.shiftKey) {
      onSave();
      const runBtn = document.getElementById("run") as HTMLInputElement;
      runBtn.click();
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey) {
      onSave();
      const fmtBtn = document.getElementById("fmt") as HTMLInputElement;
      fmtBtn.click();
      e.preventDefault();
    } else {
      autoindent(el);
    }
  }
  return true;
}

function insertTabs(el: HTMLInputElement, n: number) {
  const start = el.selectionStart as number;
  const end = el.selectionEnd as number;
  const v = el.value;
  let u = v.substr(0, start);
  for (let i = 0; i < n; i++) {
    u += "\t";
  }
  u += v.substr(end);
  el.value = u;
  el.selectionStart = start + n;
  el.selectionEnd = start + n;
}

function autoindent(el: HTMLInputElement) {
  let curpos = el.selectionStart as number;
  let tabs = 0;
  while (curpos > 0) {
    curpos--;
    if (el.value[curpos] === "\t") {
      tabs++;
    } else if (tabs > 0 || el.value[curpos] === "\n") {
      break;
    }
  }
  setTimeout(() => {
    insertTabs(el, tabs);
  }, 1);
}
