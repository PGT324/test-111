import { getToday } from './utils.js'
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

export function checkEmail(email) {
    if (email === undefined || email.includes("@") === false) {
        console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!")
        return false
    } else {
        return true
    }
}

export function getWelcomeTemplate({ name, age, school }) { // const {age, createdAt} = { name, age, school, createdAt }
    const mytemplate = `
        <html>
            <body>
                <div style="display: flex; flex-direction: column; align-items: center;>
                    <div style="width: 500px;">
                        <h1>${name}님 가입을 환영합니다!!!</h1>
                        <hr />
                        <div style="color: red;">이름: ${name}</div>
                        <div>나이: ${age}</div>
                        <div>학교: ${school}</div>
                        <div>가입일: ${getToday()}</div>
                    </div>
                </div>
            </body>
        </html>
    `
    return mytemplate
    // console.log(mytemplate)
}

export async function sendTemplateToEmail(email, result) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLEID,
            pass: process.env.GOOGLEPW,
        }
    })

    const res = await transporter.sendMail({
        from: 'ajtwoddl9194@gmail.com',
        to: email,
        subject: "[가입을 축하합니다!]",
        html: result,
    })
}