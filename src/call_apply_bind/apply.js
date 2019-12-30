Function.prototype.apply2 = function(context, args){
  const context = context || window;
  context.fn = this;
  let result;
  if(!args) {
    result = context.fn();
  } else {
    result = context.fn(...args);
  }
  delete context.fn;
  return result;
}