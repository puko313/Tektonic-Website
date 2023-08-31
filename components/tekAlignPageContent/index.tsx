
import Image from 'components/image'
import { Input } from 'components/input'
import { Label } from 'components/label'
import { StlFileUploader } from 'components/StlFileUploader'
import { useState } from 'react'
import styles from './style.module.scss'

export const TekAlignPageContent = () => {
    const [operator, setOperator] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    
    return (
        <div className={styles.TekContent}>
            <div className={styles.ColumnContent}>
                <Label name={'Lab information'}/>
                <Input inputName='Operator:' state={operator} setState={setOperator}/>
                <Label name={'Patient information'}/>
                <Input inputName='Last Name:' state={lastName} setState={setLastName}/>
                <Input inputName='First Name:' state={firstName} setState={setFirstName}/>
                <Label name={'Scans'}/>
                <div>
                    <div className={styles.TekAlignSceneComponent}>
                        <span className={styles.TekAlignSceneComponentTitle}>
                            UPPER
                        </span>
                    </div>
                    <StlFileUploader />
                </div>

                <div>
                    <div className={styles.TekAlignSceneComponent}>
                        <span className={styles.TekAlignSceneComponentTitle}>
                            LOWER
                        </span>
                    </div>
                    <StlFileUploader />
                </div>

                <div>
                    <div className={styles.TekAlignSceneComponent}>
                        <span className={styles.TekAlignSceneComponentTitle}>
                            BITE
                        </span>
                    </div>
                    <StlFileUploader />
                </div>
                
            </div>
            <div className={styles.ColumnContent}>
                <Label name={'Product Type'}/>
                <img src='/assets/implant.png' height={450} width={450}/>
            </div>
        </div>
    )
}