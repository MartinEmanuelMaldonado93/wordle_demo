import Box from './box';
import styles from './row.module.scss';
const amountRows = 5;

export default function RowEmpty() {
    return (
        <div className={styles.row}> {
            Array.from(Array(amountRows)).map( (_ ,i)=>
                <Box key={i} value='' status='empty'/> )
        } </div> 
    );
}
