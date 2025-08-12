import { config } from './config.js';

/** @type {ContextHandlers} */
const CONTEXT_HANDLERS = {
  selection: {
    menuName: 'Search "%s" on...',
    getQuery: (info, _) => info.selectionText,
  },
  image: {
    menuName: 'Search image on...',
    getQuery: (info, _) => info.srcUrl,
  },
};

const CONTEXT_TYPES = /** @type {ContextType[]} */ (Object.keys(CONTEXT_HANDLERS));

function registerMenuItems() {
  for (let context of CONTEXT_TYPES) {
    const items = config[context];
    if (!items || !items.length) {
      continue;
    }

    // Create top-level menu
    chrome.contextMenus.create({
      id: context,
      contexts: [context],
      title: CONTEXT_HANDLERS[context].menuName
    });

    // Add menu items
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      /** @type {chrome.contextMenus.CreateProperties} */
      const createProps = {
        id: `${context}_${i}`,
        parentId: context,
        contexts: [context]
      };

      if (item.type === 'separator') {
        chrome.contextMenus.create({
          ...createProps,
          type: 'separator',
        });
      } else {
        chrome.contextMenus.create({
          ...createProps,
          title: item.name,
        });
      }
    }
  }
}

/**
 * @param {string} id
 * @returns {[ContextType, MenuItem] | undefined}
 */
function getMenuItem(id) {
  const [context, i] = /** @type {[ContextType, number]} */ (id.split('_'));
  if (!CONTEXT_TYPES.includes(context)) {
    return;
  }
  const item = config[context]?.[i];
  if (item) {
    return [context, item];
  }
}

/**
 * @param {chrome.contextMenus.OnClickData} info
 * @param {chrome.tabs.Tab} [tab]
 */
function onClicked(info, tab) {
  const [context, item] = getMenuItem(info.menuItemId.toString()) ?? [];
  if (!item || item.type === 'separator') {
    return;
  }

  const query = CONTEXT_HANDLERS[context].getQuery(info, tab);
  if (!query) {
    throw new Error(`Query is undefined (context = '${context}', info = ${JSON.stringify(info)}).`);
  }

  const url = item.url.replace('%s', encodeURIComponent(query));

  /** @type {Parameters<chrome.tabs.create>[0]} */
  let createProps = { url };

  if (tab) {
    createProps.openerTabId = tab.id;
    createProps.windowId = tab.windowId;
    createProps.index = tab.index + 1;
  }

  chrome.tabs.create(createProps);
}

chrome.runtime.onInstalled.addListener(registerMenuItems);
chrome.contextMenus.onClicked.addListener(onClicked);
