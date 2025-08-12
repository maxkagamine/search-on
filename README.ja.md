# 「…で検索」コンテキストメニューのChrome拡張機能

![](screenshot.avif)

[English](README.md)&ensp;|&ensp;[ZIPをダウンロードする](https://github.com/maxkagamine/search-on/archive/refs/heads/master.zip)

検索されたテクストとイメージのコンテキストメニューにカスタムな「…で検索」リストを追加する簡単なChrome拡張機能です。

ウェブストアではこのような拡張機能がすでに色々ありますが、私は以前使っていたのが突然、私のありとあらゆるデータへのアクセスできるような権限を求めてから、[サードパーティ製の拡張機能の利用を最小限にして](https://github.com/extesy/hoverzoom/discussions/670)、自分で作ることにしました。

自由にフォークして、自分用に改造してください。私は現在これをウェブストアで公開するつもりがありません。むしろ、直接に変更して[サイドロード](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=ja#load-unpacked)することを想定しています。ソースは[こんなにシンプル](./service-worker.js)なので、オプションページを追加するためのコードの方が拡張機能全体より大きくなってしまうでしょう。

リポジトリをクローンかフォークしてから、先ずはconfig-sample.jsの名前をconfig.jsに変更してください。私は素のJSをJSDoc型定義付きで使ったから、ビルドステップがありません。コンフィグを変更したら、拡張機能をリロードする（拡張機能ページでの ↻ ボタンを押す）だけです。ソースを変更したいなら、ChromeのAPIの型定義を取り込むために`npm install`を実行してください。それに、ブラウザがライトモードに設定されている場合に備えて、私は別のアイコンセットを用意しました。使いたければ[manifest.json](./manifest.json)を開けて「dark」を「light」に変更してください。

> [!NOTE]
> ファビコンを追加したいけど、WebExtensions仕様が[メニュー項目にアイコンを指定する](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/create#icons)方法があるのに、Chromium系ブラウザがサポートしていません。[課題がどうにかして2010年からずっとオープンで](https://issues.chromium.org/issues/40438325)、これに関して私が見つけられた最新情報は、Chromeチームのメンバーによる（英語から翻訳している）「サブレベルのメニュー項目なら、これをサポートすることに反対しないけど、私たちが優先する可能性の高いものじゃない」[というコメント](https://github.com/w3c/webextensions/issues/592#issuecomment-2200399006)です。

## 法的事項

Copyright © 鏡音マックス  
[Apache License 2.0](LICENSE.txt)の下でライセンスされています

## 違法事項

[海賊！](https://www.youtube.com/watch?v=NSZhIAfR6dA)
