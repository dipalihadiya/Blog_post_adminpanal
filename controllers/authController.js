const bcrypt = require('bcrypt')
const userModel = require('../models/singUp/signUpmodel');
const token_generator = require('token-generator');
const otp_generator = require('otp-generator');
nodeMailer = require('nodemailer');
let myOTP = null;


const Transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port : 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'hadiyabholabhai70@gmail.com',
        pass: 'tblf vrly elaw mhjn'
    }
});

const forgotPassword = async(req,res) => {
    console.log("forgot Password");
    res.render(`src/html/forgotPassword`);
}

const forgotPasswordController = async (req, res) => {
    console.log("forgot Password Controller");
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (user) {
        const tokenGenerator = new token_generator({
            salt: 'some-salt',
            timestamp: true,
            timestampMap: '0123456789'
        });
        let token = tokenGenerator.generate();

        // const token_generator = new token_ge nerator({
        //     salt: 'some-salt',
        //     timestamp: true
        // });
        await userModel.updateOne({ _id: user._id }, { resetToken: token });

        console.log("user found");
        let link = `http://localhost:3017/cnfirmOTP//${user.id}`;
        console.log("RESET LINK >>>", link);

        const generateOtp = {
            from: "hadiyabholabhai70@gmail.com",
            to: user.email,
            subject: "Reset Password",
            text: `Your reset password link is <a href="${link}">click here</a>`
        };
        Transporter.sendMail(generateOtp, (error, info) => {
            if (error) {
                return console.log('Error:', error);
            }
            console.log('Email sent:', info.response);
        });

        res.render('src/html/forgotPassword', { id: user.id });
    } else {
        console.log("user not found");
        res.redirect('/signUp');
    }
};
const otp = (req, res) => {
    // console.log("id", req.params.id);
    // let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

    // myOtp = otp;
    // console.log("OTP", myOtp);
    res.render('src/html/otp', { id: req.params.id });
}
// const confirmOTP = (req, res) => {
//     console.log("confirm otp");
//     const userId = req.params.id;
//     res.render('src/html/resetPassword', { id: userId });
// };
const confirmOTP = async (req, res) => {
    console.log("Reset Password", req.params.id);

    try {
        const user = await userModel.indOne({ _id: req.params.id });

        console.log("user", user);
        if (user) {
            if (user.resetToken) {
                await userModel.updateOne({ _id: req.params.id }, { resetToken: null });
                res.render('src/html/resetPassword', { id: req.params.id });
            } else {
                console.log("Invalid Link");

                res.redirect('/errorPage');
            }

        } else {
            res.redirect('/errorPage');
        }
    } catch {
        console.log("Invalid Link");

        res.redirect('/errorPage');
    }
}
const resetPasswordController = async (req, res) => {
    const id = req.params.id;
    console.log("reset Password", id);
    const { new_password, conf_password } = req.body;
    if (new_password == conf_password) {
        bcrypt.hash(new_password, 10, async (err, hashPassword) => {
            if (err) {
                console.log("Error in hashing password", err);
                return res.status(500).send("Server error");
            }
            console.log("hash", hashPassword);
            const newPass = await userModel.updateOne({ _id: id }, { password: hashPassword });
            console.log("updated pass", newPass);

        })
        res.redirect('/');
    } else {
        console.log("new pass & con pass not mathed");
        res.redirect(`src/html/resetPassword/${id}`);
    }
};


    const changePassword = (req,res) => {
        console.log("change password");
        res.render('src/html/changePassword');
    }

    const changePasscontroler = async (req,res) => {

    console.log("change passs");
    
    const {password} = req.user;
    const {con_password, new_password, cur_password} = req.body;
    
    bcrypt.compare(cur_password, password, (err, result) => {
                    
        console.log("result",result);
    
        if(result){
            console.log("password matched");    
    
            if(new_password === con_password){
                
                bcrypt.hash(new_password , 10 , async (err , hashPassword) => {
                    console.log("hash" , hashPassword);
                
                    const updatepass = await userModel.updateOne({_id: req.user._id}, {password: hashPassword});
                    console.log("updatepass" , updatepass);
                    
                })
                res.redirect('/');
        }else{
            console.log("password not matched");
            res.redirect('/changePassword');
        }
        }else{
            console.log("password not matched");
            res.redirect('/changePassword');
    
        }
    
    })
}

const errorPage = (req, res) => {

    res.render('src/html/errorPage');

}



module.exports = {forgotPassword,changePassword,forgotPasswordController,changePasscontroler ,otp,confirmOTP,resetPasswordController,errorPage}