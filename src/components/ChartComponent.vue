<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import type { cost } from '@/types/costs.type'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps(['costs', 'days'])

const createNumbersArrayFromCosts = (costs: cost[]): number[] => {
  const numbersArray: number[] = []
  for (const cost of costs) {
    numbersArray[parseInt(cost.date[0]) - 1] = Number(cost.value)
  }
  return numbersArray
}

const createNumberStringsArray = (total: number): string[] => {
  const numberStringsArray: string[] = []

  for (let i = 1; i <= total; i++) {
    numberStringsArray.push(String(i))
  }

  return numberStringsArray
}

const chartData = {
  labels: createNumberStringsArray(props.days),
  datasets: [
    {
      label: 'Gasto do dia',
      data: createNumbersArrayFromCosts(props.costs)
    }
  ]
}
</script>

<template>
  <Bar :data="chartData" aria-label="grafico" />
</template>
