import connection_promise from "../connection"


// A function to fetch all records from the database
async function deleteAccount(id: number) {
    console.log(id);
    const conn = await connection_promise;
    await conn.execute('DELETE FROM Accounts WHERE id=?;', [id]);
}
export default defineEventHandler(async (e) => {
    let json = JSON.parse(e.node.req.read())
    await deleteAccount(json.id);
})