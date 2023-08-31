import styles from './style.module.scss'

const ToolBarPieces = ({ wings, activeWingIndex, setActiveWingIndex }) => {
    return (
        <div className={styles.ToolbarComponent}>
            <span className={styles.toolbarTitle}>
                Tectonic types
            </span>
            {wings.map((wing, idx) =>
                <div
                  className={idx == activeWingIndex ? styles.activeTectonicType : styles.tectonicTypes}
                  onClick={() => setActiveWingIndex(idx)}
                  key={idx}
                >
                    <img src={wing.preview} alt="tectonic image" />
                    <span className={styles.tectonicName}>{ wing.name }</span>
                </div>
            )}
        </div>
    )
}


export default ToolBarPieces;
