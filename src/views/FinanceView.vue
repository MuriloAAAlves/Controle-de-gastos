<script setup lang="ts">
import FinanceComponent from '@/components/FinanceComponent.vue'
import { readAllCosts } from '@/service/cost.service'
import { ref, type Ref, watch } from 'vue'
import type { cost } from '@/types/costs.type'

const prop = defineProps(['month', 'year', 'days'])
const allCosts: Ref<cost[]> = ref([])

const readAll = async () => {
  const data = await readAllCosts()
  const monthYear = prop.month + '/' + prop.year
  const pattern = new RegExp(monthYear.replace('/', '\\/') + '$')
  allCosts.value = data.filter((el) => pattern.test(el.date))
}

watch(() => prop.month, readAll)
</script>
<template>
  <div v-if="allCosts.length > 0">
    <FinanceComponent :props="prop" :all-costs="allCosts"> </FinanceComponent>
  </div>
  <div v-else>
    <FinanceComponent :props="prop" :all-costs="allCosts"> </FinanceComponent>
  </div>
</template>

<style></style>
