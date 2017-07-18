// 获取兄弟节点
function siblings(ele, fn){
	Array.prototype.filter.call(ele.parentNode.children, function(v, i){
		ele !== v && fn(v)
	})
}
// 获取数组子元素
function returnArrItem(ele, index){
	return Array.prototype.slice.call(ele.children)[index]
}
// 获取元素在数组的下标
function returnArrIndex(parent, child){
	return Array.prototype.indexOf.call(parent.children, child)
}
// 触发事件
function trigger(ele, event){
	ele.children[0].dispatchEvent(new Event(event, {"bubbles":true, "cancelable":false}));
}