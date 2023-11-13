const nodemailer = require("nodemailer");
const Brevo = require("@getbrevo/brevo");

class Email {
	constructor(message, to = {}) {
		this._to = to;
		this._message = message;
	}

	async sendMail() {
		if (process.env.NODE_ENV === "production") {
			// Sendgrid -> not working

			await nodemailer
				.createTransport({
					host: "smtp-relay.sendinblue.com",
					port: 587,
					auth: {
						user: process.env.BREVO_EMAIL,
						pass: process.env.BREVO_KEY,
					},
				})
				.sendMail({
					from: "<hello@comicstash.com>",
					to: this._to.to,
					subject: this._message,
					text: `You password reset url is ${this._to.url}`,
				});
		} else
			await nodemailer
				.createTransport({
					host: process.env.EMAIL_HOST,
					port: process.env.EMAIL_PASS,
					auth: {
						user: process.env.EMAIL_USERNAME,
						pass: process.env.EMAIL_PASS,
					},
				})
				.sendMail({
					from: "<hello@comicstash.com>",
					to: this._to.to,
					subject: this._message,
					text: `You password reset url is ${this._to.url}`,
				});
	}
}

module.exports = Email;
