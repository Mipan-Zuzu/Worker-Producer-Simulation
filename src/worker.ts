import "dotenv/config"
import { Worker } from "bullmq"
import { Redis } from "ioredis"

const redisUrl = process.env.REDIS_TCP

if (!redisUrl) {
    throw new Error("Filed to connect redis check ENV first")
}

const connection = new Redis(redisUrl, {       maxRetriesPerRequest: null,
}) 

connection.on("connect", () => {
    console.log("redis mulai di hubungkan")
})
connection.on("ready", () => {
    console.log("redis siap di gunakan")
})
connection.on("error", () => {
    console.log("redis gagal di hubungkan")
})

const worker = new Worker("email-queue", async (job) => {
    console.log("memproses job", job.name)
    console.log("Data job", job.data)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Invoice selesai di proses", job.data.orderId)
},
    {connection},
)
494
worker.on("completed", (job) => {
    console.log("job selesai", job.id)
})

worker.on("failed", (job, error) => {
    console.log("Job gagal", job?.id, error.message)
})