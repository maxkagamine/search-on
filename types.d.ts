interface Config {
  menuItems: MenuItem[];
}

/** Context types subset supported by the onClicked handler. */
type ContextType = Extract<chrome.contextMenus.ContextType, 'selection' | 'image' | 'link'>;

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
