import Dexie, { Table } from 'dexie';

// deklarasi table
interface DEX_Thread {
    id: string; 
    title: string;
    created_at: Date;
    updated_at: Date;
}

class ChatDB extends Dexie {
    threads!: Table<DEX_Thread>;

    constructor() {
        super("chatdb");

        this.version(1).stores({
            threads: "++id, title, created_at, updated_at",
        })

        this.threads.hook("creating", (_, obj) => {
            obj.created_at = new Date();
            obj.updated_at = new Date();
        })
    }
}

export const db = new ChatDB();