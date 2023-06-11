import { RowDataPacket } from "mysql2"
export interface Record extends RowDataPacket {
    id: number,
    account_id: number,
    value: number,
    datetime: string,
    category: string,
    comment: string
}
export interface Account extends RowDataPacket {
    id: number,
    name: string,
    comment: string
}