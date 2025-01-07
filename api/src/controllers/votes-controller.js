import express from 'express';
import votesService from '../services/votes-service.js';
// import { validator } from '../validators/validatorMiddleware.js';
// import createUserSchema from '../validators/schemas/createUserSchema.js';
import votesData from '../data/votes-data.js';
import createToken from './../auth/create-token.js';
import { authMiddleware } from '../auth/auth-middleware.js';

const votesController = express.Router();

votesController
    .get('/', authMiddleware, async (req, res) => {
        const votes = await votesService.getVotes(votesData)();
        if (!votes) {
            return res.status(404).send([]);
        }

        res.status(200).send(votes);
    })
    .post(
        '/',
        authMiddleware,
        async (req, res) => {
            const userId = req.body.user.id;
            const employeeId = req.body.employeeId.id;
            const year = req.body.year;

            const vote = await votesService.postVote(votesData)(
                userId,
                employeeId,
                year
            );
            if (vote.message) {
                return res.status(404).send(vote.message);
            }
            return res.status(201).send(vote);
        },
    )
    .post(
        '/votes',
        authMiddleware,
        async (req, res) => {
            const userId = req.body.user.id;
            const giftId = req.body.giftId;
            const voteId = req.body.voteId;

            const vote = await votesService.postVoteForGift(votesData)(
                voteId,
                userId,
                giftId,
            );

            if (vote.message) {
                return res.status(404).send(vote.message);
            }
            return res.status(201).send(vote);
        },
    )
    .post(
        '/:id',
        authMiddleware,
        async (req, res) => {
            const voteId = req.params.id;
console.log(voteId)
            const vote = await votesService.terminateVote(votesData)(voteId);

            if (vote.message) {
                return res.status(404).send(vote.message);
            }
            return res.status(201).send(vote);
        },
    );

export default votesController;
