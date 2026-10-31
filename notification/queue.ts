import "dotenv/config"
import { Queue } from "bullmq"
import { Redis } from "ioredis"

const redis_credential = process.env.REDIS_TCP

if (!redis_credential) {
    throw new Error("redis credential was empty")
}

const connection = new Redis(redis_credential, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false
})

export const notificationQueue = new Queue("notification-queuq", {
    connection
})