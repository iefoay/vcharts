# VCharts

使用简单的javascript代码，将数据图形化的图表。

## 创建图表

目前已经完成了常用的饼图（PieChart）、序列图（SerialChart）类型的图表。
### 饼图
描述单项占全部百分比
### 序列图
一个或多个序列项的数据，如曲线图、柱状图及其混合

## 创建一个饼图

````
var mywchart = new vcharts.Pie("chartdiv");
````
`vcharts.Pie`表示这是一个饼图
`"chartdiv"`是此图表在HTML中的容器

## 数据

````
chart.setData(chartData);
````

## 尺寸

````
chart.setSize(500, 300);
````


## 样式

````
chart.setConfig(chartConfig);
````


