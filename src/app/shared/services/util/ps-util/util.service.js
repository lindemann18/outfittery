import angular from 'angular';
import config from '../../../config';

const SERVICE_NAME = 'UtilService';

const countryNames = ["de", "at", "ch", "lu", "nl", "be", "se", "dk", "com"];

const getDomain = (url) => {
  const splittedUrl = url.match(/(.*)\.([^:]*):?(.*)?/);
  return splittedUrl !== null ? splittedUrl[2] : undefined;
};

const matchTranslationConfig=configArray=>{
  var currentDomain = getDomain(window.location.host);
  var countrySelector = countryNames.indexOf(currentDomain);
  var currentLang = configArray[countrySelector];
  return currentLang;
};

function utilService($document, $window) {
  return {

    /**
     *
     * @param element
     * @returns {boolean}
     */
    isOnScreen(element) {
      const win = $(window);
      const navHeight = $('#main_navigation').height();
      const viewport = {
        top: win.scrollTop() + navHeight,
        left: win.scrollLeft(),
      };
      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();

      const bounds = element.offset();
      bounds.right = bounds.left + element.outerWidth();
      bounds.bottom = bounds.top + element.outerHeight();
      return (!(viewport.right < bounds.left || viewport.left > bounds.right ||
      viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    },
    /**
     * Retrieves the domain of the passed url.
     * @param url
     * @returns {*|string}
     */
    getDomain,
    /**
     * Gets the current domain of the site
     * @returns {*|string}
     */
    getCurrentDomain() {
      return this.getDomain($window.location.host);
    },
    /**
     * Gets the customer language based on the site domain
     * @returns {*}
     */
    getCustomerLanguageBasedOnDomain() {
      return config.domainToLanguage[this.getCurrentDomain()] || config.defaultLanguage;
    },
    /**
     * Checks if the page is executed by a touch display.
     * @returns {boolean}
     */
    isOnTouch() {
      if ('ontouchstart' in $document.documentElement) {
        return true;
      }
      return false;
    },
    /**
     *
     * @param str
     * @param params
     * @returns {*}
     */
    format(str, params) {
      angular.forEach(params, (param, id) => {
        const rx = new RegExp(`\\{${id}\\}`, 'gm');
        str = str.replace(rx, param);
      });
      return str;
    },
    /**
     *
     * @param name
     * @returns {string}
     */
    getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    /**
     * Retrieves GA UID
     * @param cookieName
     * @returns {*}
     * @private
     */
    getGAuid() {
      try {
        const cookie = document.cookie.match(new RegExp('_ga=([^;]+)'))[1].split('.');
        return `${cookie[2]}.${cookie[3]}`;
      } catch (e) {
        return null;
      }
    },
    /**
     * Retrieves the snowplowDuid
     * @param cookieName
     * @returns {*}
     * @private
     */
    getSnowplowDuid(cookieName = '_sp_') {
      if (angular.isDefined(document.cookie)) {
        let regex = cookieName;
        regex += 'id\\.[a-f0-9]+=([^;]+);?';
        const matcher = new RegExp(regex);
        const match = document.cookie.match(matcher);
        if (match && match[1]) {
          return match[1].split('.')[0];
        }
      }
      return null;
    },

    /**
     * Remove url parameters
     * @param url, parameterName
     * @returns {*|string}
     * @private
     */
    removeURLParameter(url, parameterName) {
      const urlparts = url.split('?');
      if (urlparts.length >= 2) {
        const prefix = encodeURIComponent(parameterName) + '=';
        const pars = urlparts[1].split(/[&;]/g);
        for (let i = pars.length; i-- > 0;) {
          if (pars[i].lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
          }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");;
      } else {
        return url;
      }
    },

    getCreditCardlLang() {
      return matchTranslationConfig(countryNames);
    }
  };
}

utilService.$inject = ['$document', '$window'];

export { SERVICE_NAME as utilServiceName, utilService };
