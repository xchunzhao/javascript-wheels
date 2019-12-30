
Function.prototype.bind2 = function(context) {
  var self = this;
  var args = [...arguments].slice(1);
  return function() {
    var bindArgs = [...arguments];
    return self.apply(context, args.concat(bindArgs));
  }
}

Function.prototype.bind3 = function(context){
  var self = this;
  var args = [...arguments].slice(1);
  //返回函数
  var fBound = function(){
    var bindArgs = [...arguments];
    //如果是作为构造函数保留this 否在将绑定的context作为上下文
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }
  //修改返回函数的prototype为绑定函数的prototype,实例中就可以继承绑定函数原型中的属性
  fBound.prototype = this.prototype;
  return fBound;
}