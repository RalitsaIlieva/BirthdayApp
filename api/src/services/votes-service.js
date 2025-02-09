const getVotes = (votesData) => async () => {
    const result = await votesData.getAllVotes();

    if (!result[0]) {
        return null;
    }
    return result;
};

const getFinishedVotes = (votesData) => async (userId) => {
    const result = await votesData.getFinishedVotes(userId);
    if (!result[0]) {
        return null;
    }
    return result;
};

const getVotesParticipants = (votesData) => async (voteId) => {
    const result = await votesData.getVotesParticipants(voteId);
    if (!result[0]) {
        return null;
    }
    return result;
};

const postVote = (votesData) => async (userId, employeeId, year) => {
    if (await votesData.getBy(employeeId, year)) {
        return { message: 'Гласуването за този рожден ден на този рожденик вече е създадено' };
    }
    else if (await votesData.isVoteFinished(employeeId, year)) {
        return { message: 'Гласуването за този рожден ден на този рожденик е приключило' };
    } else {
        const data = await votesData.postNewVote(userId, employeeId, year);

        return await data;
    }
};

const postVoteForGift = (votesData) => async (voteId, userId, giftId) => {
    const userVotedOrNot = await votesData.userVotedOrNot(voteId, userId);
    if (userVotedOrNot.has_voted) {
        return { message: 'Вече сте гласували' };
    } else {
        const data = await votesData.postNewVoteForGift(voteId, userId, giftId);
        return await data;
    }
};

const terminateVote = (votesData) => async (voteId) => {

    const data = await votesData.terminateVote(voteId);

    return await data;
};

export default {
    getVotes,
    getFinishedVotes,
    postVote,
    postVoteForGift,
    terminateVote,
    getVotesParticipants
};