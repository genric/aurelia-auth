'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Iframe = undefined;

var _dec, _class;

var _authUtilities = require('./auth-utilities');

var _baseConfig = require('./base-config');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    if (iframeRef) {
      this.iframe = iframeRef;
      this.iframe.setAttribute('src', url);
    } else {
      this.iframe = document.createElement('iframe');
      this.iframe.setAttribute('height', '1px');
      this.iframe.setAttribute('width', '1px');
      this.iframe.setAttribute('src', url);
      document.body.appendChild(this.iframe);
    }

    return this;
  };

  Iframe.prototype.eventListener = function eventListener(redirectUri) {
    var _this = this;

    var promise = new Promise(function (resolve, reject) {
      _this.iframe.addEventListener('load', function () {
        try {
          var documentHost = document.location.host;
          var iframeUrl = _this.iframe.contentWindow.location;
          var iframeHost = iframeUrl.host;

          if (iframeHost === documentHost && (iframeUrl.search || iframeUrl.hash)) {
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