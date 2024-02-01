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