import { Account } from "../../utils/types";
import connection_promise from "../connection"


async function addAccount(account: Account) {
    const conn = await connection_promise;
    await conn.execute('INSERT INTO Accounts (name, comment) VALUES (?,?);', [
        account.name,
        account.comment
    ]);
}
export default defineEventHandler(async (e) => {
    let json = JSON.parse(e.node.req.read());
    await addAccount(json.account);
    return "OK"
})