import { BoxStatus } from "./types";
// import { GameStatus } from "./types";
import styles from './box.module.scss';
import classNames from 'classnames/bind';

const classes = classNames.bind(styles);

interface BoxProps {
    value: string;
    status: BoxStatus;
}

export default function Box({value, status}:BoxProps){
    // create an object with only matched status
    const boxStatus = classes({
        correct: status === 'correct',
        present: status === 'present',
        abstent: status === 'abstent',
        empty: status === 'empty',
        edit : status === 'edit'
    });
    console.log(boxStatus);
    return <div className={boxStatus}>{value}</div>;
}