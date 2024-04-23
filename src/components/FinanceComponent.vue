<script setup lang="ts">
import { createCost } from '@/service/cost.service'
import type { cost } from '@/types/costs.type'
import { ref, type Ref } from 'vue'
import ChartComponent from './ChartComponent.vue'

const data = defineProps(['props', 'allCosts'])
const costTypeItens = ['Mãe', 'Faculdade', 'Lazer', 'Comida', 'Dívidas']
const addCostDialog = ref(false)
const newCost: Ref<cost> = ref({} as cost)
const costs: Ref<cost[]> = ref([])
const chosenDay = ref('')
const allValues: Ref<number> = ref(0)
costs.value = data.allCosts

const calculateExpenses = () => {
  allValues.value = costs.value.reduce((total, el) => total + parseInt(el.value), 0)
}

const addCost = () => {
  if (addCostDialog.value) {
    newCost.value.date = chosenDay.value + '/' + data.props.month + '/' + data.props.year
    createCost(newCost.value)
    costs.value.push(newCost.value)
    addCostDialog.value = false
    newCost.value = {} as cost
    return
  }
  addCostDialog.value = true
}

calculateExpenses()
</script>

<template>
  <v-row>
    <v-col cols="10">
      <div class="d-flex justify-center mt-3">
        <h1>
          {{ data.props.month.replace(/\b\w/g, (match: string) => match.toUpperCase()) }} de
          {{ data.props.year }}
        </h1>
      </div>
    </v-col>
    <v-col cols="2">
      <div class="mt-3">Salário disponível: R${{ 4000 - allValues }}</div></v-col
    >
  </v-row>

  <div v-for="(day, index) in data.props.days" :key="index">
    <v-card class="ma-5 pa-2" color="secondary">
      <div class="d-flex justify-space-between">
        <h3>Dia {{ day }}</h3>
        <v-btn color="primary" @click="(addCostDialog = true), (chosenDay = day)"
          >Adicionar gasto</v-btn
        >
      </div>
      <v-card v-for="cost in costs" :key="cost.id" class="mt-2" color="tertiary">
        <div v-if="cost.date[0] == day" class="d-flex justify-space-between">
          <div class="ml-3 my-2">
            <h3>Produto:</h3>
            {{ cost.name }}
          </div>
          <div class="my-2">
            <h3>Valor:</h3>
            R${{ cost.value }}
          </div>
          <div class="mr-3 my-2">
            <h3>Tipo do gasto:</h3>
            {{ cost.type }}
          </div>
        </div>
      </v-card>
    </v-card>
  </div>

  <v-card color="secondary" class="ma-5">
    <ChartComponent :costs="costs" :days="data.props.days" v-if="costs.length > 0" />
  </v-card>
  <v-dialog v-model="addCostDialog" width="40vw">
    <v-card class="pa-3" color="tertiary">
      <h4 class="pb-3">Adicione um gasto novo</h4>
      <v-text-field label="Nome do produto" v-model="newCost.name" />
      <v-text-field label="Valor do produto" v-model="newCost.value" />
      <v-select label="Tipo do gasto" v-model="newCost.type" :items="costTypeItens" />
      <v-btn color="secondary" @click="addCost">Salvar</v-btn>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
