<template>
  <van-nav-bar
  :title="title"
  :right-text="btn"
  @click-left="onClickLeft"
  @click-right="onClickRight">
    <template #left>
      <van-icon name="arrow-left" size="18" color="#000" />
    </template>
  </van-nav-bar>
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

<style>
</style>
