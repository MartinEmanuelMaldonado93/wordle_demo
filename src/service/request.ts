import {WORDS} from './words';

function getWords() {
    return WORDS;
}

export function getWordOftheDay() {
    const words = getWords();
    console.log( "INDEEEEX :", getDayOfTheYear());
    const wordOfTheDay = words[getDayOfTheYear()];
    return wordOfTheDay.toUpperCase();
}
export async function isValidWord(word:string){
    try {const URL = "https://api.dictionaryapi.dev/api/v2/entries/en" + word;
    const response = await fetch(URL);
    if( response.status !== 200) {
        throw new Error('Request failed');
    }
    const  json = await response.json();
    
    return json.length;
    } catch(e) {
        console.log(e);
        return false;
    }
    // const words = getWords();
    // return word.includes( word.toLowerCase() );
}
function getDayOfTheYear():number {
    const now = new Date();
    const start = new Date(now.getFullYear(),0,0);
    const timeZone = ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const diff = ((now as any) - (start as any)) + timeZone;
    const oneDay = 1000 * 60 * 60 * 24; 
    return Math.floor( diff / oneDay) - 100;// 100 porq index supera cant de palabras
}