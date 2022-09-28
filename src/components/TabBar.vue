<template>
  <div class="tabbar" @click="routerToList">
    <van-tabbar v-model="active" @change="onChange" active-color="rgba(102, 110, 232)">
      <van-tabbar-item icon="todo-list"></van-tabbar-item>
      <van-tabbar-item icon="bars"></van-tabbar-item>
      <van-tabbar-item icon="cluster"></van-tabbar-item>
      <van-tabbar-item icon="manager"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const emits = defineEmits(['toggleTabbar'])
const router = useRouter()
const active = ref(0)
const onChange = (index) => {
  active.value = index
  router.push({ name: 'Main' })
  emits('toggleTabbar', index)
}
const routerToList = (e) => {
  if (e.target.className !== 'tabbar') return
  router.push({ path: '/addwork' })
}

</script>

<style lang="scss" scoped>
  @import '@css/style.scss';
  .tabbar {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    pointer-events: none;
    &:before {
        content: '+';
        z-index: 2;
        background-color: rgba(102, 110, 232);
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: #fff;
        font-size: 40px;
        text-align: center;
        line-height: 50px;
        box-shadow: 0 0 1px 5px #ccc;
        pointer-events: auto;
      }
    ::v-deep .van-tabbar {
      position: relative;
      .van-tabbar-item {
        pointer-events: auto;
      }
      .van-tabbar-item:nth-child(2){
        margin-right: px2rem(90);
      }
    }
  }
</style>
