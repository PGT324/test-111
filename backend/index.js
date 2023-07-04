import express from 'express'; // {}없으면 default로 export
import { getToken, sendTokenToSMS, checkPhoneIsOk } from './phone.js';
// import qqq, {getToken, sendTokenToSMS} from './phone.js'; // default랑 그냥이랑 같이 export
// import * as ttt from './phone.js';  // 다 가져오기.. 대신에 as로 별명 지어주고 그걸로 사용해야됨.
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import cors from 'cors';

import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js';

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


//DB
const result = [
    {
        number: 1,
        writer: '철수',
        title: '제목입니다1.',
        content: '내용1',
        phone: '01012345678'
    },
    {
        number: 2,
        writer: '영희',
        title: '제목입니다2.',
        content: '내용2',
        phone: '01012345678'
    },
    {
        number: 3,
        writer: '훈이',
        title: '제목입니다3.',
        content: '내용3',
        phone: '01012345678'
    }
]



app.get('/boards', (req, res) => {
    // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정

    // 2. DB에서 꺼내온 결과를 브라우저에 응답(res)으로 주기
    res.send(result)
})

app.post('/boards', (req, res) => {

    // 1. 브라우저에서 보내준 데이터 확인하기.
    const board = req.body
    console.log(board);

    // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정
    result.push(board);
    // 3. DB에 저장된 결과를 브라우저에 응답(res)으로 주기
    res.send('게시물 등록에 성공하였습니다.')
})

app.post('/tokens/phone', (req, res) => {

    const myPhone = req.body.phone;

    if (!checkPhoneIsOk(myPhone)) {
        return
    }
    const result = getToken();
    sendTokenToSMS(myPhone, result);

    res.send('인증 성공!')
})

app.post('/users', (req, res) => {

    const { name, age, school, email } = req.body

    // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = checkEmail(email)
    if (isValid === false) return

    // 2. 가입환영 템플릿 만들기
    const mytemplate = getWelcomeTemplate({ name, age, school })

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(email, mytemplate)

    res.send('전송 완료!')
})


const port = 4000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})