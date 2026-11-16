import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
import {SETTINGS} from "./settings/config";
import {app} from "./setup-app";
import {runDb} from "./db/mongo.db";

const startApp = async () => {
    await runDb()
    app.listen(SETTINGS.PORT, () => {
        console.log(`SERVER WAS STARTED ON ${SETTINGS.PORT}`)
    })
}
startApp()
