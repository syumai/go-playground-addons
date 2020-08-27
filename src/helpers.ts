import { Tab } from "./models";

export function splitTabs(body: string): Tab[] {
  const parts = body.split(/-- (.+?) --\n/);
  const tabMap: { [key: string]: Tab } = {};
  if (parts[0] !== "") {
    const key = "main.go";
    const body = parts[0];
    tabMap[key] = {
      key,
      body,
    };
  }
  for (let i = 1; i < parts.length; i += 2) {
    if (parts.length === i + 1) {
      console.error("tabs parsing error.");
      break;
    }
    const key = parts[i];
    const body = parts[i + 1];
    tabMap[key] = {
      key,
      body,
    };
  }
  return Object.values(tabMap);
}

export function concatTabs(tabs: Tab[]): string {
  if (tabs.length === 1) {
    return tabs[0].body;
  }
  return tabs
    .map(
      ({ key, body }) =>
        `-- ${key} --
${body}`
    )
    .join("\n\n");
}
