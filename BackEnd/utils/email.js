const nodemailer = require("nodemailer");

class Email {
	constructor(message, to = {}) {
		this._to = to;
		this._message = message;
	}

	async sendMail() {
		if (process.env.NODE_ENV === "production") {
			// Sendgrid
			return nodemailer
				.createTransport({
					service: "SendGrid",
					auth: {
						user: process.env.SENDGRID_USERNAME,
						pass: process.env.SENDGRID_PASSWORD,
					},
				})
				.sendMail({
					from: "<hello@comicstash.com>",
					to: this._to.to,
					subject: this._message,
					text: `You password reset url is ${this._to.url}`,
				});
		}

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
