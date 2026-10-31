import "dotenv/config"
import { reportQueue } from "./queue.js"

const date = new Date().getDate()

const main = async() => {
    const job = await reportQueue.add("report-queue", {
        id : "1",
        date : date,
        status_system : "health",
        uptime_system : "240000",
        monitoring : ["supabase", "koyeb", "upstash"]
    })
    console.log("job masuk queue", job.id)
    await reportQueue.close()
}

main().catch(console.error)

