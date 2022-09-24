<template>
  <van-search placeholder="搜索任务名称" @focus="RouteToSearch" />
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const RouteToSearch = function () {
  router.push({ path: '/search', name: 'Search' })
}
</script>

<style lang="scss" scoped>
::v-deep .van-search {
  border-bottom: 1px solid #ccc;
  .van-search__content {
    padding: 0;
    border-radius: 10px;
    width: 100%;
    .van-field__left-icon {
      margin-left: 10px;
    }
  }
  .van-search__field {
    background-color: #f2f2f2;
    border-radius: 10px;
  }
}
</style>
