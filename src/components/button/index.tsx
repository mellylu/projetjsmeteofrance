import React from "react"
import { Button } from "@chakra-ui/react"
import styles from "./index.module.scss"

const Index = (props: { onClick: any; title?: string; className?: any; children?: any }) => {
    return (
        <button className={`${styles.button} ${props.className}`} onClick={props.onClick}>
            {props.title}{props.children}
        </button>
    )
}

export default Index
