import {Db, MongoClient} from "mongodb";
import {initCollections} from "./db/collections";
import {SETTINGS} from "./settings/config";

export let client: MongoClient;

export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    initCollections(db);
    try {
        await client.connect();
        await db.command({ping: 1});
        console.log('✅ Connected to the database');
    } catch (e) {
        await client.close();
        throw new Error(`❌ Database is not connected: ${e}`);
    }
}

export async function stopDb() {
    if (!client) {
        throw new Error(`❌ No active client`);
    }
    await client.close();
}
