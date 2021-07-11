import { DEFAULT_LANGUAGE, PRICE_WITH_DOT_FORMAT } from 'shared/languageOption';

const REGEX = /\d(?=(\d{3})+\.)/g;
const COMMA_BREAK = '$&,';
const SPACE_BREAK = '$& ';

/**
 * @param {string} price A string param.
 * @param {string} [language=] An optional current user's language property.
 * @return {string} Price in the appropriate format for a given language.
 */
export default (price) => (language = DEFAULT_LANGUAGE) => {
  let parse = parseFloat(price);
  if (Number.isNaN(parse)) {
    parse = 0;
  }

  if (parse < Number.MIN_SAFE_INTEGER || parse > Number.MAX_SAFE_INTEGER) {
    parse = 0;
  }

  parse = parse.toFixed(2);

  if (PRICE_WITH_DOT_FORMAT.includes(language)) {
    return parse.replace(REGEX, COMMA_BREAK);
  }

  return parse.replace(REGEX, SPACE_BREAK).replace('.', ',');
};
