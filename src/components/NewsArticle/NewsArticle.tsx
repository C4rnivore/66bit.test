import { FC } from 'react';
import { NewsDTO } from '../../utils/NewsApi';
import './NewsArticle.css'

const NewsArticle:FC<NewsDTO> = (props) => {
    return ( 
        <div className="article_container">
            <h2>{props.title}</h2>
            <p>{props.content}</p>
            <span>{props.createdAt}</span>
        </div>
    );
}

export default NewsArticle;