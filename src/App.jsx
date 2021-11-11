import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Notes } from './Notes'


const GlobalStyle = createGlobalStyle`
  * {
  font-family: sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  margin: 0;
  background-color: white;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Notes />
    </>
  )
}


export default App
