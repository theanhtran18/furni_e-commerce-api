import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// hàm tạo mã xác minh ngẫu nhiên 6 chữ số
export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}