/**
 * vcharts公开接口
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

// Expose vcharts to the global object
vcharts.PieChart = PieContext;
vcharts.SerialChart = SerialContext;
vcharts.version = version;
//vcharts.Serial = Serial;
// window.Ease = Ease;
// window.xmlRenderer = xmlRenderer;
window.vcharts = vcharts;
