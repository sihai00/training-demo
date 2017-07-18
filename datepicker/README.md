# datepicker-plugin
简单纯js封装的datepicker插件
[效果地址](https://sihai00.github.io/datepicker-plugin/)

## 插件调用
首先引入datepicker.js，然后命名class名为datepicker-wrap的标签
```html
<div class="datepicker-wrap"></div>
<script src="./datepicker.js"></script>
```
需传递两个参数：
* year: 年份（例如：2017）
* month: 月份（例如：3）

```js
var datapicker = new datapicker(2017, 4);
```

该插件有两个函数：
- getMonthData函数：获取当月数据
- buildUi函数：渲染数据

## 必备知识
```js
var today = new Date()
<!-- 获取当前年份 -->
today.getFullYear()

<!-- 获取当前月分 -->
today.getMonth() + 1

<!-- 获取当天日期 -->
today.getDate()

<!-- 获取当天星期几 -->
today.getDay()

<!-- 获取当前月天数 -->
new Date(year, month, 0)
```

## getMonthData函数：获取当月数据
观察下日期表格\
关键点：怎么知道当前月的第一天该放在什么位置\
月头边界：当前月的第一天的星期数 - 1（例如：下表格1号为周二，那么在当月的上个月日期数为2-1=1）\
月尾边界：当月天数

一 | 二 | 三 | 四 | 五 | 六 | 日
---|---|---|---|---|---|---
30 | 1 | 2 | 3 | 4 | 5 | 6 
 7 | 8 | 9 | 10| 11| 12| 13
 14| 15| 16| 17| 18| 19| 20
 21| 22| 23| 24| 25| 26| 27
 28| 29| 30| 31| 1 | 2 | 3

获取当前月的第一天之前有多少个上个月的日期数，周几区间[1，7]
```js
<!-- 当月第一天是星期几 -->
var firstWeekDay = new Date(year, month - 1, 1).getDay();
firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay;

<!-- 当前月的第一天之前有多少个上月日期 -->
var preMonthDayCount = firstWeekDay - 1;
```

获取当前周数，周数区间[4,6]
```js
if (7 - firstWeekDay < lastDate % 7) {
  weekNumber = 6;
}else if(7 - firstWeekDay >= lastDate % 7){
  weekNumber = 5;
}else if(7 - firstWeekDay === lastDate % 7 && month === 2){
  weekNumber = 4;
}
```

所以循环限制边界即可
```js
for (var i = 0; i < 7*weekNumber; i++) {
  <!-- 日期从1号开始，需加1 -->
  var date = i + 1 - preMonthDayCount;
  var showDate = date;
  var thisMonth = month;
  <!-- 上一月 -->
  if (date <= 0) {
    thisMonth = month - 1;
    showDate = preMonthLastDate + date;
  }else if(date > lastDate){
  <!-- 下一月 -->
    thisMonth = month + 1;
    showDate = date - lastDate;
  }
  // 月份边界
  if (thisMonth === 0) thisMonth = 12;
  if (thisMonth === 13) thisMonth = 1;
}
```
函数的返回值

```js
{
  month: 当前月份,
  date: 计算日期,
  showDate: 显示日期,
  curMonth: 是否为当前月的日期（方便以样式区分当前月的日期和相邻月的日期）
}
```

## buildUi函数：渲染数据
只是把数组循环遍历拼接再渲染在html，可自行查看～
