import { Record } from "../../utils/types";
import connection_promise from "../connection"


// A function to fetch all records from the database
async function updateRecord(record: Record) {
    const conn = await connection_promise;
    await conn.execute('UPDATE records SET account_id = ?, value = ?, datetime = ?, category = ?, comment = ? WHERE id = ?;', [
        record.account_id,
        record.value,
        new Date(record.datetime),
        record.category,
        record.comment,
        record.id
    ]);
}
export default defineEventHandler(async (e) => {
    let json = JSON.parse(e.node.req.read());
    console.log(json.record);
    await updateRecord(json.record);
    return "OK"
})