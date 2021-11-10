import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Notes } from './Notes'


const GlobalStyle = createGlobalStyle`
  * {
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
