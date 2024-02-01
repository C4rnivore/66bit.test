import axios from "axios";

const themesApi = 'https://frontappapi.dock7.66bit.ru/api/theme/get?'

export interface ThemeDTO{
    mainColor:string,
    secondColor:string,
    textColor:string,
}

export enum Themes{
    dark,
    light,
    blue
}

export async function FetchTheme(themeName:Themes):Promise<ThemeDTO | undefined> {
    try{
        var response = await axios({
            method:'GET',
            url:themesApi + `name=${Themes[themeName]}`
        })
        return {
            mainColor: response.data.mainColor,
            secondColor: response.data.secondColor,
            textColor: response.data.textColor
        }
    }
    catch(err){
        console.log(err);
    }
    return undefined
}