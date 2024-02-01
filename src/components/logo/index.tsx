import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.scss"; // Assurez-vous que le chemin est correct
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const Logo = (props: { image: string | StaticImport }) => {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                router.push("/");
            }}
            style={{ minWidth: 50, height: "auto" }}
        >
            <div className={styles.logoContainer}>
                <Image
                    src={props.image}
                    alt="logo"
                    className={styles.logoImage}
                />
            </div>
        </button>
    );
};

export default Logo;
