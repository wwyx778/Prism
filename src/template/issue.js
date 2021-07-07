import timeFormat from './time';
import backIcon from '../svg/back.svg';
import $ from '../helper/query';
import creator from '../helper/creator';

const { user, repository } = window.config;

class Issue {
  constructor(selector, mirror) {
    this.mirror = mirror;
    this.container = $(selector);
    this.issue = null;
  }

  render(issue) {
    this.issue = issue;

    const { title, bodyHTML, updatedAt } = issue;
    const labels = issue.labels.edges
      .map(
        label => `所属分类：
        <a
          target="_blank"
          href="https://github.com/${user}/${repository}/labels/${label.node.name}"
          style="background-color:#${label.node.color}"
        >${label.node.name}</a>
      `,
      )
      .join('');

    const frag = $(document.createDocumentFragment());
    const back = creator('div', {
      className: 'back',
      onclick: () => {
        const { issues } = this.mirror;

        if (Object.keys(issues).length) {
          window.history.back();
        } else {
          window.location.hash = '#/';
        }
      },
      innerHTML: backIcon,
    });
    const h1 = creator('h1', { innerHTML: title });
    const p = creator('p', { innerHTML: `Updated at<span>${timeFormat(updatedAt)}</span>` });
    const body = creator('div', {
      className: 'markdown-body',
      innerHTML: bodyHTML,
    });
    const tags = creator('div', {
      className: 'labels',
      innerHTML: labels,
    });

    frag.append(back).append(h1).append(p).append(body).append(tags);

    this.container.html('').append(frag.dom[0]);
  }
}

export default Issue;
