interface Config {
  menuItems: MenuItem[];
}

/** Subset of supported context types. */
type ContextType = Extract<chrome.contextMenus.ContextType, 'selection' | 'image'>;

interface NormalMenuItem {
  type?: 'normal';
  /** Defaults to `selection`. */
  context?: ContextType;
  name: string;
  /** '%s' is replaced with the search query (context-dependent). */
  url: string;
}

interface SeparatorMenuItem {
  type: 'separator';
  context?: ContextType;
}

type MenuItem = NormalMenuItem | SeparatorMenuItem;

type ContextHandlers = Record<ContextType, {
  menuName: string,
  getQuery(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): string | undefined,
}>;
