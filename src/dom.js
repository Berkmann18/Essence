/**
 * @module dom
 * @description Document-Object Model related module.
 * @requires module:essence
 * @since 2.0
 */
import { $n, $e } from './essence';

/**
 * @description Add CSS code into the page.
 * @param {string} css CSS rules
 * @todo Compare to addCSSRules to see which one is better
 * @public
 */
export const addCSS = (css) => {
  if ($n('style#essenceCSS', true) === null) {
    const style = document.createElement('style');
    style.innerText = css;
    style.type = 'text/css';
    style.id = 'essenceCSS';
    $n('head').appendChild(style);
  } else $e('style#essenceCSS').after(css);
};

/**
 * @description Add JS code into the page.
 * @param {string} js JS instructions
 * @public
 */
export const addJS = (js) => {
  if ($n('script#essenceJS', true) === null) {
    const script = document.createElement('script');
    script.innerText = js;
    script.type = 'text/javascript';
    script.id = 'essenceJS';
    $n('head').appendChild(script);
  } else $e('script#essenceJS').after(js);
};

/**
 * @description Empty the document and place a basic structure.
 * @param {string} [title=document.title] Title of the document
 * @param {string} [author='anonymous'] Author of the document
 */
export const emptyDoc = (title=document.title,
                         author='anonymous') => {
  $e('html').write(`<html>
    <head>
      <title>${title}</title>
      <meta charset="UTF-8" />
      <meta name="author" content="${author}" />
    </head>
    <body></body>
  </html>`, true);
};