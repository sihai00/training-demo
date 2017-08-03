(function(w){
  var form = document.querySelector('#form')
  var table = document.querySelector('#table')
  var tbody = table.querySelector('tbody')
  // 模板
  function tem(params){
    return (
      `<tr>
        <td data-key="title" data-id="${params.id}" contenteditable="true">${params.title}</td>
        <td data-key="date" data-id="${params.id}" contenteditable="true">${params.date}</td>
        <td data-key="number" data-id="${params.id}" contenteditable="true">${params.number}</td>
        <td data-key="content" data-id="${params.id}" contenteditable="true">${params.content}</td>
        <td><a href="javascript:;" data-id="${params.id}" class="j-del">删除</a></td>
      </tr>`
    )
  }
  var dbName = 'sihai'
  var version = 1
  var db
  var OpenDB = window.indexedDB.open(dbName, version)

  OpenDB.onerror = function(event) {
    console.log('数据库打开失败')
  }

  OpenDB.onsuccess = function(event){
    db = OpenDB.result
    methodDB.show()
  }

  // 数据库首次创建版本，或者window.indexedDB.open传递的新版本（版本数值要比现在的高）
  OpenDB.onupgradeneeded = function(event){
    var db = event.target.result

    db.onerror = function(event) {
      console.log('数据库打开失败')
    }

    // 创建存储对象，即表
    // objectStore: 存储对象操作数据库的方法有：add、delete、clear、put等等
    var objectStore = db.createObjectStore(dbName, { 
      keyPath: 'id',
      autoIncrement: true
    })

    // 创建字段
    objectStore.createIndex('id', 'id', {
        unique: true    
    })
    objectStore.createIndex('title', 'title')
    objectStore.createIndex('date', 'date')
    objectStore.createIndex('number', 'number')
    objectStore.createIndex('content', 'content')
  }

  var methodDB = {
    add: function(newItem) {
      // transaction：操作数据库都需要事务，然后用存储对象操作数据库
      var objectStore = db.transaction([dbName], "readwrite").objectStore(dbName)

      objectStore.add(newItem).onsuccess = function(event) {
        methodDB.show()
      }
    },
    edit: function(id, data){
      var objectStore = db.transaction([dbName], "readwrite").objectStore(dbName)
      var objectStoreRequest = objectStore.get(id)

      objectStoreRequest.onsuccess = function(event) {
        // 当前数据
        var myRecord = objectStoreRequest.result

        // 遍历替换
        for (var key in data) {
            if (typeof myRecord[key] != 'undefined') {
                myRecord[key] = data[key]
            }
        }
        // 更新             
        objectStore.put(myRecord)
      }
    },
    del: function (id) {
      var objectStore = db.transaction([dbName], "readwrite").objectStore(dbName)            
      // 删除
      var objectStoreRequest = objectStore.delete(id)

      objectStoreRequest.onsuccess = function() {
          methodDB.show()
      }
    },
    show: function () {
      var html = ''
      // 打开对象存储，获得游标列表
      var objectStore = db.transaction(dbName).objectStore(dbName)
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result
        // 如果游标没有遍历完，继续下面的逻辑
        if (cursor) {
            html += tem(cursor.value)         
            // 继续下一个游标项
            cursor.continue()
        // 如果全部遍历完毕
        } else {
          tbody.innerHTML = html
          
          if (html == '') {
            console.log('暂无数据')    
          }
        }
      }
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()    
    
    var formData = {}

    Array.from(this.querySelectorAll('input,textarea')).forEach(function (ele) {
      if (ele.name) {
        formData[ele.name] = ele.value    
      }
    })

    // 添加新的数据
    methodDB.add(formData)
    
    this.reset()
  })

  tbody.addEventListener('click', function(event){
    event.preventDefault()

    var btn = event.target
    var id = btn.dataset.id

    if (btn.classList.contains('j-del') && id) {
      methodDB.del(+id)
    }
  })

  tbody.addEventListener('focusout', function (event) {
    var ele = event.target;
    var id = +ele.dataset.id

    // 这是要替换的数据
    var data = {
      id: id  
    }
    // 获得现在的数据
    Array.from(ele.parentNode.querySelectorAll('td[data-key]')).forEach(function(td){
      var key = td.dataset.key
      var value = td.textContent
      data[key] = value
    })
    
    // 更新本地数据库
    methodDB.edit(id, data)
  });
})(window)