import Request from './request';

const { user, repository } = window.config;
class Labels {
  constructor() {
    this.config = {
      url: `https://api.github.com/repos/${user}/${repository}/labels`,
    };
  }

  get() {
    return Request.fetch(this.config);
  }
}

export default Labels;
