import regeneratorRuntime from '../../lib/runtime/runtime.js'
//引入 用来发送请求的方法 一定要把路径补全
import { request } from "../../request/index.js";

// 一、 输入框绑定 值改变事件 input事件
//     1 获取到输入框的值
//     2 合法性判断
//     3 检验通过 把输入框的值 发送到后台
//     4 返回的数据打印到页面上
// 二、防抖（防止抖动）定时器 节流
//     0 防抖 一般输入框中 防止重复输入 重复发送请求
//     1 节流 一般是用在页面下拉和上拉
//     定义全局的定时器id

Page({
  data: {
    place:[],
    // 按键是否隐藏
    isFocus:false,
    // 输入框的值
    inpValue:""
  },
  TimeId:-1,
  // 输入框的值改变 就会触发的事件
  handleInput(e){
    //1 获取输入框的值
    const {value}=e.detail;
    //2 检测合法性
    if(!value.trim()){
      this.setData({
        place:[],
        isFocus: false
      })
      // 值不合法
      return;
    }
    //3 准备发送请求获取数据
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.search(value);
    },1000);
    
  },
  // 发送请求获取搜索建议 数据
  async search(word){
    const res = await request({ url:"/search",data:{word}});
    console.log(res.data.jm_list);
    this.setData({
      place: res.data.jm_list
    })
  },
  // 点击取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus: false,
      place:[]
    })
  }
})