### ES5继承实现

- #### 原型链继承
![ltFoT0.png](https://s2.ax1x.com/2020/01/02/ltFoT0.png)

缺点：
- 引用类型的属性会被所有实例共享
- 子类实例无法向父类传参

- #### 借用构造函数(经典继承)

![ltEAeA.png](https://s2.ax1x.com/2020/01/02/ltEAeA.png)

优点：    
- 避免了引用类型的属性被所有实例共享
- 子类实例可以向父类传参

缺点：    
方法都在构造函数中定义，每次创建实例都会创建一遍方法。


- #### 组合继承
> 原型链继承和经典继承双剑合璧。
