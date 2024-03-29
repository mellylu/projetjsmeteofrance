import React from 'react';
import styles from './index.module.scss';
import { timeDayChoice } from '@/utils/timeDayChoice';

export default function TimeDayButton(props:
    {
        timeDaySelected: { apresMidi: boolean, matin: boolean, nuit: boolean, soiree: boolean, selected: string }
        setTimeDaySelected: any
        daySelected: string
        temps: any
    }) {

    return (
        <div className={styles.timeDayButton}>
            <div className={styles.daySelected}>
                {props.daySelected}
            </div>
            <div className={styles.timeDay}>
                {props.timeDaySelected.nuit &&
                    <button className={props.timeDaySelected.selected === 'nuit' ? `${styles.selected}` : ''} onClick={() => props.setTimeDaySelected({ ...props.timeDaySelected, selected: 'nuit' })}>
                        Nuit
                    </button>
                }
                {props.timeDaySelected.matin &&
                    <button
                        className={props.timeDaySelected.selected === 'matin' ? `${styles.selected}` : ''} onClick={() => props.setTimeDaySelected({ ...props.timeDaySelected, selected: 'matin' })}>
                        Matin
                    </button>
                }
                {props.timeDaySelected.apresMidi &&
                    <button
                        className={props.timeDaySelected.selected === 'apresMidi' ? `${styles.selected}` : ''} onClick={() => props.setTimeDaySelected({ ...props.timeDaySelected, selected: 'apresMidi' })}>
                        Après-midi
                    </button>
                }
                {props.timeDaySelected.soiree &&
                    <button
                        className={props.timeDaySelected.selected === 'soiree' ? `${styles.selected}` : ''} onClick={() => props.setTimeDaySelected({ ...props.timeDaySelected, selected: 'soiree' })}>
                        Soirée
                    </button>
                }
            </div>
        </div>
    );
};