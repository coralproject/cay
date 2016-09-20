

/**
 * Module constants
 */
const CONFIG_ROUTES = ['/config.json', '/data_config.json'];
const REQUIRED_KEYS = [ 'xeniaHost', 'trustHost', 'askHost', 'basicAuthorization',
                        'environment', 'googleAnalyticsId', 'requireLogin' ];

/**
 * Load config from json files. Not handling errors because the app can't recover
 * if config cannot be loaded
 */

export const loadConfig = () =>
  Promise.all(CONFIG_ROUTES.map(fetchConfigFile))
  .then(([app, filters]) => {
    if (!allKeysDefined(app, REQUIRED_KEYS)) {
      throw new Error(`missing required keys on config.json. Must define ${REQUIRED_KEYS.join('|')}`);
    }
    // redefine elkhornStaticHost if not set
    app.elkhornStaticHost = app.elkhornStaticHost || `${app.elkhornHost}/widgets`;

    return [app, filters];
  });

/**
 * Fetch file
 */

const fetchConfigFile = route => fetch(route).then(res => res.json());

/**
 * Make sure everything is in place
 */

const allKeysDefined = (app, keys) => keys.every(key => 'undefined' !== typeof app[key]);
