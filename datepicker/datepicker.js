(function(w){
  var datapicker = function(year, month){
    this.year = year;
    this.month = month;
    this.res = this.getMonthData();
    this.wrap = document.querySelector('.datepicker-wrap');
    _this = this;

    document.addEventListener('DOMContentLoaded', function(){
      _this.buildUi();
      // 为上下按钮绑定事件
      _this.wrap.addEventListener('click', function(e){
        // 年份和月份的边界设置
        if (e.target.className === 'header-btn-right') {
          _this.month += 1;
          if (_this.month > 12) {
            _this.month = 1;
            _this.year += 1;
          };
        }else if(e.target.className === 'header-btn-left'){
          _this.month -= 1;
          if (_this.month === 0) {
            _this.month = 12;
             _this.year -= 1;
          };
        }
        // 重新获取数据渲染
        _this.res = _this.getMonthData(_this.year, _this.month);
        _this.buildUi();
      })
    })
  }

  datapicker.prototype.getMonthData = function(){
    var ret = [];
    var today = new Date();
    var year = this.year || today.getFullYear();
    var month = this.month || today.getMonth() + 1;
    
    // 当月第一天是星期几
    var firstWeekDay = new Date(year, month - 1, 1).getDay();
    firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay;

    // 前一个月的最后一天
    var preMonthLastDate = new Date(year, month - 1, 0).getDate();

    // 当月第一周有多少个上个月的日期
    var preMonthDayCount = firstWeekDay - 1;

    // 当月的最后一天
    var lastDate = new Date(year, month, 0).getDate();

    // 当前月的周数
    var weekNumber = 0;
    if (7 - firstWeekDay < lastDate % 7) {
      weekNumber = 6;
    }else if(7 - firstWeekDay >= lastDate % 7){
      weekNumber = 5;
    }else if(7 - firstWeekDay === lastDate % 7 && month === 2){
      weekNumber = 4;
    }

    for (var i = 0; i < 7*weekNumber; i++) {
      var date = i + 1 - preMonthDayCount;
      var showDate = date;
      var thisMonth = month;
      // 上一月
      if (date <= 0) {
        thisMonth = month - 1;
        showDate = preMonthLastDate + date;
      }else if(date > lastDate){
        // 下一月
        thisMonth = month + 1;
        showDate = date - lastDate;
      }
      // 月份边界
      if (thisMonth === 0) thisMonth = 12;
      if (thisMonth === 13) thisMonth = 1;

      // 日期是否为当前月份，样式用
      var curMonth = date > 0 && date <= lastDate;
      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate,
        curMonth: curMonth
      })
    }

    return ret
  }

  datapicker.prototype.buildUi = function(){
    var tbody = '';
    var html = '';
    // 根据curMonth判断是否添加样式
    this.res.forEach(function(v, i){
      if (i % 7 === 0) {
        tbody += `<tr><td class="${!v.curMonth && 'cddd'}">${v.showDate}</td>`
      }else if(i % 7 === 6){
        tbody += `<td class="${!v.curMonth && 'cddd'}">${v.showDate}</td></tr>`
      }else{
        tbody += `<td class="${!v.curMonth && 'cddd'}">${v.showDate}</td>`
      }
    })

    html = `
    <div class="header">
      <a href="javascript:;" class="header-btn-left">&lt;</a>
      <a href="javascript:;" class="header-btn-right">&gt;</a>
      <span class="header-currentMonth">${this.year} - ${this.month}</span>
    </div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
            <th>日</th>
          </tr>
        </thead>
        <tbody>${tbody}</tbody>
      </table>
    </div>`

    this.wrap.innerHTML = html;
  }

  w.datapicker = datapicker
})(window)