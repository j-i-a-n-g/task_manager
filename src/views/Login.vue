<template>
  <div class="login">
    <h6 class="login-title">手机验证码登录</h6>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          placeholder="请输入手机号码"
          :rules="[{ required: true, message: '请输入手机号码' }]"
        />
        <van-field
          v-model="code"
          type="number"
          name="code"
          placeholder="请填写短信验证码"
          :rules="[{ required: true, message: '请填写短信验证码' }]"
        >
      </van-field>
      <button class="code">获取验证码</button>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block native-type="submit" >
          登录
        </van-button>
      </div>
      <div class="login-agreement">
        <span>登录即代表同意</span>
       <span class="login-agreement-user">用户协议</span>
      </div>
    </van-form>
    <!-- 更多方式登录 -->
    <div class="login-more">
      <span>———— 或通过以下方式登录 ————</span>
      <div class="login-more-icon">
        <div>
          <van-icon name="wechat" size="20px" />
        </div>
        <div>
          <van-icon name="qq" size="20px" />
        </div>
        <div>
          <van-icon name="weibo" size="20px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { userLogin } from '@/assets/api/index'
const router = useRouter()
const store = useStore()
const code = ref(111111)
const phone = ref(18819609609)
// 登录事件
const onSubmit = async (val) => {
  const result = await userLogin(val)
  if (!result.code) return
  store.commit('saveUserMessage', result.data)
  router.push({ name: 'Main' })
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: px2rem(20);
    background-color: $bgColor;
    height: 100vh;
    &-title {
      color: #6684ee;
    }
    ::v-deep .van-form {
      width: 100%;
      background-color: #fff;
      position: relative;
      .code {
      font-size: 12px;
      border: none;
      background-color: #fff;
      color: #6684ee;
      position: absolute;
      top: px2rem(56);
      right: px2rem(27);
    }
      .van-button {
        background-color: #6684ee;
        opacity: .5;
        border: none;
        color: #fff;
        margin-top: 30px;
      }
    }
    .login-agreement {
      text-align: center;
      height: 14px;
      margin-bottom: 40px;
      line-height: 14px;
      span {
      font-size: 12px;
      color: #999;
      }
      .login-agreement-user {
        color: #6684ee;
        text-decoration: underline;
      }
    }
    &-more {
      margin-top: 80px;
      span {
        font-size: 12px;
        color: #999;
      }
      &-icon {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        div {
          width: 30px;
          height: 30px;
          background-color: #6684ee;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
          ::v-deep .van-badge__wrapper {
            color: #fff;
          }
        }
      }
    }
  }
</style>
