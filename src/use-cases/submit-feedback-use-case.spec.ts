import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const espiaoCreateFeedback = jest.fn();
const espiaoSendMail = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: espiaoCreateFeedback },
    { sendMail: espiaoSendMail }
)

describe('Submit Feedback', () => {
    it('deve ser capaz de enviar um feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'comentário de exemplo',
            screenshot: 'data:image/png;base64,46484894d89s4a98d4sa8974'
        })).resolves.not.toThrow();

        expect(espiaoCreateFeedback).toHaveBeenCalled();
        expect(espiaoSendMail).toHaveBeenCalled();
    });

    it('não deveria ser possível enviar um feedback sem um tipo', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'comentário de exemplo',
            screenshot: 'data:image/png;base64,46484894d89s4a98d4sa8974'
        })).rejects.toThrow();
    });

    it('não deveria ser possível enviar um feedback sem um comentário', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,46484894d89s4a98d4sa8974'
        })).rejects.toThrow();
    });

    it('não deveria ser possível enviar um feedback com uma captura de tela invalida', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'comentário de exemplo',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    });
});