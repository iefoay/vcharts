# weicharts

使用简单的javascript代码，将数据图形化的图表。

## 创建图表

目前已经完成了常用的饼图（PieChart）、序列图（SerialChart）类型的图表。
### 饼图
描述单项占全部百分比
### 序列图
比较一个序列项的数据，如曲线图、柱状图及其混合

````
var chart = new weicharts.PieChart("chartdiv");
````

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


