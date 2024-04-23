import { readAllCosts } from '@/service/cost.service'
import { getDaysInMonth } from '@/shared/shared'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = []

const calculateNextThreeMonths = async () => {
  const today = new Date()
  for (let i = 0; i < 3; i++) {
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + i + 1, 1)
    const month = nextMonth.toLocaleString('default', { month: 'long' })
    const year: number = nextMonth.getFullYear()
    const days = getDaysInMonth(year, month)

    routes.push({
      path: `/${year}/${month}`,
      name: `${month.replace(/\b\w/g, (match) => match.toUpperCase())} de ${year}`,
      component: () => import(`../views/FinanceView.vue`),
      props: { month, year, days }
    })
  }
}

const initializeRouter = async () => {
  try {
    await calculateNextThreeMonths()

    const router = createRouter({
      history: createWebHistory(),
      routes
    })
    router.push(routes[0].path)

    return router
  } catch (error) {
    console.error('Erro ao inicializar o roteador:', error)
  }
}

export default initializeRouter
