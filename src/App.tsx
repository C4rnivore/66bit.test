import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import NewsPage from './components/NewsPage/NewsPage'
import './main.css'
import ThemesPage from './components/ThemesPage/ThemesPage'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { ThemeDTO } from './utils/ThemesApi'

export const ThemeContext = createContext<{currentTheme:ThemeDTO, setCurrentTheme:Dispatch<SetStateAction<ThemeDTO>>}>(null!)

function App() {
  const savedTheme:ThemeDTO = {
    mainColor: localStorage.getItem('MainColor')!,
    secondColor: localStorage.getItem('SecondColor')!,
    textColor: localStorage.getItem('TextColor')!
  }
  const [currentTheme, setCurrentTheme] = useState<ThemeDTO>(savedTheme)

  return (
    <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={
            <NewsPage/>
          }/>
          <Route path='/themes' element={
            <ThemesPage/>
          }/>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
