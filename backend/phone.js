import coolsms from 'coolsms-node-sdk';
import dotenv from "dotenv";
dotenv.config();
const mysms = coolsms.default

//token function
export function checkPhoneIsOk(myPhone) {
    if (myPhone.length < 10 || myPhone.length > 11) {
        console.log('에러 발생! 핸드폰 번호를 제대로 입력해 주세요.')
        return false
    } else {
        return true
    }
}

export function getToken() {
    const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
    return result;
}

export function sendTokenToSMS(myPhone, result) {

    const messageService = new mysms(process.env.APIKEY, process.env.APISECRET);
    messageService.sendOne({
        to: myPhone,
        from: '01046649194',
        text: `[코드캠프] 안녕하세요? 요청하신 인증번호는 ${result} 입니다.`
    })
}