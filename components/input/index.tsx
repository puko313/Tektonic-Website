import { ChangeEventHandler } from 'react'
import styles from './style.module.scss'

export const Input = ({inputName, state, setState}) => {
    return (
        <div className={styles.InputComponent}>
            <span className={styles.InputName}> {inputName} </span>
            <input value={state} onChange={(e) => setState(e.target.value)} />
        </div>
    )
}