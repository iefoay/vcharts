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
var myChart = new vcharts.Pie("chartdiv");
````
`vcharts.Pie`表示这是一个饼图
`"chartdiv"`是此图表在HTML中的容器

## 数据

vcharts数据统一用json数组表示

与数据与表现解耦

````
myChart.setData([


]);
````


## 样式
样式和数据是一一对应的

````
myChart.setConfig(chartConfig);
````



## 尺寸
尺寸采用多种定义方式定义，使用setSize方法设置的优先级最高；其次，容器自身的css尺寸；最后，如没有任何设置使用默认的尺寸

````
myChart.setSize(500, 300);
````


