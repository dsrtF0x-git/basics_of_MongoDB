const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");


router.delete("/users/me", auth, async (req, res) => {
	try {
		// const user = await User.findByIdAndDelete(req.user._id);

		// if (!user) return res.status(404).send();

		await req.user.remove();
		sendCancelationEmail(req.user.email, req.user.name);
		res.send(req.user);

	} catch (error) {
		res.status(500).send();
	}
});

router.post("/users", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		sendWelcomeEmail(user.email, user.name);
		const token = await user.generateAuthToken();

		res.status(201).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}

	

	// user.save()
	// 	.then(() => res.status(201).send(user))
	// 	.catch(error => res.status(400).send(error));
});

router.get("/users/me", auth, async (req, res) => {
	res.send(req.user);
	

	// try {
	// 	const users = await User.find({});
	// 	res.send(users);
	// } catch (error) {
	// 	res.status(500).send();
	// }
	// User.find({}).then((users) => {
	// 	res.send(users);	
	// })
	// .catch(e => {
	// 	res.status(500).send();
	// });
});



router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(400).send();
	}
});

router.post("/users/logout", auth, async (req, res, next) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token !== req.token;
		});

		await req.user.save();

		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

router.post("/users/logoutAll", auth, async (req, res, next) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();

	} catch (error) {
		res.status(500).send();
	}
});

router.patch("/users/me", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "age", "password"];
	const isValidOperation = updates.every(item => allowedUpdates.includes(item));

	if (!isValidOperation) return res.status(400).send({ error: "Invalid updates!"});

	try {
		// const user = await User.findById(req.params.id);

	updates.forEach(update => {
		req.user[update] = req.body[update];
	});

	await req.user.save();

		// const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		res.send(req.user);
	} catch (error) {
		res.status(404).send(error);
	}
});

const upload = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		// cb(new Error("File must be a PDF."));
		// cb(undefined, true);
		// cb(undefined, false);
		if (!file.originalname.match(/\.(jpe?g|png)$/)) {
			return cb(new Error("Please upload an image."));
		}
		cb(undefined, true);
	}
});

router.delete("/users/me/avatar", auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send(200);
});

router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
	const buffer = await sharp(req.file.buffer).resize({ 
		width: 250,
		height: 250
	 }).png().toBuffer();
	req.user.avatar = buffer;
	await req.user.save();
	res.send();
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message });
});

router.get("/users/:id/avatar", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.avatar) {
			throw new Error();
		}
		res.set("Content-Type", "image/png");
		res.send(user.avatar);
	} catch (error) {
		res.status(404).send();
	}
});

module.exports = router;