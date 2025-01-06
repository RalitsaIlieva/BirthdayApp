const getVotes = (votesData) => async () => {
    const result = await votesData.getAllVotes();

    if (!result[0]) {
        return null;
    }
    return result;
};

const isVoteFinished = (votesData) => async (employeeId, year) => {
    const result = await votesData.getVoteExist(employeeId, year);

    if (!result[0]) {
        return null;
    }
    return result;
}
const postVote = (votesData) => async (userId, employeeId, year) => {
    if (await votesData.getBy(employeeId, year)) {
        return { message: 'Гласуването за този рожден ден на този рожденик вече е създадено' };
    }
    if (await votesData.isVoteFinished(employeeId, year)) {
        return { message: 'Гласуването за този рожден ден на този рожденик е приключило' };
    }
    const data = await votesData.postNewVote(userId, employeeId, year);

    return await data;
};

export default {
    getVotes,
    postVote,
};