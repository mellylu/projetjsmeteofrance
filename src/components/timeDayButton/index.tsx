import React from 'react';
import styles from './index.module.scss';

export default function TimeDayButton(props:
    {
        matin?: any
        apresMidi?: any
        soiree?: any
        nuit?: any
        daySelected: any
    }) {



    return (
        <div className={styles.timeDayButton}>
            <div className={styles.daySelected}>
                {props.daySelected}
            </div>
            <div className={styles.timeDay}>
                <button className={styles.selected}>
                    Matin
                </button>
                <button>
                    Après-midi
                </button>
                <button>
                    Soirée
                </button>
                <button>
                    Nuit
                </button>
            </div>
        </div>
    );
};