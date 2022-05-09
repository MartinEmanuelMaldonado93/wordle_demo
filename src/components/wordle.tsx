import RowCompleted from "./rowComplete";
import RowEmpty from "./rowEmpty";
import RowCurrent from './rowCurrent';
import { useEffect, useState } from "react";
import { GameStatus } from "./types";
import { useWindows } from "../hooks/useWindows"; 
import { getWordOftheDay, isValidWord } from "../service/request";
import Keyboard from "./keyword";
import styles from './wordle.module.scss';
import Modal from "./modal";

const keys:Array<string> = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
];
export default function Wordle(){
    const [wordOfTheDay, setWordOfTheDay] = useState<string>('');
    const [turn, setTurn] = useState<number>(1);
    const [currWord, setCurrWord]= useState<string>('');
    const [completedWords, setCompletedWords] = useState<string[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);

    // let tempWord = 'sabio';//5
    useWindows('keydown',handleKeyDown);
    useEffect( () =>{
        setWordOfTheDay(getWordOftheDay());
    },[]);
    // const sizeWord = getWordOftheDay.length;

    function handleKeyDown( event: KeyboardEvent ) {
        const key = event.key.toUpperCase(); 
        onKeyPressed(key);
    }
    function onKeyPressed(key:string) {
        if(gameStatus !== GameStatus.Playing){
            return;
        }
        if(key==='BACKSPACE' 
            && currWord.length > 0) { 
            onDelete();   
            return;
        }
        if(key === 'ENTER'
            && currWord.length === 5
            && turn <= 6){  
            onEnter();
            return;
        }
        if(currWord.length >= 5) 
            return; 
        if(keys.includes(key)){
            onInput(key); 
            return;
        }
    }
    async function onEnter(){
        if(currWord === wordOfTheDay){
            setCompletedWords([...completedWords,currWord]);
            setGameStatus(GameStatus.Won);
            return;
        }
        if(turn === 6){
            setCompletedWords([...completedWords,currWord]);
            setGameStatus(GameStatus.Lost);
            return;
        }
        const validWord = (await isValidWord(currWord));
        console.log( validWord );
        if(currWord.length === 5 && !validWord ){
            console.log(" maliiiiisimooooooo");
            alert('Ups! No es una palabra válida!😅');
        }
        setCompletedWords([...completedWords,currWord]);
        setTurn(turn+1);
        setCurrWord('');
    } 
    function onInput( letter:string ){
        const newWord = currWord + letter;
        setCurrWord(newWord);
    }
    function onDelete(){
        const newWord = currWord.slice(0,-1);
        setCurrWord(newWord);
    }

    return (
        <>
        {   gameStatus === GameStatus.Won ?
            (<Modal type='won' 
                completedWords={completedWords}
                solution={wordOfTheDay}/>) 
            : gameStatus === GameStatus.Lost ?
            (<Modal type='lost' 
                completedWords={completedWords}
                solution={wordOfTheDay}/>) 
            : null  }

        <div className={styles.mainContainer}>
            { completedWords.map( (word, i)=>(
                    <RowCompleted key={i} word={word} solution={wordOfTheDay}/>
                ))}
            { gameStatus === GameStatus.Playing ? (
                    <RowCurrent word={currWord}  /> 
                ):null }
            { Array.from( Array(6 - turn) ).map( (_,i)=>(
                    <RowEmpty key={i} />
                ))}
        </div>
            <Keyboard keys={keys} onKeyPressed={onKeyPressed}/>
        </>
    );
}