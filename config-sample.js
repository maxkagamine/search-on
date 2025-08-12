/** @type {Config} */
export const config = {
  selection: [
    {
      name: 'Google Translate',
      url: 'https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=%s',
    },
    {
      name: 'DeepL',
      url: 'https://www.deepl.com/en/translator#ja/en/%s',
    },
    {
      name: 'Jisho',
      url: 'https://jisho.org/search/%s',
    },
    {
      name: 'Serifu.org',
      url: 'https://serifu.org/translate/%s',
    },
    {
      name: 'Reverso',
      url: 'https://context.reverso.net/translation/english-japanese/%s',
    },
    {
      name: 'Tatoeba',
      url: 'https://tatoeba.org/eng/sentences/search?from=jpn&to=eng&query=%s',
    },
    {
      type: 'separator',
    },
    {
      name: 'VocaDB',
      url: 'https://vocadb.net/Search?filter=%s',
    },
    {
      name: 'AniDB',
      url: 'https://anidb.net/search/fulltext/?adb.search=%s&do.search=1&entity.animetb=1&field.titles=1',
    },
    {
      name: 'MyAnimeList',
      url: 'https://myanimelist.net/anime.php?q=%s',
    },
    {
      name: 'MangaUpdates',
      url: 'https://www.mangaupdates.com/site/search/result?search=%s',
    },
    {
      name: 'VNDB',
      url: 'https://vndb.org/v/all?sq=%s',
    },
  ],
  image: [
    {
      name: 'SauceNAO',
      url: 'https://saucenao.com/search.php?db=999&url=%s',
    },
    {
      name: 'IQDB',
      url: 'https://iqdb.org/?url=%s',
    },
  ],
};
