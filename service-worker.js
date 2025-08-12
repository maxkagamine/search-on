import { config } from './config.js';

/** @param {MenuItem} item */
const getContext = item => item.context ?? 'selection';

/**
 * @param {MenuItem[]} items
 */
function registerMenuItems(items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const id = i.toString();

    if (item.type === 'separator') {
      chrome.contextMenus.create({
        id,
        type: 'separator',
        contexts: [getContext(item)],
      });
    } else {
      chrome.contextMenus.create({
        id,
        title: item.name,
        contexts: [getContext(item)],
      });
    }
  }
}

/***
 * @param {chrome.contextMenus.OnClickData} info
 * @param {chrome.tabs.Tab} [tab]
 */
function onClicked(info, tab) {
  /** @type {MenuItem} */
  const item = config.menuItems[info.menuItemId];
  if (!item || item.type === 'separator') {
    return;
  }

  /** @type {string|undefined} */
  let query;
  const context = getContext(item);
  switch (context) {
    case 'image':
      query = info.srcUrl;
      break;
    case 'link':
      query = info.linkUrl;
      break;
    case 'selection':
      query = info.selectionText;
      break;
  }

  if (!query) {
    throw new Error(`Context is '${context}' but the query is undefined.`);
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
