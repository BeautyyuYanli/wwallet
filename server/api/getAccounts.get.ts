import { Account } from "../../utils/types";
import connection_promise from "../connection"

async function getAccounts(): Promise<Account[]> {
    const conn = await connection_promise;
    const [rows] = await conn.query<Account[]>('SELECT * FROM Accounts');
    return rows;
}
export default defineEventHandler(async (e) => {
    return JSON.stringify(await getAccounts());
})