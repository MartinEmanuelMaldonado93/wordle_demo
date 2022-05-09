import RowCompleted from "./rowComplete";
import RowEmpty from "./rowEmpty";
import RowCurrent from './rowCurrent';
import { useEffect, useState } from "react";
import { GameStatus } from "./types";
import { useWindows } from "../hooks/useWindows";
import styles from './row.module.scss';
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

    useWindows('keydown',handleKeyDown);
    useEffect( () =>{
        setWordOfTheDay('sabio');
    });

    function handleKeyDown( event: KeyboardEvent ) {
        const letter = event.key.toUpperCase();
        if(event.key==='Backspace' 
            && currWord.length > 0) { 
            onDelete();   
            return;
        }
        if(event.key === 'Enter' && currWord.length === 5){  
            onEnter();
            return;
        }
        if(currWord.length >= 5) 
            return; 
        if(keys.includes(letter)){
            onInput(letter); 
            return;
        }
    }
    function onEnter(){
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
        { completedWords.map( (word, i)=>(
                <RowCompleted word={word} solution={wordOfTheDay}/>
            ))}
        { gameStatus === GameStatus.Won ? null : (
                <RowCurrent word={currWord}  /> 
            )}
        { Array.from( Array(6 - turn) ).map( (_,i)=>(
                <RowEmpty key={i} />
            ))}   
    </>
    );
}