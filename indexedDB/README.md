# indexedDB
参考练习 --- 张鑫旭indexedDB前端本地存储数据库实例
[效果地址](https://sihai00.github.io/training-demo/indexedDB/)

## 核心操作
```javascript
<!-- 建立数据库 dbName：数据库名、version：版本号 -->
window.indexedDB.open(dbName, version)

<!-- 数据库首次创建版本，或者window.indexedDB.open传递的新版本（版本数值要比现在的高），创建表和字段 -->
OpenDB.onupgradeneeded = function(){
  <!-- 创建存储对象，即可以理解为表 -->
  var objectStore = db.createObjectStore(dbName, { 
    keyPath: 'id',
    autoIncrement: true
  })

  ...

  <!-- 创建表中的字段 -->
  objectStore.createIndex('id', 'id', {
    unique: true    
  })
  objectStore.createIndex('title', 'title')
  objectStore.createIndex('date', 'date')
  objectStore.createIndex('number', 'number')
  objectStore.createIndex('content', 'content')
}

<!-- 创建数据库成功后调用 -->
OpenDB.onsuccess = function(){
  <!-- transaction：事务、objectStore：存储对象，对数据库增删改查都需调用存储对象 -->
  var objectStore = db.transaction(dbName).objectStore(dbName)
  <!-- 使用游标，获取所有数据 -->
  objectStore.openCursor().onsuccess = function(event){
    var cursor = event.target.result

    ...

  }
}

<!-- 存储对象的方法 -->
var objectStore = db.transaction(dbName).objectStore(dbName)

<!-- 添加数据 -->
objectStore.add().onsuccess = function(){...}
<!-- 获取id数据 -->
objectStore.get(id).onsuccess = function(){...}
<!-- 删除id数据 -->
objectStore.delete(id).onsuccess = function(){...}
<!-- 获取所有数据 -->
objectStore.openCursor().onsuccess = function(){...}
<!-- 更新数据 -->
objectStore.put(data)

```

参考文章：\
[HTML5 indexedDB前端本地存储数据库实例教程](http://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/)