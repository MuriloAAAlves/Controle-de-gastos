const initiateDB = () => {
  const request = window.indexedDB.open('financedb', 1)

  request.onerror = (event) => {
    console.log('Erro ao abrir banco de dados')
    console.log(event)
  }
  request.onupgradeneeded = (event) => {
    const db = request.result
    const objectStore = db.createObjectStore('cost', { keyPath: 'id', autoIncrement: true })
    objectStore.createIndex('name', 'name', { unique: false })
    objectStore.createIndex('value', 'value', { unique: false })
    objectStore.createIndex('type', 'type', { unique: false })
    objectStore.createIndex('date', 'date', { unique: false })
  }
  request.transaction?.db.close()
}
export default initiateDB
