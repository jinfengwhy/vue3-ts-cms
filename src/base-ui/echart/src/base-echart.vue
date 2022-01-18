<template>
  <div class="base-echart">
    <div class="echart" ref="echartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect, PropType } from 'vue'
import { EChartsOption } from 'echarts'
import { useEcharts } from '../hooks/useEcharts'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  setup(props) {
    const echartDivRef = ref<HTMLElement>()

    onMounted(() => {
      const [setOption] = useEcharts(echartDivRef.value!)
      watchEffect(() => {
        setOption(props.options)
      })
    })

    return {
      echartDivRef
    }
  }
})
</script>

<style scoped>
.echart {
  background-color: #fff;
}
</style>
