import Component from '../src';
import {expect} from 'chai';


describe('Component', () => {

  let ui = {
    first: '.first',
    second: '.second',
    ul: 'ul',
    li: 'li'
  };


  let events = {
    'click ui li': 'clickOnItem',
    'click @ui.first': 'clickOnFirst'
  };


  class Widget extends Component {

    ui = ui;
    events = events;

    userName = 'John';

    template(params) {
      return `
        <ul>
          <li class="first">${params.userName}</li>
          <li class="second"></li>
        </ul>
      `;
    };

    clickOnItem() {

    }

    clickOnFirst() {

    }

  }


  let widget = new Widget();
  widget.render();


  it('#template()', () => {
    expect(widget.template(widget)).to.be.equal(`
        <ul>
          <li class="first">John</li>
          <li class="second"></li>
        </ul>
      `);
  });



  it('#el', () => {
    expect(widget.el).to.be.equal('body');
  });


  it('#$el', () => {
    expect(widget.$el.length).to.be.equal(1);
    expect(widget.$el.get(0)).to.be.equal(document.body);
  });


  it('#ui', () => {
    expect(widget.ui).to.be.deep.equal(ui);
  });


  it('#$ui', () => {
    expect(widget.$ui.first.length).to.be.equal(1);
    expect(widget.$ui.first.get(0).tagName).to.be.equal('LI');
  });






});
