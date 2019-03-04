define(['exports', './auth-utilities', './base-config', 'aurelia-dependency-injection'], function (exports, _authUtilities, _baseConfig, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Iframe = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Iframe = exports.Iframe = (_dec = (0, _aureliaDependencyInjection.inject)(_baseConfig.BaseConfig), _dec(_class = function () {
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
              var hash = (0, _authUtilities.parseQueryString)(hashParams);
              var qs = (0, _authUtilities.parseQueryString)(queryParams);

              (0, _authUtilities.extend)(qs, hash);

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
  }()) || _class);
});