// Generated by CoffeeScript 1.9.3
var Budget, Consumer, Deck, HandSpace, LogSpace, PrivateSpace, PublicSpace, RoundDeck, SpaceBase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.Game = (function() {
  function Game() {}

  Game.objs = {};

  Game.isSetObj = false;

  Game.init = function() {
    var name, obj, ref, results;
    this.setObj();
    ref = this.objs;
    results = [];
    for (name in ref) {
      obj = ref[name];
      results.push(obj.init());
    }
    return results;
  };

  Game.setObj = function() {
    if (this.isSetObj) {
      return;
    }
    this.isSetObj = true;
    this.objs["public"] = PublicSpace;
    this.objs["private"] = PrivateSpace;
    this.objs.hand = HandSpace;
    this.objs.log = LogSpace;
    this.objs.budget = Budget;
    this.objs.round = RoundDeck;
    this.objs.deck = Deck;
    return this.objs.consumer = Consumer;
  };

  Game.gameStart = function() {
    var i, j;
    this.init();
    for (i = j = 0; j < 3; i = ++j) {
      this.pullDeck();
    }
    this.objs.deck.place(17);
    return this.pullPublic(4);
  };

  Game.pullDeck = function(amount) {
    var i, j, ref;
    if (amount == null) {
      amount = 1;
    }
    for (i = j = 0, ref = amount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this.objs.hand.push(this.objs.deck.pull());
    }
    return this.objs.hand.redraw();
  };

  Game.pullConsumer = function(amount) {
    var i, j, ref;
    if (amount == null) {
      amount = 1;
    }
    for (i = j = 0, ref = amount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this.objs.hand.push(this.objs.consumer.pull());
    }
    return this.objs.hand.redraw();
  };

  Game.pullPublic = function(amount) {
    var i, j, ref;
    if (amount == null) {
      amount = 1;
    }
    for (i = j = 0, ref = amount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this.objs["public"].push(this.objs.round.pull());
    }
    return this.objs["public"].redraw();
  };

  return Game;

})();

SpaceBase = (function() {
  function SpaceBase() {}

  SpaceBase.DIV_ID = null;

  SpaceBase.init = function() {
    var e;
    e = this.getElement();
    return e.html(this.DIV_ID);
  };

  SpaceBase.getElement = function() {
    return $('#' + this.DIV_ID);
  };

  return SpaceBase;

})();

PublicSpace = (function(superClass) {
  extend(PublicSpace, superClass);

  function PublicSpace() {
    return PublicSpace.__super__.constructor.apply(this, arguments);
  }

  PublicSpace.DIV_ID = "public";

  PublicSpace.cards = [];

  PublicSpace.init = function() {
    PublicSpace.__super__.constructor.init.call(this);
    return this.cards = [];
  };

  PublicSpace.push = function(cardNum) {
    return this.cards.push(cardNum);
  };

  PublicSpace.redraw = function() {
    var index, j, me, ref, results;
    me = this.getElement();
    me.html('');
    results = [];
    for (index = j = 0, ref = this.cards.length; 0 <= ref ? j < ref : j > ref; index = 0 <= ref ? ++j : --j) {
      results.push(me.append(this.createElement(index)));
    }
    return results;
  };

  PublicSpace.createElement = function(index) {
    var balloonStr, cardClass, cat, catBalloon, catStr, categorySpan, cost, costBalloon, costStr, desc, e, header, img, name, point, pointBalloon, pointSpan, pointStr, price, priceBalloon;
    if (this.cards[index] == null) {
      return false;
    }
    cardClass = Card.getClass(this.cards[index]);
    name = cardClass.getName();
    cat = cardClass.getCategory();
    price = cardClass.getPrice();
    cost = cardClass.getCost();
    point = cardClass.getPoint();
    desc = cardClass.getDescription();
    e = $('<div>').addClass('public');
    costStr = cardClass.isPublicOnly() ? '' : '[' + cost + ']';
    header = $('<span>').addClass('public_header').html(costStr + cardClass.getName());
    img = cardClass.getImageObj().addClass('public_image');
    catStr = cat != null ? '[' + cat + ']' : '';
    categorySpan = $('<span>').addClass('public_footer public_category').html(catStr);
    pointStr = cardClass.isPublicOnly() ? '' : '[$' + point + ']';
    pointSpan = $('<span>').addClass('public_footer public_point').html(pointStr);
    costBalloon = cardClass.isPublicOnly() ? '-' : cost;
    priceBalloon = cardClass.isPublicOnly() ? '-' : price;
    pointBalloon = cardClass.isPublicOnly() ? '-' : point;
    catBalloon = cat != null ? cat : 'なし';
    balloonStr = (desc + "\n--------------------\nカテゴリ：" + catBalloon + "\nコスト：" + costBalloon + "\n売却価格：" + pointBalloon + "\n得点：" + point).replace(/\n/g, '<br>');
    e.attr('data-tooltip', balloonStr).darkTooltip();
    e.append(header);
    e.append(img);
    e.append(categorySpan);
    e.append(pointSpan);
    return e;
  };

  return PublicSpace;

})(SpaceBase);

PrivateSpace = (function(superClass) {
  extend(PrivateSpace, superClass);

  function PrivateSpace() {
    return PrivateSpace.__super__.constructor.apply(this, arguments);
  }

  PrivateSpace.DIV_ID = "private";

  PrivateSpace.cards = [];

  PrivateSpace.init = function() {
    return PrivateSpace.__super__.constructor.init.call(this);
  };

  return PrivateSpace;

})(SpaceBase);

LogSpace = (function(superClass) {
  extend(LogSpace, superClass);

  function LogSpace() {
    return LogSpace.__super__.constructor.apply(this, arguments);
  }

  LogSpace.DIV_ID = "log";

  LogSpace.init = function() {
    return LogSpace.__super__.constructor.init.call(this);
  };

  LogSpace.clear = function() {
    return this.getElement().html('');
  };

  LogSpace.output = function(message) {};

  LogSpace.error = function(message) {};

  LogSpace.fatal = function(message) {};

  return LogSpace;

})(SpaceBase);

HandSpace = (function(superClass) {
  extend(HandSpace, superClass);

  function HandSpace() {
    return HandSpace.__super__.constructor.apply(this, arguments);
  }

  HandSpace.DIV_ID = "hand";

  HandSpace.cards = [];

  HandSpace.init = function() {
    return HandSpace.__super__.constructor.init.call(this);
  };

  HandSpace.sort = function() {
    return this.cards.sort();
  };

  HandSpace.push = function(cardNum) {
    return this.cards.push(cardNum);
  };

  HandSpace.redraw = function() {
    var index, j, me, ref, results;
    me = this.getElement();
    me.html('');
    results = [];
    for (index = j = 0, ref = this.cards.length; 0 <= ref ? j < ref : j > ref; index = 0 <= ref ? ++j : --j) {
      results.push(me.append(this.createElement(index)));
    }
    return results;
  };

  HandSpace.createElement = function(index) {
    var balloonStr, cardClass, cat, catBalloon, catStr, categorySpan, cost, desc, e, header, img, name, point, pointSpan, price;
    if (this.cards[index] == null) {
      return false;
    }
    cardClass = Card.getClass(this.cards[index]);
    name = cardClass.getName();
    cat = cardClass.getCategory();
    price = cardClass.getPrice();
    cost = cardClass.getCost();
    point = cardClass.getPoint();
    desc = cardClass.getDescription();
    e = $('<div>').addClass('hand');
    header = $('<span>').addClass('hand_header').html('[' + cost + ']' + cardClass.getName());
    img = cardClass.getImageObj().addClass('hand_image');
    catStr = cat != null ? '[' + cat + ']' : '';
    categorySpan = $('<span>').addClass('hand_footer hand_category').html(catStr);
    pointSpan = $('<span>').addClass('hand_footer hand_point').html('[$' + point + ']');
    catBalloon = cat != null ? cat : 'なし';
    balloonStr = (desc + "\n--------------------\nカテゴリ：" + catBalloon + "\nコスト：" + cost + "\n売却価格：" + price + "\n得点：" + point).replace(/\n/g, '<br>');
    e.attr('data-tooltip', balloonStr).darkTooltip();
    e.append(header);
    e.append(img);
    e.append(categorySpan);
    e.append(pointSpan);
    return e;
  };

  return HandSpace;

})(SpaceBase);

RoundDeck = (function() {
  function RoundDeck() {}

  RoundDeck.deck = [];

  RoundDeck.init = function() {
    return this.deck = [2, 3, 4, 13, 5, 6, 7, 8, 9, 10, 11, 12];
  };

  RoundDeck.pull = function() {
    if (this.deck.length === 0) {
      false;
    }
    return this.deck.shift();
  };

  return RoundDeck;

})();

Deck = (function() {
  function Deck() {}

  Deck.deck = [];

  Deck.grave = [];

  Deck.init = function() {
    var amount, cardNum, def, i, j, ref;
    this.deck = [];
    def = this.getCardDefine();
    for (cardNum in def) {
      amount = def[cardNum];
      for (i = j = 0, ref = amount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        this.deck.push(cardNum);
      }
    }
    this.shuffle();
    return this.grave = [];
  };

  Deck.pull = function() {
    if (this.deck.length === 0) {
      this.recycle();
    }
    return this.deck.pop();
  };

  Deck.place = function(cardNum) {
    return this.deck.unshift(cardNum);
  };

  Deck.trash = function(cardNum) {
    return this.grave.push(cardNum);
  };

  Deck.recycle = function() {
    var cardNum, j, len, ref;
    ref = this.grave;
    for (j = 0, len = ref.length; j < len; j++) {
      cardNum = ref[j];
      this.deck.push(cardNum);
    }
    this.grave = [];
    return this.shuffle();
  };

  Deck.shuffle = function() {
    var copy, i, n;
    copy = [];
    n = this.deck.length;
    while (n) {
      i = Math.floor(Math.random() * n--);
      copy.push(this.deck.splice(i, 1)[0]);
    }
    return this.deck = copy;
  };

  Deck.getCardDefine = function() {
    var res;
    res = {
      13: 7,
      14: 4,
      15: 2,
      16: 2,
      17: 7,
      18: 4,
      19: 3,
      20: 3,
      21: 2,
      22: 1,
      23: 3,
      24: 2,
      25: 2,
      26: 2,
      27: 1,
      28: 3,
      29: 3,
      30: 2,
      31: 1,
      32: 1,
      33: 3,
      34: 2,
      35: 1,
      36: 1
    };
    return res;
  };

  return Deck;

})();

Consumer = (function() {
  function Consumer() {}

  Consumer.init = function() {};

  Consumer.pull = function() {
    return 99;
  };

  return Consumer;

})();

Budget = (function() {
  function Budget() {}

  Budget.money = 0;

  Budget.init = function() {
    return this.money = 0;
  };

  Budget.push = function(amount) {
    if (amount < 0) {
      return false;
    }
    return this.money += amount;
  };

  Budget.pull = function(amount) {
    if (amount < 0) {
      return false;
    }
    if (this.money < amount) {
      return false;
    }
    return this.money -= amount;
  };

  Budget.getAmount = function() {
    return this.money;
  };

  return Budget;

})();
