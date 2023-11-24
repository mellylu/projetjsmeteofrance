import React from "react"

export const chooseDate = () => {
    let today = new Date()
    let objDate: { [key: string]: string } = {}

    for (let i = 0; i <= 5; i++) {
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i)

        let dateString =
            currentDate.getFullYear().toString() +
            "-" +
            (currentDate.getMonth() + 1).toString().padStart(2, "0") +
            "-" +
            currentDate.getDate().toString().padStart(2, "0")

        objDate[`datePlus${i}`] = dateString
    }

    return objDate
}

// export const chooseDate = () => {
//     let today = new Date()
//     today.setDate(today.getDate())
//     let dateAujourdhui =
//         today.getFullYear().toString() +
//         "-" +
//         (today.getMonth() + 1).toString().padStart(2, "0").toString() +
//         "-" +
//         today.getDate().toString().padStart(2, "0").toString()

//     today.setDate(today.getDate() + 1)
//     let dateDemain =
//         today.getFullYear().toString() +
//         "-" +
//         (today.getMonth() + 1).toString().padStart(2, "0").toString() +
//         "-" +
//         today.getDate().toString().padStart(2, "0").toString()
//     today.setDate(today.getDate() + 1)
//     let datePlus2 =
//         today.getFullYear().toString() +
//         "-" +
//         (today.getMonth() + 1).toString().padStart(2, "0").toString() +
//         "-" +
//         today.getDate().toString().padStart(2, "0").toString()
//     today.setDate(today.getDate() + 1)
//     let datePlus3 =
//         today.getFullYear().toString() +
//         "-" +
//         (today.getMonth() + 1).toString().padStart(2, "0").toString() +
//         "-" +
//         today.getDate().toString().padStart(2, "0").toString()

//     today.setDate(today.getDate() + 1)
//     let datePlus4 =
//         today.getFullYear().toString() +
//         "-" +
//         (today.getMonth() + 1).toString().padStart(2, "0").toString() +
//         "-" +
//         today.getDate().toString().padStart(2, "0").toString()
//     today.setDate(today.getDate() + 1)
//     let datePlus5 =
//         today.getFullYear().toString() +
//         "-" +
//         (today.getMonth() + 1).toString().padStart(2, "0").toString() +
//         "-" +
//         today.getDate().toString().padStart(2, "0").toString()
//     today.setDate(today.getDate() + 1)
//     let datePlus6 =
//         today.getFullYear().toString() +
//         "-" +
//         (today.getMonth() + 1).toString().padStart(2, "0").toString() +
//         "-" +
//         today.getDate().toString().padStart(2, "0").toString()
//     let objDate = {
//         dateAujourdhui: dateAujourdhui,
//         dateDemain: dateDemain,
//         datePlus2: datePlus2,
//         datePlus3: datePlus3,
//         datePlus4: datePlus4,
//         datePlus5: datePlus5,
//         datePlus6: datePlus6,
//     }
//     return objDate
// }
