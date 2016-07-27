[![Build Status](https://travis-ci.org/masalygin/component.svg?branch=master)](https://travis-ci.org/masalygin/component)
[![Coverage Status](https://coveralls.io/repos/github/masalygin/component/badge.svg?branch=master)](https://coveralls.io/github/masalygin/component?branch=master)


```js
class Widget extends Component {

  counterClickOnItem = 0;
  counterClickOnFirst = 0;

  ui = {
    first: '.first'
  };
  
  events = {
    'click ul li': 'clickOnItem',
    'click @ui.first': 'clickOnFirst'
  };

  template(params) {
    return `
      <ul>
        <li class="first"></li>
        <li class="second"></li>
      </ul>
    `;
  }

  clickOnItem() {
    this.counterClickOnItem++;
  }

  clickOnFirst() {
    this.$ui.first.addClass('marked');
    this.counterClickOnFirst++;
  }

}
```
