<template>
  <div class="agent">
    <van-search placeholder="搜索任务名称" @focus="RouteToSearch"/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const RouteToSearch = function () {
  router.push({ path: '/search', name: 'Search' })
}

</script>

<style lang="scss" scoped>
  @import '@css/style.scss';
.agent {
  width: 100%;
  padding: 0 20px;
  ::v-deep .van-search {
      .van-search__content {
      width: px2rem(290);
      padding: 0;
      border-radius: 10px;

      .van-field__left-icon {
        margin-left: 10px;
      }
    }
      .van-search__field {
      background-color: #f2f2f2;
      border-radius: 10px;

    }
    }
}
</style>
