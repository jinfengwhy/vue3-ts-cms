import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

// 注册中国地图
import chinaJson from '../data/china.json'
echarts.registerMap('china', chinaJson)

export function useEcharts(domEl: HTMLElement, theme = 'light') {
  // 1.初始化echarts
  const echartInstance = echarts.init(domEl, theme, {
    renderer: 'svg'
  })

  // 2.设置options
  const setOption = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 3.监听window尺寸的变化
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return [setOption]
}
