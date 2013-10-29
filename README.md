# VCharts

vcharts是一套JavaScript实现的图表库。仅使用很少的代码，就能使数据图形化。
目前为测试阶段，已经完成了常用的饼图（PieChart）、序列图（SerialChart）类型的图表。

## 引入vcharts.js
只需要vcharts.js

	<script type="text/javascript" src="/your/path/vcharts.js"></script>

## 创建图表

vcharts按轴的不同分为以下几种图表

**序列图**
以一个序列为统一轴来展示数据，我们常见的柱状图、曲线图、面积图及其混合图都属于这种类型的图表。创建方法如下：

`new vcharts.SerialChart("mychartdiv");`

`vcharts.SerialChart`表示这是一个序列图表，`"mychartdiv"`为此图表在HTML中的div容器，。

*提示：*不必在window.load之后操作，vcharts内部已经帮你做了兼容。

**饼图**
描述单项占全部百分比，创建方法如下：

`new vcharts.PieChart("chartdiv");`

这里我们创建一个序列图为例

	var mychart = new vcharts.SerialChart("mychartdiv");
	
这时在html页面里应该能看到vcharts提示**no data**字样，说明已经成功创建了一个图表，如果没有看到提示，请检查是否引入了vcharts.js库文件，及路径是否正确。

接下来给它添加数据了。

## 数据
vcharts的数据为json数组表示，这里是一个简单的例子。

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

这时刷新页面，数据图表就显示出来了。


## 配置

vcharts中的数据和其配置是一对好兄弟。配置用于设置如何显示数据，表示序列的key。

内部有一个默认的配置表。只设置其特殊部分即可，它们会被合并到已有的配置上。

	mychart.setConfig({
		title : {
			name : "标题"
		},
		serialKey : 'label',
		graphs : [{
			name : "销售量",
			valueKey : "value"
		}]
	});
	
完整配置表及详细说明请查看

## 尺寸
vcharts接受三种方式设置尺寸，优先级最高的是通过setSize(width, height)设置：

	mychart.setSize(500, 300);

如未用此方法设置，读取css样式上的尺寸。若css样式也未设置，则使用默认大小。
