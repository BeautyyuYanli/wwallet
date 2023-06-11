import { Record } from "../../utils/types";
import connection_promise from "../connection"


// A function to fetch all records from the database
async function getRecords(): Promise<Record[]> {
    const conn = await connection_promise;
    const [rows] = await conn.query<Record[]>('SELECT * FROM Records');
    return rows;
}
export default defineEventHandler(async (e) => {
    return JSON.stringify(await getRecords());
})