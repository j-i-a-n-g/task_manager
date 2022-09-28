<template>
  <div class="username">
    <NavBar title="修改昵称" btn="保存" @onClickRight="saveUsername" />
    <div class="username-cart">
      <van-form>
      <van-cell-group inset>
        <van-field
        v-model="username"
        placeholder="请输入用户名"
        :rules="[{pattern, message: '用户名不符合要求'}]" />
      </van-cell-group>
    </van-form>
      <span class="username-cart-tip">英文字母或汉字，限4-16个字符，一个汉字为2个字符</span>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import NavBar from './NavBar.vue'
import { reviseUserName } from '@/assets/api/index'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { Toast } from 'vant'
const store = useStore()
const router = useRouter()
const username = ref('')
// 校验规则
const pattern = /^[\u4e00-\u9fa5]{2,8}$|^[_a-zA-Z0-9_]{4,16}$/
onMounted(() => {
  username.value = store.state.userMessage.username
})

const saveUsername = async () => {
  const bol = pattern.test(username.value)
  if (bol) {
    const result = await reviseUserName({ username: username.value, id: store.state.userMessage._id })
    if (result.code) {
      store.commit('reviseUsername', username.value)
      router.go(-1)
    }
  } else {
    Toast('用户名不符合规范')
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';
  .username {
    width: 100%;
    height: 100vh;
    background-color: $bgColor;
    &-cart {
      margin-top: 56px;
      width: 100%;
      background-color: #fff;
      padding-bottom: 30px;
      ::v-deep .van-cell-group {
        border-bottom: 1px solid #999;
      }
      &-tip {
        font-size: 12px;
        color: #999;
        margin-left: px2rem(16);
      }
    }
  }
</style>
