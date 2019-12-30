### call & apply & bind

> call & apply & bind本质都是改变`this`指向，不同点是apply & call是直接调用函数，而bind是返回一个新函数。call跟apply只是传入参数形式不同。

- #### call & apply
> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。apply类似，接收参数为数组

  1、 改变this指向
  2、 执行函数

- #### bind
> bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

  1、返回一个函数    
  2、可以传入参数    
  3、一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。    

前两个特点很好实现：
![lMhcz8.png](https://s2.ax1x.com/2019/12/30/lMhcz8.png)

难点在第三点，bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：

![lM2LEq.png](https://s2.ax1x.com/2019/12/30/lM2LEq.png)


