# datepicker-plugin
资源下载(图片、文件等)，图片(input)->base64(预览)->bolb(二进制)->download(下载)运用
[效果地址](https://sihai00.github.io/training-demo/download/)

## 功能列表与技术点
1.图片上传与下载（可选择是否加水印）
2.文本下载，可自命名（.txt、.html都支持）
3.表格下载，导出可用Excel打开

1.实现预览效果有两种生成base64的方法为FileReader和canvas
- FileReader可接收file对象，调用readAsDataURL即可生成base64
- canvas需接受图片的dom，调用toDataURL('image/png')生成base64
2.下载是运用h5新属性download实现，不考虑兼容性`<a href="address" download="name.txt" ／>`

## 图片上传与下载
为了使两者都结合起来实现Demo，添加了水印功能。

### 上传
那么首先获取input的file对象，监听input的change函数即可
```javascript
file.addEventListener('change', function(){
  var name = this.files[0].name

  fileToBase64(this.files[0], function(base64){
    // 获取base64格式图片后处理图片预览效果
    ...

  })
})
```

那么就可以根据file对象，使用FileReader把它转为base64格式。fn为获取base64格式的图片后的回调函数
```javascript
function fileToBase64(fileObj, fn){
  var render = new FileReader()

  render.readAsDataURL(fileObj)
  render.onload = function(e){
    // 此时：e.target.result为图片的base64，可直接赋予img标签实现预览效果
    fn(e.target.result)
  }
}
```

有了base64图片后就能实现预览效果，并且设置下载路径。为a标签添加download(需指定后缀名)和href地址即可
```javascript
fileToBase64(this.files[0], function(base64){
  // 预览图片
  var img = document.createElement('img')
  img.src = base64
  fileInputWrap.appendChild(img)
  ...

  // 设置下载路径
  fileDownload.setAttribute('href', base64)
})
```

### 水印
```javascript
function canvasToBase64(img, fn){
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  var size = 150;
  canvas.width = size
  canvas.height = size
  
  // 渲染图片
  context.drawImage(img, 0, 0, 150, 150)
  // 渲染自定义水印
  context.font='30px Arial';
  context.fillStyle = 'yellow';
  context.fillText("sihai", 80, 140)

  // 此时：canvas.toDataURL('image/png')就把canvas转为base64
  fn(canvas.toDataURL('image/png'))
}
```
## 文本下载
原理跟图片是一样的，唯一区别是下载地址使用blob的createObjectURL生成
```javascript
txtDownload.addEventListener('click', function(){
  var value = textarea.value
  // 文件名，可以在textarea内写html标签并且文件名保存为.html后缀下载哦
  var name = txtWrapInput.value
  var a = document.createElement('a')
  a.download = name || 'text.txt'

  // 生成下载地址
  var blob = new Blob([value])
  a.href = w.URL.createObjectURL(blob)

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
})
```

## 表格下载
csv逗号分隔值文件格式，用逗号表示一个单元格，换行符表示一行，可用excel打开，但有两个问题。
1.处理换行：encodeURIComponent
2.添加`\ufeff`BOM头
那么剩下的主要问题就是把表格转化为标准格式，这里就不贴代码了，可自行查看
```javascript
csvDownload.addEventListener('click', function(){
  var value = ''
  // 把表格的数据转化为标准格式
  ...

  var a = document.createElement('a')
  a.download = 'text.csv'
  a.style.display = 'none'

  a.href = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(value);
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
})
```

参考文章：\
[JS弹出下载对话框以及实现常见文件类型的下载](http://www.cnblogs.com/liuxianan/p/js-download.html)\
[小tip:JS前端创建html或json文件并浏览器导出下载](http://www.zhangxinxu.com/wordpress/2017/07/js-text-string-download-as-html-json-file/)\
[小tips:使用canvas在前端实现图片水印合成](http://www.zhangxinxu.com/wordpress/2017/05/canvas-picture-watermark-synthesis/)

