import "dotenv/config"
import { Queue } from "bullmq"
import { Redis } from "ioredis"

const REDIS_KEY = process.env.REDIS_TCP

if (!REDIS_KEY) {
    throw new Error("is empty contection string")
}

const connection = new Redis(REDIS_KEY, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false
})

export const reportQueue = new Queue("report-queue", {
    connection
})