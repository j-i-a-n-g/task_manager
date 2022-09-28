<template>
  <div class="setting">
    <NavBar title="设置" />
    <div class="setting-list">
      <div class="setting-list-user">
        <van-cell title="头像" is-link />
        <van-cell title="昵称" is-link :value="username" @click="reviseUsername" />
        <van-cell title="ID" :value="id" />
      </div>
      <div class="setting-list-about">
        <van-cell title="手机号" is-link :value="phone" />
        <van-cell title="微信" is-link value="未绑定" />
        <van-cell title="QQ" is-link value="未绑定" />
        <van-cell title="微博" is-link value="未绑定" />
      </div>
      <div class="setting-list-system">
        <van-cell title="系统通知" is-link value="开" />
        <van-cell title="检查新版本" is-link />
        <van-cell title="清除缓存" value="207M" />
      </div>
    </div>
    <van-button type="default" block @click="logout">退出账号</van-button>
  </div>
</template>

<script setup>
import { Dialog } from 'vant'
import NavBar from '@/components/NavBar.vue'
import { userLogout } from '@/assets/api/index'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const userMessage = store.state.userMessage
const { _id, Phone, username } = userMessage
const id = computed(() => {
  return _id.slice(0, 7)
})
const phone = computed(() => {
  return Phone.slice(0, 3) + '****' + Phone.slice(7)
})
// 退出账号登录
const logout = () => {
  Dialog.confirm({
    message: '是否确认退出账号？'
  })
    .then(async () => {
      await userLogout()
      $cookies.remove('connect.sid')
      // 清除cookie标记
      store.commit('saveUserMessage', {})
      router.push('/login')
    })
    .catch(() => {
      // on cancel
    })
}
// 跳转到修改昵称页面
const reviseUsername = () => {
  router.push({ path: '/reviseUsername' })
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.setting {
  width: 100%;
  height: 100vh;
  background-color: $bgColor;
  &-list {
    margin-top: 5px;
    &-user {
      margin-bottom: 10px;
    }
    &-about {
      margin-bottom: 10px;
    }
    &-system {
      margin-bottom: 30px;
    }
  }
  ::v-deep .van-button__text {
    color: #db0d0d;
  }
}
</style>
