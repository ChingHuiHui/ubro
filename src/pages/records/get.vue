<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-center space-x-10 mb-10">
      <div
        class="tab"
        v-for="(tab, type) in tabs"
        :key="type"
        @click="activeTab = type"
        :class="{ active: activeTab === type }"
      >
        {{ tab }}
      </div>
    </div>
    <List
      class="records"
      :fields="['#', '品項', '花費點數', '兌換時間']"
      v-if="activeTab === RECORD_TYPE.EXCHANGE"
    >
      <li
        v-for="(record, i) in exchangeRecords"
        :key="record.id"
        class="product-row"
      >
        <div>
          <span>{{ i + 1 }}</span>
          <span class="truncate">{{ record.productName }}</span>
          <span>{{ record.point }}</span>
          <span>{{ record.createdAt }}</span>
        </div>
      </li>
    </List>
    <List
      class="records"
      :fields="['#', '點數', '更新時間']"
      v-if="activeTab === RECORD_TYPE.CONSUME"
    >
      <li
        v-for="(record, i) in consumeRecords"
        :key="record.id"
        class="product-row"
      >
        <div>
          <span>{{ i + 1 }}</span>
          <span>{{ record.point }}</span>
          <span>{{ record.createdAt }}</span>
        </div>
      </li>
    </List>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { storeToRefs } from 'pinia'
  import List from '@/components/List.vue'

  const { exchangeRecords, consumeRecords } = storeToRefs(useAuthStore())

  enum RECORD_TYPE {
    EXCHANGE = 'EXCHANGE',
    CONSUME = 'CONSUME',
  }

  const tabs = {
    [RECORD_TYPE.EXCHANGE]: '兌換紀錄',
    [RECORD_TYPE.CONSUME]: '集點紀錄',
  }

  const activeTab = ref(RECORD_TYPE.EXCHANGE)
</script>

<style scoped>
  .tab {
    @apply bg-primary-light px-4 py-2 rounded-lg text-white;
    @apply cursor-pointer transitable;

    &:hover {
      @apply bg-primary;
    }

    &.active {
      @apply bg-primary-dark;
    }
  }

  .records {
    @apply flex-1  overflow-y-scroll;

    /deep/ .product-row {
      > div {
        @apply flex items-center;

        span:not(:nth-child(1)) {
          @apply flex-1;
        }

        span {
          @apply w-10 !important;
        }
      }
    }
  }
</style>
