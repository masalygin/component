import Component from '../src';
import {expect} from 'chai';
import $ from 'jquery';


describe('Component', () => {

  let ui = {
    first: '.first',
    second: '.second',
    ul: 'ul',
    li: 'li'
  };

  let events = {
    'click ul li': 'clickOnItem',
    'click @ui.first': 'clickOnFirst'
  };

  let counters = {
    clickOnItem: 0,
    clickOnFirst: 0
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
      counters.clickOnItem++;
    }

    clickOnFirst() {
      counters.clickOnFirst++;
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


  it('#$()', () => {
    expect(widget.$('ul li').length).to.be.equal(2);
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


  it('#_resolveEventKey()', () => {
    expect(widget._resolveEventKey('click ui li')).to.be.deep.equal({
      eventName: 'click',
      selector: 'ui li'
    });
    expect(widget._resolveEventKey('click @ui.first')).to.be.deep.equal({
      eventName: 'click',
      selector: '.first'
    });
  });


  it('#delegateEvents()', () => {
    expect(counters).to.be.deep.equal({clickOnItem: 0, clickOnFirst: 0});
    $('.first').trigger('click');
    expect(counters).to.be.deep.equal({clickOnItem: 1, clickOnFirst: 1});
    $('ul li').trigger('click');
    expect(counters).to.be.deep.equal({clickOnItem: 3, clickOnFirst: 2});
  });


  it('#undelegate()', () => {
    counters.clickOnItem = 0;
    counters.clickOnFirst = 0;
    expect(counters).to.be.deep.equal({clickOnItem: 0, clickOnFirst: 0});
    widget.undelegate('click', '.first');
    $('.first').trigger('click');
    expect(counters).to.be.deep.equal({clickOnItem: 1, clickOnFirst: 0});
    $('ul li').trigger('click');
    expect(counters).to.be.deep.equal({clickOnItem: 3, clickOnFirst: 0});
  });


  it('#undelegateEvents()', () => {
    counters.clickOnItem = 0;
    counters.clickOnFirst = 0;
    expect(counters).to.be.deep.equal({clickOnItem: 0, clickOnFirst: 0});
    widget.undelegateEvents();
    $('ul li').trigger('click');
    expect(counters).to.be.deep.equal({clickOnItem: 0, clickOnFirst: 0});
  });


});
