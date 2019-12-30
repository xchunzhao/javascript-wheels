function new1() {
  var obj = new Object();
  var Constructor = [...arguments].shift(1);
  obj.__proto__ = Constructor.prototype;
  return Constructor.apply(obj, arguments);
}

function new2() {
  var obj = new Object();
  var Constructor = [...arguments].shift(1);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}