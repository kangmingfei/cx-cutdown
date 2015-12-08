# cx-cutdown
=========

倒计时功能,仿淘宝结构(saike)

```
作者：**康明飞(kangmingfei@163.com,410394211)** 
```

Install
-------

Install with bower:

	$ bower install cx-cutdown

Usage
-------

```html
<script src="cx-vendor/dist/sea.js"></script>
<!-- <script src="../cx-vendor/1.0.0/seajs-combo.js"></script> -->
<script src="cx-vendor/dist/seajs-css.js"></script>
<div class="timeInfoNode"></div>
<script>
seajs.config({
	base: ".",
	preload: ['$','dist/style.css','dist/style2.css'],
	alias: {
	  "$": "cx-vendor/dist/jquery.js",
	  'cx-cutdown' : "dist/index.js"
	},
	map: [
	  [/^(.*\.(?:css|js))(.*)$/i, '$1']
	]
});
// seajs can load css file after loading css plugin.
seajs.use(["cx-cutdown"],function(cutdown){
	"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
	// use cutdown
	new cutdown({
		serverTime: 1447066728992,
		startTime: 1444406100000,
		stopTime: 1451577300000,
		startCallBack: function(timeStampObj){ 	
			var timeInfoNode = $(".timeInfoNode");
	    	var timtInfoText="还剩"+ timeStampObj.day + "天"
	    						+ timeStampObj.hour +"小时"
	    						+ timeStampObj.minute + "分"
	    						+ timeStampObj.second + "秒";
	    	timeInfoNode.html(timtInfoText);
	    }
	});
});

</script>
```

## 自动化脚本(开发环境) ##

- ```npm install```

- ```gulp dev```

## 自动化脚本(生产环境) ##

- ```gulp build```

- ```bower register cx-cutdown https://github.com/kangmingfei/cx-cutdown.git```

