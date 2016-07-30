
/**
 * Module dependencies
 */

import { Lang } from 'i18n/lang';
// Lang does not know where did you get your messages from.
import messages from 'i18n/messages';
import LangSugar from 'i18n/lang';

window.L = new LangSugar();

window.L.addTranslations(messages['en'], 'en');
window.L.addTranslations(messages['de'], 'de');
window.L.addTranslations(messages['es'], 'es');
window.L.setLocale(window.L.locale);
