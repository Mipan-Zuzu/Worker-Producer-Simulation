import "dotenv/config"
import { Worker } from "bullmq"
import { Redis } from "ioredis"

const redis_credential = process.env.REDIS_TCP

if(!redis_credential) {
    throw new Error("empty redis connection")
}

const connection = new Redis(redis_credential, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false
})

connection.on("connect", () => {
    console.log("redis mula di hubungkan")
})

connection.on("ready", () => {
    console.log("redis siap di gunakan")
})

connection.on("error", () => {
    console.log("gagal menghubungkan redis")
})

const worker = new Worker("notification-queue", async(job) => {
    console.log(`memproses job ${job.id}`)
    console.log(`data job ${job.data}`)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(`notification has ben sended ${job.data.id}`)
},
    {connection}
)

worker.on("completed", (job) => {
    console.log(`job done ${job.id}`)
})

worker.on("failed", (job, error) => {
    console.log(`job error ${job?.id} ${error.message}`)
})

