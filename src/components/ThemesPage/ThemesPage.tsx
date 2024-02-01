import { useContext, useEffect } from 'react';
import { FetchTheme, ThemeDTO, Themes } from '../../utils/ThemesApi';

import './ThemesPage.css'
import { ThemeContext } from '../../App';

export const saveTheme = (theme:ThemeDTO) => {
    localStorage.setItem('MainColor', theme.mainColor)
    localStorage.setItem('SecondColor', theme.secondColor)
    localStorage.setItem('TextColor', theme.textColor)
}

function ThemesPage() {
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
    const root = document.querySelector<HTMLElement>(':root');

    function handleThemeBtnClick(themeName:Themes){
        FetchTheme(themeName)
        .then(res =>{
            if(res) {
                setCurrentTheme(cur=> cur = res)
                saveTheme(res)
            }
        })
    }
    
    useEffect(()=>{
        if(currentTheme === null)
            return

        if(root){
            root.style.setProperty('--main-color', `${currentTheme.mainColor}`)
            root.style.setProperty('--second-color', `${currentTheme.secondColor}`)
            root.style.setProperty('--text-color', `${currentTheme.textColor}`)
        }
            
    },[currentTheme])
    
    return ( 
        <section className='themes'>
            <button onClick={() => handleThemeBtnClick(Themes.dark)}>Темная</button>
            <button onClick={() => handleThemeBtnClick(Themes.light)}>Светлая</button>
            <button onClick={() => handleThemeBtnClick(Themes.blue)}>Синяя</button>
        </section>
     );
}

export default ThemesPage;