document.addEventListener('DOMContentLoaded',function(){
	(function(w){
		// eventType: 触发类型 (click || mouseover)
		// index: 从第几个开始 (number)
		// autoPlay: 自动播放 (大于0为自动播放间隔，等于小于0不播放)
		var Tab = function(id, config){
			var _this = this,
				loop = 0,
				timer = null,
					nav = document.querySelector(id + ' .nav'),
					main = document.querySelector(id + '-content');

			// 配置参数
			_this.config = {
				eventType: config.eventType === 'mouseover' ? 'mouseover' : 'click' || 'click',
				index: config.index - 1 || 1,
				autoPlay: config.autoPlay || 0
			}
			// 自动播放
			function autoPlay(){
				var time = _this.config.autoPlay,
					len = nav.children.length,
					eventType = _this.config.eventType;
				
				// 获取用户传递的初始位置
				loop = _this.config.index;

				// 定时器自动播放
				timer = w.setInterval(function(){
					loop += 1;
					if (loop >= len) {
						loop = 0;
					}
					trigger(returnArrItem(nav, loop), eventType)
				}, time)
			}

			if (config) {
				// 根据参数index初始化显示位置
				_this.getChange(returnArrItem(nav, _this.config.index), returnArrItem(main, _this.config.index));

				// 绑定事件
				nav.addEventListener(_this.config.eventType, function(e){
					var li = e.target.parentNode,
						index = returnArrIndex(nav, li),
						item = returnArrItem(main, index);

					if (li.nodeName.toLowerCase() === 'li') {
						// 设置自动播放时，同步循环下标和点击下标
						loop = index;
						// 切换选项卡
						_this.getChange(li, item);
					}
				})

				// 自动播放
				autoPlay();

				// 鼠标移入时清除定时器
				if (timer) {
					main.addEventListener('mouseover', function(){
						w.clearInterval(timer);
					})
					main.addEventListener('mouseout', function(){
						console.log('mouseout');
						autoPlay();
					})
				}
			}

			return _this
		};

		// 定义公共方法
		Tab.prototype = {
			constructor : Tab,
			getConfig: function(){
				return this.config;
			},
			getChange: function(li, item){
				if (!li && !item) {
					console.log('缺少参数');
					return
				};
				// 改变导航栏样式
				siblings(li, function(v){
					v.classList.remove('active');
				})
				li.classList.add('active');

				// 改变内容样式
				siblings(item, function(v){
					v.classList.remove('show');
				})
				item.classList.add('show');
			}
		};
		w.Tab = Tab;
	})(window)
})