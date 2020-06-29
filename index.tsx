
import * as R from './inject_runtime'

import * as React from 'react'

// window.$RefreshReg$ = (type, id) => R.register(type, id)
// window.$RefreshSig$ = () => type => type;

import * as ReactDOM from 'react-dom'

const id = x => x

const $RefreshSig$ = R.createSignatureFunctionForTransform

// const s = $RefreshSig$()
const A = id(() => <div>A1</div>)
R.register(A, 'A')

console.log({A})

const root = document.querySelector('#root')
ReactDOM.render(<A/>, root)
R.register(A, 'A')


window.setTimeout(() => {
  const A = id(() => <div>A2</div>)
  R.register(A, 'A')
  // console.log([...R.performReactRefresh().updatedFamilies][0])
  console.log(R.performReactRefresh())
}, 300)


export function C1() {
  const [x, s] = React.useState(0)
  React.useEffect(() => {
    const id = window.setInterval(() => s(i => i + 1), 100)
    return () => window.clearInterval(id)
  }, [])
  return <div>C1 {x}</div>
}

window.setTimeout(() => {
  R.register(C1, 'A')
  console.log(R.performReactRefresh())
}, 600)

export function C2() {
  const [x, s] = React.useState(0)
  React.useEffect(() => {
  }, [])
  return <div>C2 {x / 10}</div>
}

window.setTimeout(() => {
  R.register(C2, 'A')
  console.log(R.performReactRefresh())
}, 900)

