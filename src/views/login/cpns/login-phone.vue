<template>
  <div class="login-phone">
    <el-form :model="phone" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verify-code">
          <el-input v-model="phone.code"></el-input>
          <el-button class="verify-btn" type="primary">验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import { rules } from '../config/rules-phone'

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''
    })

    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.verify-code {
  display: flex;

  .verify-btn {
    margin-left: 10px;
  }
}
</style>
