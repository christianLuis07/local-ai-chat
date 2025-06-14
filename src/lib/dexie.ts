import Dexie, { Table } from 'dexie';

// deklarasi table
interface DEX_Thread {
    id: string; 
    title: string;
    created_at: Date;
    updated_at: Date;
}

interface DEX_Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    thought: string;
    created_at: Date;
    thread_id: string;
}

class ChatDB extends Dexie {
    threads!: Table<DEX_Thread>;
    messages!: Table<DEX_Message>;

    constructor() {
        super("chatdb");

        this.version(1).stores({
            threads: "id, title, created_at, updated_at",
            messages: "id, role, content, created_at, thread_id, thought"
        })

        this.threads.hook("creating", (_, obj) => {
            obj.created_at = new Date();
            obj.updated_at = new Date();
        });

        this.messages.hook("creating", (_, obj) => {
            obj.created_at = new Date();
        })
    }

    async createThread(title: string) {
        const id = crypto.randomUUID();

        await this.threads.add({
            id,
            title,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return id;
    }

    async getAllThreads() {
        return this.threads.reverse().sortBy("updated_at");
    }

    async createMessage(message: Pick<DEX_Message, "content" | "role" | "thread_id" | "thought">) 
    {
        const messageId = crypto.randomUUID();

        await this.transaction("rw", [this.threads, this.messages], async () => {
            await this.messages.add({
                ...message,
                // content: message.content,
                // role: message.role,
                // thread_id: message.thread_id,
                // thought: message.thought,
                id: messageId,
                created_at: new Date(),
            })
            await this.threads.update(message.thread_id, {
                updated_at: new Date(),
            });
        });
        return messageId;
    }

    async getMessagesForThread(threadId: string) {
        return this.messages.where("thread_id").equals(threadId).sortBy("created_at");
    }
}

export const db = new ChatDB();