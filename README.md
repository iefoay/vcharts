vcharts是一套JavaScript实现的Web图表库，由SVG+VML的技术实现。

官方网站：[vcharts.cn](http://vcharts.cn)

Github上的[Wiki](https://github.com/iefoay/vcharts/wiki)

最新动态尽在新浪微博：[@vcharts](http://weibo.com/1452085277)

# 新手入门

## 引入vcharts.js

	<script type="text/javascript" src="/your/path/vcharts.js"></script>

## 创建图表

这里我们创建一个序列图为例

	var mychart = new vcharts.SerialChart("mychartdiv");
	
这时在html页面里应该能看到vcharts提示**no data**字样，说明已经成功创建了一个图表，如果没有看到提示，请检查是否引入了vcharts.js库文件，及路径是否正确。

接下来给它添加数据了。

## 数据

vcharts的数据为json数组表示，这里只是一个简单的例子，请按格式改为自己的实际数据。

	mychart.setData([{
			label:"1月",
			value:"23"
		},{
			label:"2月",
			value:"26"
		},{
			label:"3月",
			value:"39"
		}]);

这时刷新页面，不出差错，我们就已经完成了第一个数据图表的创建了。是不是很简单？


## 配置

每个图表内部都有一个默认的配置表。新增加的配置会被合并到已有的配置上。所以只设置需要修改的那部分，如：

**修改标题**

	mychart.setConfig({
		title : {
			name : "修改后的标题"
		}
	});
	

**修改单项图形**

	mychart.setConfig({
		graphs : [{
			name : "修改后的单项名称",
			type : "column"	//将此图形显示为柱状图
		}]
	});
	
完整配置表及详细说明请查看[完整配置](http://vcharts.cn)

## 改变尺寸

	mychart.setSize(500, 300);
