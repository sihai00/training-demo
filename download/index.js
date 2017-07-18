(function(w){
var fileInputWrap = document.querySelector('#fileInputWrap')
var file = document.querySelector('#fileInput')
var fileAddMark = document.querySelector('#fileAddMark')
var fileDownload = document.querySelector('#fileDownload')
var txtDownload = document.querySelector('#txtDownload')
var textarea = document.querySelector('#textarea')
var txtWrapInput = document.querySelector('#txtWrapInput')
var csvDownload = document.querySelector('#csvDownload')
var table = document.querySelector('#table')

// FileReader 转 base64
function fileToBase64(fileObj, fn){
  var render = new FileReader()

  render.readAsDataURL(fileObj)
  render.onload = function(e){

    // 此时：e.target.result为图片的base64，可直接赋予img标签实现预览效果
    fn(e.target.result)
  }
}

// canvas 转 base64
function canvasToBase64(img, fn){
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  var size = 150;
  canvas.width = size
  canvas.height = size

  context.drawImage(img, 0, 0, 150, 150)
  context.font='30px Arial';
  context.fillStyle = 'yellow';
  context.fillText("sihai", 80, 140)

  // 此时：canvas.toDataURL('image/png')就把canvas转为base64
  fn(canvas.toDataURL('image/png'))
}

// 1.上传图片
file.addEventListener('change', function(){
  // 设置下载图片名
  var name = this.files[0].name
  fileDownload.setAttribute('download', name)

  fileToBase64(this.files[0], function(base64){
    // 预览图片
    var img = document.createElement('img')
    img.src = base64
    fileInputWrap.appendChild(img)
    fileInputWrap.querySelector('span').style.color = 'transparent'
    img.onload = function(){
      fileAddMark.style.display = 'inline-block'
    }
    // 设置下载路径
    fileDownload.setAttribute('href', base64)
  })
})

// 添加水印
fileAddMark.addEventListener('click', function(){
  var img = document.querySelector('#fileInputWrap img')
  // 添加水印
  canvasToBase64(img, function(imgSrc){
    img.src = imgSrc
    // 设置下载路径
    fileDownload.setAttribute('href', imgSrc)
  })
})

// 2.下载文本
txtDownload.addEventListener('click', function(){
  var value = textarea.value
  var name = txtWrapInput.value
  var a = document.createElement('a')
  a.download = name || 'text.txt'
  a.style.display = 'none'

  var blob = new Blob([value])
  a.href = w.URL.createObjectURL(blob)

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
})

// 3.下载表格
csvDownload.addEventListener('click', function(){
  var value = ''
  for(var i = 0, rowsLen = table.rows.length; i < rowsLen; i++){
    for(var j = 0, cellsLen = table.rows[i].cells.length; j < cellsLen; j++){
      if (j !== cellsLen - 1) {
        value += table.rows[i].cells[j].innerText + ','
      }else{
        value += table.rows[i].cells[j].innerText + '\n'
      }
    }
  }
  var a = document.createElement('a')
  a.download = 'text.csv'
  a.style.display = 'none'

  a.href = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(value);
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
})

})(window)