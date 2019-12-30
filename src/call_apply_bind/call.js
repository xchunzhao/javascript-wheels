Function.prototype.call2 = function(context){
  const context = context || window;
  //this为函数本身
  context.fn = this;

  const args = [...arguments].slice(1);

  const result = context.fn(...args);
  
  delete context.fn
  return result;
}