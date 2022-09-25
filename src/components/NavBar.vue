<template>
  <van-nav-bar :title="title" @click-left="onClickLeft">
    <template #left>
      <van-icon name="arrow-left" size="18" color="#000" />
    </template>
  </van-nav-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps(['title'])
const router = useRouter()
const onClickLeft = () => {
  router.go(-1)
}
</script>

<style>
</style>
