import { PRICE_WITH_COMMA_FORMAT, PRICE_WITH_DOT_FORMAT } from 'shared/languageOption';
import priceFormat from './priceFormat';

const LANG_COMMA_FORMAT = PRICE_WITH_COMMA_FORMAT[0];
const LANG_DOT_FORMAT = PRICE_WITH_DOT_FORMAT[0];

describe('priceFormat', () => {
  it('should defined', () => {
    expect(priceFormat).not.toBeUndefined;
  });

  it('should return zero (with comma format) for string', () => {
    expect(priceFormat('lorem ipsum')(LANG_COMMA_FORMAT)).toEqual('0,00');
  });

  it('should return zero (with dot format) for string', () => {
    expect(priceFormat('lorem ipsum')(LANG_DOT_FORMAT)).toEqual('0.00');
  });

  it('should return zero (with comma format) for minimal integer', () => {
    expect(priceFormat(Number.MIN_VALUE)(LANG_COMMA_FORMAT)).toEqual('0,00');
  });

  it('should return zero (with dot format) for minimal integer', () => {
    expect(priceFormat(Number.MIN_VALUE)(LANG_DOT_FORMAT)).toEqual('0.00');
  });

  it('should return zero (with comma format) for maximal integer', () => {
    expect(priceFormat(Number.MAX_VALUE)(LANG_COMMA_FORMAT)).toEqual('0,00');
  });

  it('should return zero (with dot format) for maximal integer', () => {
    expect(priceFormat(Number.MAX_VALUE)(LANG_DOT_FORMAT)).toEqual('0.00');
  });

  it('should return correct format (with comma format) if language property is incorrect', () => {
    expect(priceFormat(7)('lorem ipsum')).toEqual('7,00');
  });

  it('should return correct format (with comma format) for zero', () => {
    const correctValue = '0,00';

    expect(priceFormat(0)(LANG_COMMA_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0')(LANG_COMMA_FORMAT)).toEqual(correctValue);
    expect(priceFormat(0.00)(LANG_COMMA_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0,00')(LANG_COMMA_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0,001')(LANG_COMMA_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0.00')(LANG_COMMA_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0.001')(LANG_COMMA_FORMAT)).toEqual(correctValue);
  });

  it('should return correct format (with dot format) for zero', () => {
    const correctValue = '0.00';

    expect(priceFormat(0)(LANG_DOT_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0')(LANG_DOT_FORMAT)).toEqual(correctValue);
    expect(priceFormat(0.00)(LANG_DOT_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0,00')(LANG_DOT_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0,001')(LANG_DOT_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0.00')(LANG_DOT_FORMAT)).toEqual(correctValue);
    expect(priceFormat('0.001')(LANG_DOT_FORMAT)).toEqual(correctValue);
  });

  it('should return correct format (with comma format) for number', () => {
    expect(priceFormat(5)(LANG_COMMA_FORMAT)).toEqual('5,00');
    expect(priceFormat(10)(LANG_COMMA_FORMAT)).toEqual('10,00');
    expect(priceFormat(1000)(LANG_COMMA_FORMAT)).toEqual('1 000,00');
    expect(priceFormat(1000000000)(LANG_COMMA_FORMAT)).toEqual('1 000 000 000,00');
  });

  it('should return correct format (with dot format) for number', () => {
    expect(priceFormat(5)(LANG_DOT_FORMAT)).toEqual('5.00');
    expect(priceFormat(10)(LANG_DOT_FORMAT)).toEqual('10.00');
    expect(priceFormat(1000)(LANG_DOT_FORMAT)).toEqual('1,000.00');
    expect(priceFormat(1000000000)(LANG_DOT_FORMAT)).toEqual('1,000,000,000.00');
  });

  it('should return correct format (with comma format) for floating point number', () => {
    expect(priceFormat(5.01)(LANG_COMMA_FORMAT)).toEqual('5,01');
    expect(priceFormat(10.054)(LANG_COMMA_FORMAT)).toEqual('10,05');
    expect(priceFormat(1000.10)(LANG_COMMA_FORMAT)).toEqual('1 000,10');
    expect(priceFormat(1000000000.9999999)(LANG_COMMA_FORMAT)).toEqual('1 000 000 001,00');
  });

  it('should return correct format (with dot format) for floating point number', () => {
    expect(priceFormat(5.01)(LANG_DOT_FORMAT)).toEqual('5.01');
    expect(priceFormat(10.054)(LANG_DOT_FORMAT)).toEqual('10.05');
    expect(priceFormat(1000.10)(LANG_DOT_FORMAT)).toEqual('1,000.10');
    expect(priceFormat(1000000000.9999999)(LANG_DOT_FORMAT)).toEqual('1,000,000,001.00');
  });

  it('should return correct format (with comma format) for minus floating point number', () => {
    expect(priceFormat(-5.01)(LANG_COMMA_FORMAT)).toEqual('-5,01');
    expect(priceFormat(-10.054)(LANG_COMMA_FORMAT)).toEqual('-10,05');
    expect(priceFormat(-1000.10)(LANG_COMMA_FORMAT)).toEqual('-1 000,10');
    expect(priceFormat(-1000000000.9999999)(LANG_COMMA_FORMAT)).toEqual('-1 000 000 001,00');
  });

  it('should return correct format (with dot format) for minus floating point number', () => {
    expect(priceFormat(-5.01)(LANG_DOT_FORMAT)).toEqual('-5.01');
    expect(priceFormat(-10.054)(LANG_DOT_FORMAT)).toEqual('-10.05');
    expect(priceFormat(-1000.10)(LANG_DOT_FORMAT)).toEqual('-1,000.10');
    expect(priceFormat(-1000000000.9999999)(LANG_DOT_FORMAT)).toEqual('-1,000,000,001.00');
  });
});
