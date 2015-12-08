/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   康明飞
 * Date:     2015-12-3
 * Description: 倒计时
 */
;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){		
			define('cx-cutdown', ['./style.css', '$'], function(require,exports,module) {	
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				var $=require("$");
				return factory($);
			});
		}else{
			define(['text!./style.css', '$'], function($){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				return factory($);
			});
		}
	}
	else {
		factory($);
	}
})(function($){
	function Cutdown(options) {	
		// 默认配置
		var defaultOptions = {
		    //当前系统时间(单位毫秒数)
		    serverTime: null,
		    //倒计时开始时间(单位毫秒数)
		    startTime: null,
		    //倒计时结束时间(单位毫秒数)
		    stopTime: null,
		    //未开始回调函数
		    notStartCallBack: function(){
		    },
		    //开始时回调函数
		    startCallBack: function(timeStampObj){
		    },
		    //结束时回调函数
		    stopCallBack: function(){
		    }
		};
	    // 构造配置
	    config = $.extend({}, defaultOptions, options||{});
	    this.cfg = config;
	    this.init();
	}
	Cutdown.prototype = {
	    init: function() {
	    	var self = this,
	            cfg = self.cfg,
	        	serverTime = cfg.serverTime,
	        	startTime = cfg.startTime,
	        	stopTime = cfg.stopTime;
	        if(serverTime&&startTime&&stopTime){
			    var startTimeStamp = startTime - serverTime;
			    var stopTimeStamp = stopTime - serverTime;
			    var timeCutDown = function() {
		    		var timeStampObj = self.formatTimeStamp(stopTimeStamp);
		    		if(stopTimeStamp>0){
			        	if(startTimeStamp<0){
			        		cfg.startCallBack(timeStampObj);
			        	}else{
			        		cfg.notStartCallBack();
			        	}
			        }else{
			        	cfg.stopCallBack();
			        	clearInterval(timeInterval);
			        }
		        	startTimeStamp -= 1000;
		        	stopTimeStamp -= 1000;
		    	};
			    if(stopTimeStamp>0){
			    	timeCutDown();
			    	var timeInterval = setInterval(function(){
			    		timeCutDown();
			    	},1000);
			    }else{
		        	cfg.stopCallBack();
			    }
	        }
	    },
	    formatTimeStamp: function(timeStamp) {
	        var d, h, m, s;
	        timeStamp = timeStamp / 1000;	 
	        d = parseInt(timeStamp / 3600 / 24, 10); // 天数
	        h = parseInt(timeStamp / 3600 % 24, 10); // 小时
	        m = parseInt(timeStamp % 3600 / 60, 10); // 分钟
	        s = parseInt(timeStamp % 3600 % 60, 10); // 秒	 
	 		return {
	 			day: d,
	 			hour: h,
	 			minute: m,
	 			second: s
	 		};
	    }
	};
	
	return Cutdown;
});