---
layout: post
title: Virtual list in vanilla JavaScript
keywords: html,javascript,performance,dom,list,rows,mobile,browser
excerpt: Let's say you need to show a scrolling list with millions of rows, or even a reasonably big list with visually complex rows, each one composed by several DOM elements or CSS3 effects.  If you try to render this the naive way, for example by appending rows into a DOM container with the CSS overflow property set to scroll (or auto), you will most likely run into performance issues.
comments: true
---

Let's say you need to show a scrolling list with millions of rows, or even
a reasonably big list with visually complex rows, each one composed by several
DOM elements or CSS3 effects.

If you try to render this the naive way,
for example by appending rows into a DOM container with the CSS  `overflow` property set
to `scroll` (or `auto`), you will most likely run into performance issues. This is because all the items in the list are cached, thus your memory
consumption will certainly go up, and since all the DOM nodes composing the rows of
the list are appended in the document, the browser is trying to properly render them all making your CPU pretty busy as you scroll. If these rows change any style say, on hover, you will trigger a [reflow](http://www-archive.mozilla.org/newlayout/doc/reflow.html) and the experience will be even more sluggish.

Many websites and apps have run into this issue before and solved it using _virtual renderers_, which trick the viewer into thinking that she is looking at a massive list, when in reality only the items that are currently in the viewport are being loaded and rendered. A popular application that does that is the [ACE editor](http://ace.ajax.org/), which can load a massively big source code file while keeping scrolling snappy using this technique.

Anyway, I needed a virtually rendered list and I couldn't find readily available components in simple JavaScript that I could use (and that I liked), so I created my own: [virtual-list](https://github.com/sergi/virtual-list). Virtual list is a short and simple piece of code that doesn't depend on anything else, so you can drop it into any website and use it right away.

For example, here you have a 1 million row list:

<div id="placeholder" style="text-align: center;"></div>
<script>

function VirtualList(config) {
  var width = (config && config.w + 'px') || '100%';
  var height = this.height = (config && config.h + 'px') || '100%';
  var itemHeight = this.itemHeight = config.itemHeight;

  this.items = config.items;
  this.generatorFn = config.generatorFn;
  console.log(config.totalRows)
  this.totalRows = config.totalRows || (config.items && config.items.length);

  var totalHeight = itemHeight * this.totalRows;
  this.scroller = VirtualList.createScroller(totalHeight);
  this.container = VirtualList.createContainer(width, height);

  var screenItemsLen = Math.ceil(config.h / itemHeight);
  // Cache 4 times the number of items that fit in the container viewport
  var cachedItemsLen = screenItemsLen * 3;
  this._renderChunk(this.container, 0, cachedItemsLen / 2);

  var self = this;
  var lastRepaintY;
  var maxBuffer = screenItemsLen * itemHeight;

  function onScroll(e) {
    var scrollTop = e.target.scrollTop;
    var first = parseInt(scrollTop / itemHeight) - screenItemsLen;
    first = first < 0 ? 0 : first;
    if (!lastRepaintY || Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
      self._renderChunk(self.container, first, cachedItemsLen);
      lastRepaintY = scrollTop;
    }

    e.preventDefault && e.preventDefault();
  }

  this.container.addEventListener('scroll', onScroll);
}

VirtualList.prototype._renderChunk = function(node, fromPos, howMany) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(this.scroller);

  var finalItem = fromPos + howMany;
  if (finalItem > this.totalRows)
    finalItem = this.totalRows;

  for (var i = fromPos; i < finalItem; i++) {
    var item;
    if (this.generatorFn)
      item = this.generatorFn(i);
    else {
      if (typeof this.items[i] === 'string') {
        var itemText = document.createTextNode(this.items[i]);
        item = document.createElement('div');
        item.style.height = this.height;
        item.appendChild(itemText);
      } else {
        item = this.items[i];
      }
    }

    item.classList.add('vrow');
    item.style.position = 'absolute';
    item.style.top = (i * this.itemHeight) + 'px';
    fragment.appendChild(item);
  }

  node.innerHTML = '';
  node.appendChild(fragment);
};

VirtualList.createContainer = function(w, h) {
  var c = document.createElement('div');
  c.style.width = w;
  c.style.height = h;
  c.style.overflow = 'auto';
  c.style.position = 'relative';
  c.style.padding = 0;
  c.style.border = '1px solid black';
  return c;
};

VirtualList.createScroller = function(h) {
  var scroller = document.createElement('div');
  scroller.style.opacity = 0;
  scroller.style.position = 'absolute';
  scroller.style.top = 0;
  scroller.style.left = 0;
  scroller.style.width = '1px';
  scroller.style.height = h + 'px';
  return scroller;
};

var list = new VirtualList({
w: 300,
h: 300,
itemHeight: 31,
totalRows: 1000000,
generatorFn: function(row) {
  var el = document.createElement("div");
  el.innerHTML = "I am row number " + row;
  el.style.backgroundColor = "red";
  el.style.background = "linear-gradient(to bottom, #fefefd 0%,#dce3c4 42%,#aebf76 100%)";
  el.style.textAlign = "center";
  el.style.width = "300px";
  return el;
}
});

list.container.style.marginLeft = "auto";
list.container.style.marginRight = "auto";
document.getElementById("placeholder")
.appendChild(list.container);
</script>

Each of these rows is generated on demand, not wasting any memory, and the list
never has to manage more than ~30 rows at a time, no matter how long the list
is in reality.

Please read more about how to use it in the project's [README](https://github.com/sergi/virtual-list#virtual-dom-list)
and report any bugs or improvements you may find if you happen to start using it in your projects.
