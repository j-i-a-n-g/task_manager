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
    <div class="search-content">
      <p>共搜索到{{workCard.length}}条结果</p>
      <div v-if="workCard.length !== 0">
        <TaskCard v-for="item in workCard" :key="item._id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TaskCard from './TaskCard.vue'
import { searchWork } from '@/assets/api/index'
const router = useRouter()
const value = ref('')
// 搜索得到的工作列表结果
const workCard = ref([])
const onSearch = async (val) => {
  const result = await searchWork({ val })
  workCard.value = result.data
}
const onCancel = () => {
  router.push({ path: '/', name: 'Main' })
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
  &-content {
    padding: 0 px2rem(20);
    p {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
