const util = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const { getStorage, ref, uploadBytesResumable } = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");

const { auth } = require("../utils/fireBase");

const User = require("../Models/userModel");
const catchAsync = require("../utils/catchAsync");
const Email = require("../utils/email");
const AppError = require("../utils/appError");

const createToken = function (id) {
	return jwt.sign({ id }, process.env.SECRET_STRING, {
		expiresIn: 60 * 24 * 60 * 60,
	});
};

exports.signUp = catchAsync(async function (req, res, next) {
	const user = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	const token = createToken(user._id);
	res.cookie("jwt", token, {
		maxAge: 60 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	});
	res.status(200).json({
		status: "success",
		message: "User created sucessfully",
		token,
		data: {
			name: user.name,
			email: user.email,
			role: user.role,
		},
	});
});

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png|gif/;
		// Check ext
		const extName = fileTypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		// Check mime
		const mimeType = fileTypes.test(file.mimetype);

		if (mimeType && extName) {
			return cb(null, true);
		}
		cb(new Error("Error: Images Only !!!"), false);
	},
});

exports.uploadImage = upload.single("image");

async function uploadImageFire(file) {
	const storageFB = getStorage();

	await signInWithEmailAndPassword(
		auth,
		process.env.FIREBASE_EMAIL,
		process.env.FIREBASE_PASS
	);

	const fileName = `bookCovers/${file.name}${Date.now()}`;

	const storageRef = ref(storageFB, fileName);
	const metadata = {
		contentType: file.type,
	};

	await uploadBytesResumable(storageRef, file.buffer, metadata);
	return fileName;
}
exports.resizeComicImages = catchAsync(async (req, res, next) => {
	const name = req.file.originalname.split(".")[0].split("/").join("-");
	const img = await sharp(req.file.buffer)
		.resize(300, 450)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toBuffer();

	const file = {
		type: req.file.mimetype,
		buffer: img,
		name: name,
	};

	const buildImage = await uploadImageFire(file);

	req.body.image = buildImage.split("/")[1];

	next();
});

exports.login = catchAsync(async function (req, res, next) {
	const user = await User.findOne({ email: req.body.email }).select(
		"+password"
	);

	if (
		!user ||
		!(await user.comparePasswords(req.body.password, user.password))
	)
		return next(new AppError("Email or Password is incorrect", 401));

	const token = createToken(user.id);

	// res.cookie('hello' , 'hello');
	res.cookie("jwt", token, {
		expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
	});

	res.status(200).send({
		status: "success",
		token,
		data: {
			user: {
				name: user.name,
				email: user.email,
				role: user.role,
			},
		},
	});
});

exports.restricTo = function (...roles) {
	return catchAsync(async function (req, res, next) {
		const x = roles.find((y) => y === req.user.role);
		if (!x)
			return next(
				new AppError(
					"You are not authorized to do so. Only admins and authors have access to this route! 🚫",
					403
				)
			);
		next();
	});
};

exports.protect = catchAsync(async function (req, res, next) {
	let tokenHash;
	// get token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		tokenHash = req.headers.authorization.split(" ")[1];
	} else if (req.cookies && req.cookies.jwt) {
		tokenHash = req.cookies.jwt;
	}

	console.log({ coookies: req.cookies });

	if (!tokenHash)
		return next(new AppError("Please login to get access", 400));

	// promisifying to catch the error
	const { id, iat } = await util.promisify(jwt.verify)(
		tokenHash,
		process.env.SECRET_STRING
	);

	const user = await User.findById(id);

	// valid user or not
	if (!user || user.passwordChangedAt < iat)
		return next(new AppError("Please relogin to get access", 400));

	req.user = user;
	next();
});

exports.forgotpassword = catchAsync(async function (req, res, next) {
	const user = await User.findOne({ email: req.body.email });

	if (!user)
		return next(
			new AppError(
				"Please check your email ! No user found with that email",
				400
			)
		);

	const sec = crypto.randomBytes(32).toString("hex");
	const resetToken = crypto.createHash("sha256").update(sec).digest("hex");

	const url = `http://127.0.0.1:3000/api/v1/users/resetPassword/${sec}`;

	try {
		await new Email(
			"Submit a patch request to the given url , Valid till 10 minutes",
			{
				to: user.email,
				url,
			}
		).sendMail();

		user.passwordResetToken = resetToken;
		user.passwordIsvalidTill = new Date(Date.now() + 10 * 60 * 1000);
		await user.save();
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordIsvalidTill = undefined;
		await user.save();

		next(err);
	}

	res.status(200).json({
		status: "success",
		message: "Token has been sent to your email",
	});
	// const email = new
});

exports.resetPassword = catchAsync(async function (req, res, next) {
	let resetToken = req.params.token;

	resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

	const user = await User.findOne({
		passwordResetToken: resetToken,
		passwordIsvalidTill: { $gt: Date.now() },
	});

	if (!user)
		return next(new AppError("Token Expired , please reset again", 400));

	const token = createToken(user.id);

	res.cookie("jwt", token, {
		expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	});

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordIsvalidTill = undefined;
	await user.save();

	res.status(200).json({
		status: "success",
		token,
		message: "Password reset successfull",
	});
});

// Contact Us

exports.contactUs = catchAsync(async (req, res, next) => {
	const { name, email, message } = req.body;

	try {
		await new Email("From CS contact form", {
			to: process.env.BREVO_EMAIL,
		}).sendMail(`From name: ${name}  email: ${email} message: ${message}`);
	} catch (err) {
		next(err);
	}

	res.status(200).send("hello");
});
