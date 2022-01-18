<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { IPieEchartData } from '../types'

import BaseEchart from '@/base-ui/echart'

export default defineComponent({
  components: {
    BaseEchart
  },
  props: {
    pieData: {
      type: Array as PropType<IPieEchartData[]>,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            bottom: '-10%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })

    return { options }
  }
})
</script>

<style scoped></style>
