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

const getAllEmployees = async (value) => {
    const sql = `SELECT e.id, e.username, e.name, e.date_of_birth
FROM employees e
LEFT JOIN votes v ON e.id = v.birthday_employee_id AND v.is_active = 1
WHERE e.username != ?
AND NOT EXISTS (
    SELECT 1
    FROM votes v2
    WHERE v2.birthday_employee_id = e.id AND v2.is_active = 1
    )
`;
    const result = await pool.query(sql, [value]);

    return result;
};

const getEmployeesWithActiveVotes = async (value) => {
    const sql = `SELECT e.name, e.date_of_birth, v.year, v.id
FROM employees e
LEFT JOIN votes v ON e.id = v.birthday_employee_id
WHERE e.username != ?
AND v.is_active = 1;`

    const result = await pool.query(sql, [value]);

    return result;
}

const getEmployeesByAuthorId = async (username, authorId) => {
    const sql = `SELECT e.name, e.date_of_birth, v.year, v.id
FROM employees e
LEFT JOIN votes v ON e.id = v.birthday_employee_id
WHERE e.username != ? AND v.created_by_employeeId= ?
AND v.is_active = 1;`

    const result = await pool.query(sql, [username, authorId]);

    return result;
}

export default {
    getBy,
    getUserPassword,
    getAllEmployees,
    getEmployeesWithActiveVotes,
    getEmployeesByAuthorId
};
