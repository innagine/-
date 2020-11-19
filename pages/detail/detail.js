// 1、引入依赖脚本
import * as echarts from '../../components/ec-canvas/echarts';

import regeneratorRuntime from '../../lib/runtime/runtime.js'
//引入 用来发送请求的方法 一定要把路径补全
import { request } from "../../request/index.js";

var name = null;
var high = null;
var mid = null;
var low = null;
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
        max: 50,
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
        data: [name],
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
        data: [310]
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
        data: [10]
      },
      // {
      //   name: '一般',
      //   type: 'bar',
      //   stack: '总量',
      //   label: {
      //     normal: {
      //       show: true,
      //       position: 'left'
      //     }
      //   },
      //   data: [-50]
      // }
    ]
  };

  chart.setOption(option);
  
}
Page({


  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
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
    // swiperList: [],
    ec: {
      onInit: initChart
    },
    placeObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {name}=options;
    this.getPlaceDetail(name);
  },

// 获取商品详情数据
async getPlaceDetail(name){
  const res = await request({ url:"/placeinfo",data:{name}});
  name = res.data.jm_list[0].name;
  high = res.data.jm_list[0].high;
  mid = res.data.jm_list[0].mid;
  low = res.data.jm_list[0].low;
  chart.setOption(
    {
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
          data: [name],
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
          data: [high]
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
          data: [mid]
        },
        // {
        //   name: '一般',
        //   type: 'bar',
        //   stack: '总量',
        //   label: {
        //     normal: {
        //       show: true,
        //       position: 'left'
        //     }
        //   },
        //   data: [-50]
        // }
      ]
    }
  );
  this.setData({
    placeObj: res.data.jm_list[0]
    
  })

},




})