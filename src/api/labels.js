import axios from 'axios';
import loadError from './error';
import $ from '../helper/query';

const { user, repository } = window.config;

class Labels {
  constructor() {
    this.config = {
      url: `https://api.github.com/repos/${user}/${repository}/labels`,
    };
  }

  get() {
    $('html').addClass('loading');
    return new Promise(resolve => {
      axios(this.config)
        .then(({ data }) => {
          $('html').removeClass('loading');
          if (!data) {
            throw new Error(data.errors.map(e => `[${e.type}]${e.message}`).join('\n'));
          }
          resolve(data);
        })
        .catch(e => {
          $('html').removeClass('loading');
          loadError(e);
        });
    });
  }
}

export default Labels;
