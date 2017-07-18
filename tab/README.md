# tab-demo
三种方法实现tab [效果地址](https://sihai00.github.io/training-demo/tab/)

## 纯css3实现自动播放轮播图(鼠标入暂停)
一个html标签即可
```html
<div class="tab1"></div>
```
利用纯css3的animation通过改变background-image的url值实现动态无缝切换
```css
.tab1{
  width: inherit;
  height: 300px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  animation: tab 6s infinite;
  background-image: url('img1');
}
.tab1:hover{
  animation-play-state:paused;
}
@keyframes tab{
  25% {
    background-image: url('img2');
  }
  50% {
    background-image: url('img3');  
  }
  75% {
    background-image: url('img4');
  }
}
```

## 纯css实现可点击切换选项卡，仅点击切换
- input标签必须在需切换样式的标签之前，不然匹配不到
- input隐藏，用label模拟按钮，for链接到input的id
```html
<div class="tab2-item">
  <input type="radio" id="tab1" name="tab" checked="checked">
  <label for="tab1">tab1</label>
  <div class="content">
    <img src="img" alt="图片">
  </div>
</div>
```
利用input的伪类:checked可模拟点击事件，实现样式切换
```css
input:checked ~ label{
  background-color: #9e9e9e;
  color: #fff;
}
input:checked ~ .content{
  opacity: 1;
  transition: all 2s;
}
```
可自行查看本例demo或者[ChokCoco的博客](http://www.cnblogs.com/coco1s/p/5955631.html)

## 原生纯js封装选项卡插件，可点击切换和自动播放(鼠标划入暂停自动播放)
纯js封装了个简单的选项卡插件，首先引入
```html
<!-- 工具类 -->
<script src="common.js"></script>
<!-- tab插件 -->
<script src="./tab.js"></script>
```
调用插件，参数为
- eventType: 'click' || 'mouseover' 触发选项卡的事件类型
- index: number 选项卡开始下标
- autoPlay: number 自动播放时间(毫秒)
```js
window.onload = function(){
  var tab3 = new Tab('.tab3',{
    eventType: 'click',
    index: 2,
    autoPlay: 2000
  });
}
```
代码有注释，可自行查看～
