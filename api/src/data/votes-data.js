import pool from './pool.js';

const getAllVotes = async () => {
  const sql = `
      SELECT *
      FROM votes
      `;
  const result = await pool.query(sql);

  return result;
};

const getFinishedVotes = async (userId) => {
  const sql = `
  SELECT vp.*, v.year, g.name AS gift_name, e.name AS voter_name, birthday_e.name AS birthday_employee_name
FROM votes_participants vp
LEFT JOIN votes v ON vp.vote_id = v.id
LEFT JOIN gifts g ON vp.voted_for_gift_id = g.id
LEFT JOIN employees e ON vp.employee_id = e.id
LEFT JOIN employees birthday_e ON v.birthday_employee_id = birthday_e.id
WHERE v.birthday_employee_id != ? AND v.is_active = 0;
  `;

  const result = await pool.query(sql, [userId]);

  return result;
}
const getBy = async (employeeId, year) => {
  const sql = `
      SELECT *
      FROM votes
      WHERE birthday_employee_id = ? AND year = ? and is_active = 1
      `;

  const result = await pool.query(sql, [employeeId, year]);

  return result[0];
};

const isVoteFinished = async (employeeId, year) => {
  const sql = `
      SELECT EXISTS (
    SELECT 1
    FROM votes
    WHERE birthday_employee_id= ? AND year= ? 
) AS record_exists;
      `;

  const result = await pool.query(sql, [employeeId, year]);

  return result[0].record_exists;
};
const postNewVote = async (userId, employeeId, year) => {
  const sql = `
      INSERT votes (created_by_employeeId, birthday_employee_id, year, is_active)
      VALUES (?, ?, ?, 1);
      `;

  const result = await pool.query(sql, [userId, employeeId, year]);

  return result;
}

const postNewVoteForGift = async (voteId, userId, giftId) => {
  const sql = `
      INSERT votes_participants (vote_id, employee_id, voted_for_gift_id)
      VALUES (?, ?, ?);
      `;

  const result = await pool.query(sql, [voteId, userId, giftId]);

  return result;
}
const terminateVote = async (voteId) => {
  const sql = `
      UPDATE votes
      SET is_active = 0
      WHERE id = ?;
      `;

  const result = await pool.query(sql, [voteId]);

  return result;
}
export default {
  getAllVotes,
  getFinishedVotes,
  getBy,
  postNewVote,
  isVoteFinished,
  postNewVoteForGift,
  terminateVote
};