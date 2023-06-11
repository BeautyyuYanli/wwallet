import connection_promise from "../connection"


// A function to fetch all records from the database
async function deleteRecord(id: number) {
    const conn = await connection_promise;
    await conn.execute('DELETE FROM Records WHERE id=?;', [id]);
}
export default defineEventHandler(async (e) => {
    let json = JSON.parse(e.node.req.read())
    await deleteRecord(json.id);
})