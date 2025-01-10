import express from 'express';
import votesService from '../services/votes-service.js';
import votesData from '../data/votes-data.js';
import createToken from './../auth/create-token.js';
import { authMiddleware } from '../auth/auth-middleware.js';

const votesController = express.Router();

votesController
    .get('/', authMiddleware, async (req, res) => {
        const finished = req.query.finished;
        if (finished === 'true') {
            const userId = req.user.id;
            const votes = await votesService.getFinishedVotes(votesData)(userId);

            if (!votes) {
                return res.status(404).send([]);
            }

            res.status(200).send(votes);
        }
        else {
            const votes = await votesService.getVotes(votesData)();
            if (!votes) {
                return res.status(404).send([]);
            }

            res.status(200).send(votes);
        }
    })
    .get('/:id', authMiddleware, async (req, res) => {
        const voteId = req.params.id;
        const votes = await votesService.getVotesParticipants(votesData)(voteId);

        if (!votes) {
            return res.status(404).send({ message: 'Няма детайли за това гласуване' });
        }
        else {
            res.status(200).send(votes);
        }
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
                return res.status(400).send({ message: vote.message });
            } else {
                return res.status(201).send(vote);
            }
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
            const vote = await votesService.terminateVote(votesData)(voteId);

            if (vote.message) {
                return res.status(404).send(vote.message);
            }
            return res.status(201).send(vote);
        },
    );

export default votesController;
