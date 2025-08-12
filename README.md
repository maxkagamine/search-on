# "Search on..." Context Menu Chrome Extension

![](screenshot.avif)

Very simple Chrome extension that adds a custom "Search on..." list to the context menu for selected text & images.

There are various extensions like this on the webstore, but after the one I was using suddenly started asking for permission to access all of my data, I decided it's [best to minimize third-party extension usage](https://github.com/extesy/hoverzoom/discussions/670) and create my own instead.

Feel free to fork this and modify it for your own use. I don't currently plan on publishing it to the webstore; rather, it's meant to be edited directly and [sideloaded](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked). The source is [so simple](./service-worker.js) anyway that the code needed to add an options page would be larger than the rest of the extension.

Rename config-sample.js to config.js first after cloning/forking the repo. I used plain JS with jsdoc typings, so there's no build step; after editing the config, just reload the extension (the ↻ button on the Extensions page). You can `npm install` to get the typings for the Chrome APIs if you plan on modifying the source. Also, I prepared a separate set of icons in case your browser is set to light mode: open [manifest.json](./manifest.json) and change "dark" to "light".

> [!NOTE]
> It would be nice to add favicons, but while the WebExtensions spec has a way to [specify icons for menu items](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/create#icons), Chromium browsers don't support it. [An issue has been open somehow since 2010](https://issues.chromium.org/issues/40438325), and the latest I can find on the topic is [a comment from someone on the Chrome team](https://github.com/w3c/webextensions/issues/592#issuecomment-2200399006) saying "we are open to supporting this for sub-level menu items although it isn't something we are likely to prioritize."

## Legal stuff

Copyright © Max Kagamine  
Licensed under the [Apache License, Version 2.0](LICENSE.txt)

## Illegal stuff

[Pirates!](https://www.youtube.com/watch?v=NSZhIAfR6dA)
