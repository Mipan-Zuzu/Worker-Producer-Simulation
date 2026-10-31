import "dotenv/config"
import { Worker } from "bullmq"
import { Redis } from "ioredis"

const REDIS_KEY = process.env.REDIS_TCP

if(!REDIS_KEY) {
    throw new Error("empty conection string")
}

const connection = new Redis(REDIS_KEY, {
    maxRetriesPerRequest : null
})


//* Proses redis connection
connection.on("connect", () => {
    console.log("redis mulai di hubungkan")
})

connection.on("ready", () => {
    console.log("redis siap di gunakan")
})

connection.on("error", () => {
    console.log("redis gagal di hubungkan")
})


//* Worker proses
const worker = new Worker("report-queue", async(job) => {
    console.log(`Memproses job ${job.id}`)
    console.log(`Data job ${job.data}`)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(`Report selesai di proses ${job.data.id}`)
},
    {connection},
)

worker.on("completed", (job) => {
    console.log(`job done ${job.id}`)
})

worker.on("failed", (job, error) => {
    console.log(`job error ${job?.id} ${error.message}`)
})