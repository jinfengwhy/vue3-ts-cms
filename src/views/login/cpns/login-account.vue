<template>
  <div class="login-account">
    <el-form ref="formRef" :model="account" :rules="rules" label-width="60px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'

import localCache from '@/utils/cache'

import { rules } from '../config/rules-account'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getItem('name') ?? '',
      password: localCache.getItem('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = function (isKeepPassword: boolean) {
      formRef.value?.validate((valid) => {
        if (!valid) {
          return
        }
        // 1.判断是否需要记住密码
        if (isKeepPassword) {
          localCache.setItem('name', account.name)
          localCache.setItem('password', account.password)
        } else {
          localCache.deleteItem('name')
          localCache.deleteItem('password')
        }
        // 2.登录验证逻辑
        store.dispatch('login/userLoginAction', { ...account })
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
