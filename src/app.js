import React from 'react'
import R from 'ramda'
import { VictoryStack, VictoryBar } from 'victory'
import './app.css'
import csv from 'raw!../transactions.csv'

const convert = R.pipe(
  R.split('\n'),
  R.map(R.split(',')),
  R.reduce((acc, row) => {
    if (!acc) {
      return {
        columns: row,
        data: [],
      }
    }
    acc.data.push(R.zipObj(acc.columns, row))
    return acc
  }, undefined)
)

const data = convert(csv).data

console.log(data)
// "Chase Sapphire"

const filter = R.pipe(
  R.filter(R.propEq("Account Name", "Chase Sapphire")),
  R.map(obj => {
    return {
      x: new Date(obj.Date),
      y: parseFloat(obj.Amount),
    }
  })
)

const BAR_HEIGHT = 10

// TODO:
// - filter and accumulate (date ranges, categories)
// - axis components
// - stack bars for each category

const App = props =>
  <div className="app">
    <div className="timeline">
      <VictoryStack
        horizontal
        height={data.length * BAR_HEIGHT}
      >
        <VictoryBar
          data={filter(data)}
          width={50}
        />
      </VictoryStack>
    </div>
  </div>

export default App
