
import DigestClient from "digest-fetch"
import connection_promise from "../connection"
const client = new DigestClient(process.env.CHAT2DATA_USER ?? "", process.env.CHAT2DATA_PASS ?? "");

export default defineEventHandler(async (e) => {
    let json = JSON.parse(e.node.req.read())
    let response = await client.fetch(process.env.CHAT2DATA_URL ?? "", {
        method: "POST",
        body: JSON.stringify({
            cluster_id: process.env.DB_CLASTER_ID,
            database: process.env.DB_DATABASE,
            instruction: json.instruct,
        }),
    })
    const sql = (await response.json()).data.result.sql;
    if (sql == undefined)
        return "Failed to get SQL"
    const conn = await connection_promise;
    const res = await conn.query(sql);
    if (res[0])
        return JSON.stringify(res[0]);
    else
        return "Failed to execute SQL"
})