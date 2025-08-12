/** Subset of supported context types. */
type ContextType = Extract<chrome.contextMenus.ContextType, 'selection' | 'image'>;

type Config = {
  [c in ContextType]?: MenuItem[];
};

interface NormalMenuItem {
  type?: 'normal';
  name: string;
  /** '%s' is replaced with the search query (context-dependent). */
  url: string;
}

interface SeparatorMenuItem {
  type: 'separator';
}

type MenuItem = NormalMenuItem | SeparatorMenuItem;

type ContextHandlers = Record<ContextType, {
  menuName: string,
  getQuery(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): string | undefined,
}>;
