function instanceof2(L, R) {
  const proto = R.prototype;
  while(L.__proto__) {
    if(L.__proto__ === proto) return true;
    L = L.__proto__;
  }
  return false;
}