import { useContext, useEffect, useRef, useState } from 'react';
import { FetchTheme, Themes } from '../../utils/ThemesApi';
import { FetchNews, NewsDTO } from '../../utils/NewsApi';
import { ThemeContext } from '../../App';
import { saveTheme } from '../ThemesPage/ThemesPage';

import NewsArticle from '../NewsArticle/NewsArticle';
import refreshIcon from '../../assets/refresh-icon.svg'

import './NewsPage.css'

function NewsPage() {
    const [contentLoading,setContentLoading] = useState<boolean>(false)
    const [newsList, setNewsList] = useState<Array<NewsDTO>>([])
    const [pagesLoaded, setPagesLoaded] = useState<number>(1)
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
    const refresh = useRef<HTMLDivElement>(null)
    const refreshIc = useRef<HTMLImageElement>(null)

    const root = document.querySelector<HTMLElement>(':root')

    let startY = 0
    let currentY = 0

    useEffect(()=>{
        FetchNews(pagesLoaded, 10)
        .then(resposne => {
            setNewsList(news => [...news, ...resposne?.data])
            setContentLoading(false)
        })
    },[pagesLoaded])

    useEffect(()=>{
        window.onscroll = onPageScroll
        window.ontouchstart = onTouchStart
        window.ontouchmove = onTouchMove
        window.ontouchend = onTouchEnd
        console.log(currentTheme);
    },[])

    useEffect(()=>{
        if(currentTheme.mainColor === null || currentTheme.secondColor === null || currentTheme.textColor === null){
            FetchTheme(Themes.light)
            .then(res =>{
                if(res) {
                    setCurrentTheme(cur=> cur = res)
                    saveTheme(res)
                }
            })
        }

        if(root){
            root.style.setProperty('--main-color', `${currentTheme.mainColor}`)
            root.style.setProperty('--second-color', `${currentTheme.secondColor}`)
            root.style.setProperty('--text-color', `${currentTheme.textColor}`)
        }
    },[currentTheme])
    
    const onPageScroll = () =>{
        var preloadTreshold = 1 // Используется, поскольку высоты разнятся на значение < 1

        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - preloadTreshold  && !contentLoading) {
            setContentLoading(true)
            setPagesLoaded(cur=> cur + 1)
        }
    }

    const onTouchStart = (e:TouchEvent) =>{
        var preloadTreshold = 500 // Если пользователь коснулся экрана за 500px (в среднем высота одного поста) до конца списка новостей

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-preloadTreshold && !contentLoading) {
            setContentLoading(true)
            setPagesLoaded(cur => cur + 1)
        }
        let touch = e.targetTouches[0]
        startY = touch.screenY 
    }

    const onTouchMove = (e:TouchEvent) =>{
        if(window.scrollY === 0){
            let touch = e.changedTouches[0]
            currentY = touch.screenY
            let distance = currentY > startY ? currentY - startY : 0
    
            if(distance > 0 && distance <= 100 && refresh.current && refreshIc.current){
                refresh.current.style.marginTop = `${distance}px`
                
                refreshIc.current.style.rotate = `${distance*2}deg`
                console.log(distance);
                
                if(distance >= 95){
                    refresh.current.style.backgroundColor = `green`
                    location.reload()
                }
            }
        }
    }

    const onTouchEnd = () =>{
        if(refresh.current){
            refresh.current.style.backgroundColor = `#fff`
            refresh.current.style.marginTop = `${0}px`
        } 
    }

    return (
            <main>
                <h1>Новостной портал</h1>
                <div ref={refresh} className={"refresh_container"}>
                    <img ref={refreshIc} src={refreshIcon} alt="" />
                </div>
                <section className={'news_container'}>
                    {newsList.map((news, index) => (
                        <NewsArticle 
                            key={index}
                            id={news.id} 
                            title={news.title} 
                            content={news.content}
                            createdAt={news.createdAt}
                        />      
                    ))}
                </section>
                <button className='refresh_btn' onClick={()=>location.reload()}>Обновить</button>
            </main>
    );
}

export default NewsPage;
