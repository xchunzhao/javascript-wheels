function Parent (name) {
  this.name = name;
}
function Child (name) {
  Parent.call(this, name);
}
var child1 = new Child('aaaa');
console.log(child1.names); // aaaa
var child2 = new Child('bbbb');
console.log(child2.names); // bbbb