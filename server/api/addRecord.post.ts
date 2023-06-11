import { Record } from "../../utils/types";
import connection_promise from "../connection"


async function addRecord(record: Record) {
    const conn = await connection_promise;
    await conn.execute('INSERT INTO records (account_id, value, datetime, category, comment) VALUES (?, ?, ?, ?, ?);', [
        record.account_id,
        record.value,
        new Date(record.datetime),
        record.category,
        record.comment
    ]);
}
export default defineEventHandler(async (e) => {
    let json = JSON.parse(e.node.req.read());
    await addRecord({
        ...json.record,
        id: -1
    });
    return "OK"
})