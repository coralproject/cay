
/**
 * Module dependencies
 */

import { Lang } from 'i18n/lang';
// Lang does not know where did you get your messages from.
import messages from 'i18n/messages';
import LangSugar from 'i18n/lang';

const L = new LangSugar();

L.addTranslations(messages['en'], 'en');
L.addTranslations(messages['de'], 'de');
L.addTranslations(messages['es'], 'es');
L.setLocale(L.locale);

export default L;
