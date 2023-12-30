import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.scss"; // Assurez-vous que le chemin est correct

const Logo = (props: { image: any }) => {
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





// import React from "react"
// import Image from "next/image"
// import { useRouter } from "next/router"

// const Logo = (props: { image: any }) => {

//     const router = useRouter()

//     return (
//         <button
//             onClick={() => {
//                 router.push("/")
//             }}
//             style={{ width: 90, height: 90 }}
//         >
//             <Image
//                 src={props.image}
//                 alt="logo"
//                 style={{ width: 90, height: 90, padding: "5%" }}

//             />
//         </button>
//     )
// }

// export default Logo
