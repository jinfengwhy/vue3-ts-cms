<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <jf-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </jf-card>
      </el-col>
      <el-col :span="10">
        <jf-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </jf-card>
      </el-col>
      <el-col :span="7">
        <jf-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </jf-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <jf-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </jf-card>
      </el-col>
      <el-col :span="12">
        <jf-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsSale"></bar-echart>
        </jf-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useStore } from '@/store'

import JfCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts/'

export default defineComponent({
  components: {
    JfCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    // 1.发送网络请求
    const store = useStore()
    store.dispatch('analysis/getAnalysisDataAction')

    // 2.获取图表依赖数据
    // a.饼图、玫瑰图
    const categoryGoodsCount = computed(() => {
      return store.state.analysis.categoryGoodsCount
        .filter((item) => !!item.goodsCount)
        .map((item) => ({
          name: item.name,
          value: item.goodsCount
        }))
    })
    // b.折线图、柱状图
    const categoryGoodsSale = computed(() => {
      const labels: string[] = [],
        values: any[] = [],
        goodsSale = store.state.analysis.categoryGoodsSale
      for (const item of goodsSale) {
        labels.push(item.name)
        values.push(item.goodsCount)
      }
      return { labels, values }
    })
    // c.中国地图
    const addressGoodsSale = computed(() => {
      return store.state.analysis.goodsAddressSale.map((item: any) => ({
        name: item.address,
        value: item.count
      }))
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;

  .row {
    margin-top: 20px;
  }
}
</style>
