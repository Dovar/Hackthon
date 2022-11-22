import { LogModel } from "./models/Log"

export class Log {
    add = async (action : string) => {
        try {
            const date = await getDate()
    
            const newLog = {
                action: action,
                date: date
            }
            await LogModel.create(newLog)
        } catch (error) {
            const date = await getDate()
            const newLog = {
                action: 'error',
                date: date
            }
            await LogModel.create(newLog)
        }
    }
}
const getDate = async () => {
    const current = new Date()
    const cDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`
    const dateTime = `${cDate} ${cTime}`
    
    return dateTime
}
