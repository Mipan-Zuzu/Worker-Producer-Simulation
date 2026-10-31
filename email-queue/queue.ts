import "dotenv/config"
import {Queue} from "bullmq"
import {Redis} from "ioredis"

const redis_tcp = process.env.REDIS_TCP

if (!redis_tcp) {
    throw new Error("Failed to connect redis check env first")
}

const connection = new Redis(redis_tcp, {
     maxRetriesPerRequest: null,
})

export const emailQueue = new Queue("email-queue", {
    connection
})