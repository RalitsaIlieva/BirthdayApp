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
SELECT 
    v.id AS vote_id,
    v.year AS vote_year,
    e.name AS birthday_employee_name,
    (SELECT g.name
     FROM Gifts g
     JOIN Votes_Participants vp ON vp.voted_for_gift_id = g.id
     WHERE vp.vote_id = v.id
     GROUP BY g.id
     ORDER BY COUNT(vp.id) DESC
     LIMIT 1) AS winning_gift
FROM 
    Votes v
    LEFT JOIN employees e ON v.birthday_employee_id = e.id
WHERE 
    v.is_active = 0
    AND  v.birthday_employee_id != ?
    ORDER BY 
    e.name ASC,     
    v.year ASC; 
  `;

  const result = await pool.query(sql, [userId]);

  return result;
}

const getVotesParticipants = async (voteId) => {
  const sql = `SELECT 
    e.id AS employee_id,
    e.name AS employee_name,
    vp.vote_id AS vote_status,
    g.name AS gift_name
FROM 
    Employees e
LEFT JOIN 
    Votes_Participants vp ON e.id = vp.employee_id AND vp.vote_id = ?
LEFT JOIN 
    gifts AS g ON vp.voted_for_gift_id = g.id
WHERE 
   ( vp.vote_id = ? OR vp.vote_id IS NULL) AND e.id NOT IN (SELECT v1.birthday_employee_id FROM votes AS v1 WHERE v1.id = ?)
	ORDER BY e.name ASC;
  `
  const result = await pool.query(sql, [voteId, voteId, voteId]);

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

const userVotedOrNot = async (voteId, userId) => {
  const sql = `
      SELECT 
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM votes_participants
            WHERE vote_id = ?
            AND employee_id = ?
            AND voted_for_gift_id IS NOT NULL
        ) THEN True
        ELSE False
    END AS has_voted;
      `;

  const result = await pool.query(sql, [voteId, userId]);

  return result[0];
};

export default {
  getAllVotes,
  getFinishedVotes,
  getBy,
  postNewVote,
  isVoteFinished,
  postNewVoteForGift,
  terminateVote,
  getVotesParticipants,
  userVotedOrNot,
};