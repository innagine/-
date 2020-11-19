// 1、引入依赖脚本
import * as echarts from '../../components/ec-canvas/echarts';

import regeneratorRuntime from '../../lib/runtime/runtime.js'
//引入 用来发送请求的方法 一定要把路径补全
import { request } from "../../request/index.js";


let chart = null;

// 校对像素
//获取像素比
const getPixelRatio = () => {
  let pixelRatio = 0
  wx.getSystemInfo({
    success: function (res) {
      pixelRatio = res.pixelRatio
    },
    fail: function () {
      pixelRatio = 0
    }
  })
  return pixelRatio
}
// console.log(pixelRatio)
var dpr = getPixelRatio()


// 2、进行初始化数据
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);

  var option = {
    color: ['#fcc33a', '#fdd75a', '#feee5a'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['满意', '良好']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        // min: -100,
        max: 25,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['马降龙碉堡群', '玫瑰小镇', '流星谷水上乐园', '深圳音乐厅', '东湖公园', '五邑大学', '江门东龙游乐世界'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '满意',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [10.6, 11.4, 11.56, 13.68, 15.03, 17.41, 19.74]
      },
      {
        name: '良好',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [0.67, 1.62, , 1.55, 1.47, 1.91, 1.72]
      },
      // {
      //   name: '差评',
      //   type: 'bar',
      //   stack: '总量',
      //   label: {
      //     normal: {
      //       show: true,
      //       position: 'left'
      //     }
      //   },
      //   data: [-20, -32, -21, -34, -90, -130, -110]
      // }
    ]
  };
  chart.setOption(option);
  return chart;
}



wx-Page({

  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    placeObj:{},
    ec: {
      onInit: initChart // 3、将数据放入到里面
    }
  },

  // onLoad: function () {
  // // 发送请求获取搜索建议 数据
  // wx.request({
  //   url: 'http://www.jiac.online/search/',
  //   success:(result)=>{
  //     console.log(result)
  //   }
  // })
    
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad() {
  //   this.getLastDay()
  // },
  // getLastDay(){
  //   var option = {
  //     color: ['#fcc33a', '#fdd75a', '#feee5a'],
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {            // 坐标轴指示器，坐标轴触发有效
  //         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
  //       }
  //     },
  //     legend: {
  //       data: ['满意', '良好']
  //     },
  //     grid: {
  //       left: 20,
  //       right: 20,
  //       bottom: 15,
  //       top: 40,
  //       containLabel: true
  //     },
  //     xAxis: [
  //       {
  //         type: 'value',
  //         // min: -100,
  //         max: 25,
  //         axisLine: {
  //           lineStyle: {
  //             color: '#999'
  //           }
  //         },
  //         axisLabel: {
  //           color: '#666'
  //         }
  //       }
  //     ],
  //     yAxis: [
  //       {
  //         type: 'category',
  //         axisTick: { show: false },
  //         data: ['马降龙碉堡群', '玫瑰小镇', '流星谷水上乐园', '深圳音乐厅', '东湖公园', '五邑大学', '江门东龙游乐世界'],
  //         axisLine: {
  //           lineStyle: {
  //             color: '#999'
  //           }
  //         },
  //         axisLabel: {
  //           color: '#666'
  //         }
  //       }
  //     ],
  //     series: [
  //       {
  //         name: '满意',
  //         type: 'bar',
  //         label: {
  //           normal: {
  //             show: true,
  //             position: 'inside'
  //           }
  //         },
  //         data: [10.6, 11.4, 11.56 , 13.68, 15.03, 17.41, 19.74]
  //       },
  //       {
  //         name: '良好',
  //         type: 'bar',
  //         stack: '总量',
  //         label: {
  //           normal: {
  //             show: true
  //           }
  //         },
  //         data: [0.67, 1.62, , 1.55, 1.47, 1.91, 1.72]
  //       },
  //       // {
  //       //   name: '差评',
  //       //   type: 'bar',
  //       //   stack: '总量',
  //       //   label: {
  //       //     normal: {
  //       //       show: true,
  //       //       position: 'left'
  //       //     }
  //       //   },
  //       //   data: [-20, -32, -21, -34, -90, -130, -110]
  //       // }
  //     ]
  //   };
  //   setTimeout(() => {
  //     chart.clear()
  //     chart.setOption(option);
  //   }, 1500)
  // },






  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  },

 
})
