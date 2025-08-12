import { config } from './config.js';

/** @type {ContextHandlers} */
const CONTEXT_HANDLERS = {
  selection: {
    menuName: 'Search "%s" with...',
    getQuery: (info, _) => info.selectionText,
  },
  image: {
    menuName: 'Search image with...',
    getQuery: (info, _) => info.srcUrl,
  },
};

/** @type {Set<ContextType>} */
const createdTopLevelMenus = new Set();

/**
 * @param {MenuItem} item
 */
const getContext = item => item.context ?? 'selection';

/**
 * @param {ContextType} context
 * @returns {string} Top level menu ID
 */
function ensureTopLevelMenuCreated(context) {
  if (!createdTopLevelMenus.has(context)) {
    createdTopLevelMenus.add(context);
    chrome.contextMenus.create({
      id: context,
      contexts: [context],
      title: CONTEXT_HANDLERS[context].menuName
    });
  }
  return context;
}

/**
 * @param {MenuItem[]} items
 */
async function registerMenuItems(items) {
  // Clear previous in case extension is reloaded
  await chrome.contextMenus.removeAll();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const context = getContext(item);

    /** @type {chrome.contextMenus.CreateProperties} */
    const createProps = {
      id: i.toString(),
      parentId: ensureTopLevelMenuCreated(context),
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

/**
 * @param {chrome.contextMenus.OnClickData} info
 * @param {chrome.tabs.Tab} [tab]
 */
function onClicked(info, tab) {
  /** @type {MenuItem} */
  const item = config.menuItems[info.menuItemId];
  if (!item || item.type === 'separator') {
    return;
  }

  const context = getContext(item);

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

registerMenuItems(config.menuItems);
chrome.contextMenus.onClicked.addListener(onClicked);
