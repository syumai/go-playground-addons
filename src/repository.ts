export class Repository {
  private el: HTMLInputElement | null;
  constructor(private id: string) {
    this.el = null;
  }
  private initEl() {
    if (this.el === null) {
      this.el = document.getElementById(this.id) as HTMLInputElement;
    }
  }
  load(): string {
    this.initEl();
    if (this.el !== null) {
      return this.el.value;
    }
    return "";
  }
  save(value: string) {
    this.initEl();
    if (this.el !== null) {
      this.el.value = value;
    }
  }
}

export const codeRepo = new Repository("code");
export const codeAddonRepo = new Repository("codeAddon");
