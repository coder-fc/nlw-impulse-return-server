import { MailInteraction } from "../interactions/mail-interaction";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
   type: string;
   comment: string;
   screenshot?: string; 
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailInteraction: MailInteraction
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('É necessário que tenha um tipo de feedback.')
        }

        if (!comment) {
            throw new Error('É necessário que tenha um comentário no feedback.')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Formato de captura de tela invalida.')
        }   
        
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })
        await this.mailInteraction.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : ``,
                `</div>`
            ].join('\n')
        })
    }
}