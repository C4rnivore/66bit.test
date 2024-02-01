import axios from "axios";

const newsApi = 'https://frontappapi.dock7.66bit.ru/api/news/get?'

export interface NewsDTO{
    id:number,
    title:string,
    content:string,
    createdAt:string
}

export async function FetchNews(page:number, count:number) {
    try{
        var response = await axios({
            method:'GET',
            url:newsApi + `page=${page}&count=${count}`
        })
        return response
    }
    catch(err){
        console.log(err);
    }
}