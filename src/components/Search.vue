<template>
  <div class="search">
    <div class="search-bar">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="搜索任务名称"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
const router = useRouter()
const value = ref('')

const onSearch = (val) => Toast(val)
const onCancel = () => {
  router.push({ path: '/', name: 'Main' })
  Toast('111')
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.search {
  width: 100%;
  height: 100vh;
  background-color: $bgColor;
  &-bar {
    width: 100%;
    height: 54px;
    background-color: #fff;
    ::v-deep .van-search {
      display: flex;
      justify-content: space-between;
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
}
</style>
