import express from 'express';
import { NodemailerMailInteraction } from './interactions/nodemailer/nodemailer-mail-interaction';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;


    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailInteraction = new NodemailerMailInteraction()


    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailInteraction
    )
    
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();
})