import pool from './pool.js';

const getBy = async (column, value) => {
    const sql = `
        SELECT id, name, username, date_of_birth
        FROM employees 
        WHERE ${column} = ?
    `;
    const result = await pool.query(sql, [value]);

    return result[0];
};

const getUserPassword = async (username) => {
    const sql = ` 
  SELECT password
  FROM employees
  WHERE username = ?
  `;

    const result = await pool.query(sql, [username]);

    return result[0];
};

const getAllEmployees = async (column, value) => {
    const sql = `
      SELECT e.username, e.name, e.date_of_birth
FROM employees e
LEFT JOIN votes v ON e.id = v.birthday_employee_id
WHERE ${column} != ?
AND (v.is_active = 0 OR v.is_active IS NULL);
      `;
    const result = await pool.query(sql, [value]);

    return result;
};

export default {
    getBy,
    getUserPassword,
    getAllEmployees
};
