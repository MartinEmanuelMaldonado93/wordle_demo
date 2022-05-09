import Box from './box';
import { BoxStatus } from './types';
import styles from './row.module.scss';

const amountRows = 5;
interface RowCompletedProps{
    word:string,
    solution:string,
}

export default function RowCompleted({word,solution}:RowCompletedProps) {

    function checkLetter(letter:string, pos:number):BoxStatus {
        if( !solution.includes(letter) ) 
            return 'abstent';

        if(solution[pos] === letter) 
            return 'correct';
        
        return 'present'; 
    }

    return <div>
        <div className={styles.row}>
            { Array.from( Array(amountRows) )
                .map( (_ , i) => (
                    <Box key={i} 
                        value={word[i]} 
                        status={ checkLetter(word[i], i) } />
                ))}
        </div>
    </div>;
}
