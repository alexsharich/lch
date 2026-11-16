import {emailAdapter} from "../auth/adapters/email.adapter";

export const emailManager = {
    async sendEmailConfirmationMessage(email: any, code: string) {
        await emailAdapter.sendEmail(email, 'Email Confirmation', 'Передать код', code)
    },
    async resendEmail(email: string, subject: string, message: string, code?: string) {
        await emailAdapter.sendEmail(email, subject, message, code)
    },
}