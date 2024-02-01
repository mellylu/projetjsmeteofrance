import React, { ReactNode } from "react"
import styles from "./index.module.scss"

const Index = (props: { onClick: React.MouseEventHandler<HTMLButtonElement>; title?: string; className?: string; children?: ReactNode }) => {
    return (
        <button className={`${styles.button} ${props.className}`} onClick={props.onClick}>
            {props.title}{props.children}
        </button>
    )
}

export default Index
