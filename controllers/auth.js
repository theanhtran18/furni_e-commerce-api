import { signAccessToken, signRefreshToken } from '../lib/jwt.js';
import User from '../models/user.js'
import { OAuth2Client, UserRefreshClient } from 'google-auth-library'
import cookie from "cookie";
import { addUser } from '../services/user.js';
import { transporter, generateVerificationCode } from '../lib/mail.js';

// //const oAuth2Client = new OAuth2Client(process.env.GG_CLIENT_ID, process.env.GG_CLIENT_SECRET, http://localhost:8088/auth/google/callback)
// const oAuth2Client = new OAuth2Client({
// 	clientId: process.env.GG_CLIENT_ID,
// 	clientSecret: process.env.GG_CLIENT_SECRET,
// 	redirectUri: 'http://localhost:8088/auth/google/callback',
// });

// Login or Register
export const findUserByEmailOrCreate = async (req, res) => {
	try {
		const { email, givenName, familyName, avatar } = req.body;

		let user = await User.findOneAndUpdate({ email }, { givenName, familyName, avatar }, { new: true });

		if (!user) {
			user = await User.create({ email, givenName, familyName, avatar });
		}
		const accToken = await signAccessToken(user._id, user?.role);
		const refreshToken = await signRefreshToken(user._id, user?.role);
		// Lưu token vào cookie
		res.setHeader("Set-Cookie", [
			cookie.serialize("access_token", accToken, { httpOnly: true, secure: true, sameSite: "none", path: "/" }),
			cookie.serialize("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "none", path: "/" })
		]);

		res.json({ user });
	} catch (error) {
		console.error('[findUserByEmailOrCreate]', error);
		res.status(500).json('Internal Server Error');
	}
};
//danh sách đăng ký
const users = [];

export const registerAccount = async (req, res, next) => {
	try {
		const { email, givenName, familyName, password } = req.body;

		const user = await User.findOne({ email });
		if (user) return res.status(400).json({ message: 'Email đã tồn tại.' });

		const code = generateVerificationCode();
		const expiresAt = Date.now() + 5 * 60 * 1000;

		// Lưu tạm hoặc lưu DB
		users.push({ email, code, expiresAt, isVerified: false, givenName, familyName, password });

		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Mã xác minh tài khoản',
			html: `<p>Mã xác minh của bạn là: <b>${code}</b></p>`,
		}, (err, info) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: 'Lỗi gửi email' });
			}
			res.json({ message: 'Đăng ký thành công, mã xác minh đã được gửi.' });
			//req.email = email
			//next()
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Lỗi server' });
	}
};


export const verifyCode = async (req, res) => {
	const { email, code } = req.body;
	const user = users.find(u => u.email === email);

	if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
	const existingUser = await User.findOne({ email });
	if (user.isVerified && existingUser) {
		return res.json({ message: 'Email đã được xác minh rồi.' });
	}

	if (user.code === String(code).trim() && Date.now() < user.expiresAt) {
		user.isVerified = true;

		const result = await addUser(email, user.givenName, user.familyName, user.password);
		if (!result) return res.status(500).json({ message: 'Registration failed!' });

		return res.json({ message: 'Registration success!' });
	} else {
		return res.status(400).json({ message: 'Mã không hợp lệ hoặc đã hết hạn.' });
	}
};


export const loginWithAccount = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const isMatch = await user.isCheckPassword(password)
		if (!isMatch) {
			return res.status(401).json({ success: false, message: "Wrong password" });
		}

		const accToken = await signAccessToken(user._id, user?.role);
		const refreshToken = await signRefreshToken(user._id, user?.role);

		res.setHeader("Set-Cookie", [
			cookie.serialize("access_token", accToken, { httpOnly: true, secure: true, sameSite: "none", path: "/" }),
			cookie.serialize("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "none", path: "/" })
		]);

		res.status(200).json({
			success: true,
			message: "Login successful",
			access_token: accToken,
			refresh_token: refreshToken,
			user: user
		});
	} catch (error) {
		next(error);
	}
}


// export const refreshToken = async (req, res) => {
// 	try {
// 		const user = new UserRefreshClient(process.env.GG_CLIENT_ID, process.env.GG_CLIENT_SECRET, req.body.refreshToken)
// 		const { credentials } = await user.refreshAccessToken() // optain new tokens

// 		return res.status(200).json(credentials)
// 	} catch (error) {
// 		console.error('[refreshToken]', error)
// 		res.status(500).json('Internal Server Error')
// 	}
// }