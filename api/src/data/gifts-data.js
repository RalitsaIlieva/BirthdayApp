import pool from './pool.js';

const getAllGifts = async () => {
    const sql =`SELECT Id, NAME FROM gifts;`

    const result = await pool.query(sql);

    return result;
}

export default {
    getAllGifts
};