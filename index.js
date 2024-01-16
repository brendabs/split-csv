const fs = require('fs')

const fileData = fs.readFileSync('alunos.csv')

const csv = fileData.toString()
const fileDataArray = csv.split('\n')

const createCsv = (filename, text) => {
  fs.writeFileSync(`${filename}.csv`, text)
}

const splitCsv = (csv, itemsPerCsv) => {
  const header = csv[0]
  const restCsv = csv.slice(1, csv.length)

  const pages = Math.ceil(restCsv.length / itemsPerCsv)
  let startSlice = 0

  for(let i = 1; i <= pages; i++) {
    const endSlice = startSlice + itemsPerCsv
    const pageSliced = restCsv.slice(startSlice, endSlice)
    const result = [header, ...pageSliced]

    startSlice = endSlice
    
    createCsv(`Page - ${i}`, result.join('\n'))
  }
}

splitCsv(fileDataArray, 999)