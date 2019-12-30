### instanceof
> 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```
  function instanceof2(L, R){}
```

1、判断L.__proto__ === R.prototye，等于return true
2、否则继续判断L.__proto__.__proto__ === R.prototype,直至__proto__为null