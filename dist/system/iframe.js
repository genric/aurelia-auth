'use strict';

System.register(['./auth-utilities', './base-config', 'aurelia-dependency-injection'], function (_export, _context) {
  "use strict";

  var parseQueryString, extend, forEach, BaseConfig, inject, _dec, _class, Iframe;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_authUtilities) {
      parseQueryString = _authUtilities.parseQueryString;
      extend = _authUtilities.extend;
      forEach = _authUtilities.forEach;
    }, function (_baseConfig) {
      BaseConfig = _baseConfig.BaseConfig;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }],
    execute: function () {
      _export('Iframe', Iframe = (_dec = inject(BaseConfig), _dec(_class = function () {
        function Iframe(config) {
          _classCallCheck(this, Iframe);

          this.config = config.current;
          this.iframe = null;
          this.polling = null;
          this.url = '';
        }

        Iframe.prototype.open = function open(url, iframeRef) {
          this.url = url;
          this.iframe = iframeRef;
          this.iframe.setAttribute('src', url);

          return this;
        };

        Iframe.prototype.eventListener = function eventListener(redirectUri) {
          var _this = this;

          var promise = new Promise(function (resolve, reject) {
            _this.iframe.addEventListener('load', function () {
              try {
                var iframeUrl = _this.iframe.contentWindow.location;
                var iframeHost = iframeUrl.host;

                if (iframeUrl.toString().startsWith(redirectUri) && (iframeUrl.search || iframeUrl.hash)) {
                  var queryParams = iframeUrl.search.substring(1).replace(/\/$/, '');
                  var hashParams = iframeUrl.hash.substring(1).replace(/[\/$]/, '');
                  var hash = parseQueryString(hashParams);
                  var qs = parseQueryString(queryParams);

                  extend(qs, hash);

                  if (qs.error) {
                    reject({ error: qs.error });
                  } else {
                    resolve(qs);
                  }
                }
              } catch (error) {}
            });
          });
          return promise;
        };

        return Iframe;
      }()) || _class));

      _export('Iframe', Iframe);
    }
  };
});