<template>
  <div class="login-account">
    <el-form ref="formRef" :model="account" :rules="rules" label-width="60px">
      <el-form-item label="账号" prop="number">
        <el-input v-model="account.number"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

import { rules } from '../config/rules-account'

export default defineComponent({
  setup() {
    const account = reactive({
      number: '',
      password: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = function () {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log(
            `---真正的登录逻辑~ ${account.number} ${account.password}`
          )
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
