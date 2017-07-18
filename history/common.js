(function(w){
  // 获取ajax数据
  function myajax(method, url, query, fn){
    var res = [];
    if (url && query) {
      for(var i in query){
        res.push(i + '=' + query[i])
      }
    }
    var xhr = new XMLHttpRequest();
    var url = url + '?' +res.join('&');
    xhr.open(method, url)
    xhr.onload = function(){
      if (xhr.status >= 200 && xhr.status < 400) {
        fn(JSON.parse(xhr.responseText));
      }
    }
    xhr.send()
  }
  // 触发绑定在元素上的事件
  function trigger(event, ele){
    ele.dispatchEvent(new Event(event, {"bubbles":true, "cancelable":false}));
  }

  w.myajax = myajax
  w.trigger = trigger
})(window)