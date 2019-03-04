import {parseQueryString, extend, forEach} from './auth-utilities';
import {BaseConfig}  from './base-config';
import {inject} from 'aurelia-dependency-injection';

@inject(BaseConfig)
export class Iframe {
  constructor(config) {
    this.config = config.current;
    this.iframe = null;
    this.polling = null;
    this.url = '';
  }

  open(url, iframeRef) {
    this.url = url;
    this.iframe = iframeRef;
    this.iframe.setAttribute('src', url);

    return this;
  }

  eventListener(redirectUri) {
    let promise = new Promise((resolve, reject) => {
      this.iframe.addEventListener('load', () => {
        try {
          let iframeUrl = this.iframe.contentWindow.location;
          let iframeHost = iframeUrl.host;

          if (iframeUrl.toString().startsWith(redirectUri) && (iframeUrl.search || iframeUrl.hash)) {
            let queryParams = iframeUrl.search.substring(1).replace(/\/$/, '');
            let hashParams  = iframeUrl.hash.substring(1).replace(/[\/$]/, '');
            let hash = parseQueryString(hashParams);
            let qs = parseQueryString(queryParams);

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
  }
}
