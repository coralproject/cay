
/**
 * Module dependencies
 */

import ga from 'react-ga';

/**
 * Initialize analytics
 */

export const init = analyticsId => ga.initialize(analyticsId, {
  debug: (process && process.env.NODE_ENV !== 'production')
});

/**
 * Log pageviews
 */

export function logPageView() {
  ga.pageview(this.state.location.pathname);
};

/**
 * Catch errors and send them to analytics
 */

window.addEventListener('error', e => ga.exception({
  description: e.error.stack
}), false);
