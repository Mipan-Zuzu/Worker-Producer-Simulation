import "dotenv/config"
import { notificationQueue } from "./queue.js"

const date = new Date().getTime()
const newDate = new Date(date).toLocaleString("id-ID", {timeZone: "Asia/Makassar"})

const main = async() => {
    const job = await notificationQueue.add("notification-queue", {
        id: "1",
        from : "admin",
        message : "Selesaikan pembayaran anda",
        date : newDate
    })
    console.log("job masuk antrean/queue", job.id)
    await notificationQueue.close()
}

main().catch(console.error)