<template>
  <div class="navbar">
    <van-nav-bar
  :title="title"
  :right-text="btn"
  @click-left="onClickLeft"
  @click-right="onClickRight">
    <template #left v-if="showLeft">
      <van-icon name="arrow-left" size="18" color="#000" />
    </template>
  </van-nav-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const emits = defineEmits(['onClickRight'])
defineProps({
  title: {
    type: String
  },
  btn: {
    type: String,
    default: ''
  },
  showLeft: {
    type: Boolean,
    default: true
  }
})
const router = useRouter()
const onClickLeft = () => {
  router.go(-1)
}
const onClickRight = () => {
  emits('onClickRight')
}
</script>

<style lang="scss" scoped>
  .navbar {
    width: 100%;
    height: 46px;
    border-bottom: 1px solid #ccc;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
</style>
