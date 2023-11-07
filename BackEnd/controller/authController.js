const util = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const { getStorage, ref, uploadBytesResumable } = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");

const { auth } = require("../utils/fireBase");

const User = require("../Models/userModel");
const catchAsync = require("../utils/catchAsync");
const Email = require("../utils/email");

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
		// expires: , // specify Date
		maxAge: 60 * 24 * 60 * 60 * 1000,
		// domain: "http://127.0.0.1:5173/",
		// sameSite: 'none',
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
		cb("Error: Images Only !!!");
	},
});

exports.uploadImage = upload.single("imageComic");

async function uploadImageFire(file) {
	const storageFB = getStorage();

	await signInWithEmailAndPassword(
		auth,
		process.env.FIREBASE_EMAIL,
		process.env.FIREBASE_PASS
	);

	const fileName = `images/${file.name}${Date.now()}`;

	const storageRef = ref(storageFB, fileName);
	const metadata = {
		contentType: file.type,
	};

	await uploadBytesResumable(storageRef, file.buffer, metadata);
	return fileName;
}
exports.resizeComicImages = catchAsync(async (req, res, next) => {
	const name = req.file.originalname.split(".")[0].split("/").join("-");


	const file = {
		type: req.file.mimetype,
		buffer: req.file.buffer,
		name: name,
	};

	const buildImage = await uploadImageFire(file);

	console.log(buildImage);
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
		return next("Email or Password is incorrect");

	const token = createToken(user.id);

	// res.cookie('hello' , 'hello');
	res.cookie("jwt", token, {
		// maxAge: 60 * 24 * 60 * 60 * 1000,
		expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
		// domain: "http://127.0.0.1:5173/",
		// httpOnly: true,
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
		const x = roles.find((y) => {
			console.log(y, req.user.role);
			return y === req.user.role;
		});
		if (!x)
			return next(
				"You are not authorized to do so. Only admins and authors have access to this route! 🚫"
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

	if (!tokenHash) return next("Please login to get access");

	// promisifying to catch the error
	const { id, iat } = await util.promisify(jwt.verify)(
		tokenHash,
		process.env.SECRET_STRING
	);

	const user = await User.findById(id);

	// valid user or not
	if (!user || user.passwordChangedAt < iat) {
		return next("Please relogin to get access");
	}

	req.user = user;
	next();
});

exports.forgotpassword = catchAsync(async function (req, res, next) {
	const user = await User.findOne({ email: req.body.email });

	if (!user)
		return next("Please check your email ! No user found with that email");

	// const sec = user.createPasswordResetToken();
	// await user.save({ validateBeforeSave: false });

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

	if (!user) return next("Try resetting again !!!");

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

// updateOne, create, update, updaeMany, replaceOne, replaceMany -> uses save
// findOneAndUPdate -> query middleware
