import type { cost } from '@/types/costs.type'
import { v4 as uuidv4 } from 'uuid'

const createCost = (cost: cost) => {
  const request = window.indexedDB.open('financedb', 1)
  request.onsuccess = () => {
    const db = request.result
    const transaction = db.transaction(['cost'], 'readwrite')
    const store = transaction.objectStore('cost')
    cost.id = uuidv4()
    store.put({ id: cost.id, name: cost.name, value: cost.value, type: cost.type, date: cost.date })
  }
  request.onerror = (erro) => {
    console.log('Erro ao criar gasto')
    console.log(erro)
  }
}

const readAllCosts = (): Promise<cost[]> => {
  return new Promise((resolve, reject) => {
    let costArray = []
    const request = window.indexedDB.open('financedb', 1)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['cost'], 'readonly')
      const store = transaction.objectStore('cost')
      const allRecords = store.getAll()
      allRecords.onsuccess = function () {
        costArray = allRecords.result
        resolve(costArray)
      }
      allRecords.onerror = function () {
        reject(allRecords.error)
      }
    }
    request.onerror = function () {
      reject(request.error)
    }
  })
}

export { createCost, readAllCosts }
