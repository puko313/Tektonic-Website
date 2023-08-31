import styles from './style.module.scss'

export const Label = ({name}: {name: string}) => {
    return (
        <div className={styles.LabelComponent}>
            <span>
                {name}
            </span>
        </div>
    )
}