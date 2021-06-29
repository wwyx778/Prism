import axios from 'axios';
import loadError from './error';
import $ from '../helper/query';

class Request {
  static fetch(config) {
    $('html').addClass('loading');
    return new Promise(resolve => {
      axios(config)
        .then(({ data }) => {
          $('html').removeClass('loading');
          if (data.errors) {
            throw new Error(data.errors.map(e => `[${e.type}]${e.message}`).join('\n'));
          }
          resolve(data);
        })
        .catch(err => {
          $('html').removeClass('loading');
          loadError(err);
        });
    });
  }
}

export default Request;
