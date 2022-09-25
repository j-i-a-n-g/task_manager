<template>
  <div class="my">
    <!-- 用户个人信息栏目 -->
    <div class="my-message">
    <van-icon name="chat-o" :dot="true" />
      <div class="my-message-avatar">
        <img :src="`/node${userMessage?.avatar}`" alt="">
      </div>
      <div class="my-message-single">
        <p class="my-message-single-name">{{userMessage?.username}}</p>
        <span class="my-message-single-phone">{{phone}}</span>
      </div>
    </div>
    <!-- 会员解锁 -->
    <div class="my-member">
      <button class="my-member-btn">立即开通</button>
    </div>
    <div class="my-action">
      <div class="my-action-design">
      <van-cell title="我的收藏" is-link />
      <van-cell title="个性化外观" is-link />
      </div>
      <div class="my-action-about">
      <van-cell title="邀请好友" is-link />
      <van-cell title="帮助指南" is-link />
      <van-cell title="关于我们" is-link />
      <van-cell title="建议和反馈" is-link />
      <van-cell title="设置" is-link @click="settingUserData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
onMounted(() => {
  if (store.state.userMessage === {}) {
    router.push('/login')
  }
})
let userMessage = reactive({})
userMessage = store.state.userMessage
// onMounted(() => {
//   console.log(userMessage)
// })
// 对后端传回的手机号进行格式处理
const phone = computed(() => {
  return userMessage?.Phone.slice(0, 3) + '****' + userMessage?.Phone.slice(7)
})
// 点击设置跳转到设置页面
const settingUserData = () => {
  router.push({ path: '/setting' })
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';
.my {
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 px2rem(20);
  box-sizing: border-box;
  &-message {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    position: relative;
    margin: 30px 0 20px 0;
    &-avatar {
      width: 60px;
      height: 60px;
      background-color: $topicColor;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        text-align: center;
      }
    }
    &-single {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        &-name {
          font-size: 18px;
          margin: 0 0 10px 0;
        }
        &-phone {
          font-size: 14px;
        }
      }
    .van-badge__wrapper {
    position: absolute;
    font-size: 22px;
    top: 0;
    right: 0;
    }
  }
  &-member {
    width: 100%;
    background-image: url('@img/member.png');
    height: 58px;
    position: relative;
    &-btn {
      width: 78px;
      height: 28px;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      font-size: 12px;
      color: #fff;
      background-color: #333;
      border-radius: 39px;

    }
  }
  &-action {
    width: 100%;
    &-design {
      margin: 15px 0;
    }
  }

}
</style>
