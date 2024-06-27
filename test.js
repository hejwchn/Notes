

var o = (function(){
  let obj = {
    a: 1,
    b:2
  }
  // 解决越权方法一：断开obj的原型链
  // Object.setPrototypeOf(obj,null)
  return {
    get: function(key){
      // 解决越权方法二：判断传入参数是否为对象自身上的属性
      // if (!obj.hasOwnProperty(key)) return undefined
      return obj[key]
    }
  }
})()

//在不改变上面代码的情况下，越权修改obj中的值
//思路：在原型链上定义一个不存在的属性，通过该属性返回this，即obj对象本身，
Object.defineProperty(Object.prototype, 'c', {
  get: function(){
    return this
  }
})
console.log(o.get('c'));
o.get('c').a = 111
o.get('c').b = 222
console.log(o.get('a'));
console.log(o.get('b'));