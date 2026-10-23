import "dotenv/config"
import { emailQueue } from "./queue.js";

const main = async () => {
    const job = await emailQueue.add("send-invoice", {
        email : "mipanzuzu@gmail.com",
        orderId : "order:10"
    })

    console.log("job masuk queue", job.id)
    await emailQueue.close()
}

main().catch(console.error)