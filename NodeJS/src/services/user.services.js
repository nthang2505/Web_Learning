import db from "../models/index"
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject)=>{
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist){
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {email: email},
                    raw: true
                })
                if(user){
                    let check = await bcrypt.compareSync(password, user.password)
                    if(check){
                        userData.errCode = 0
                        userData.errMessage = 'ok'
                        delete user.password
                        userData.user = user
                    }else{
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password'
                    }
                }else{
                    userData.errCode = 2
                    userData.errMessage = "user not found"
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = "Your's Email isn't exist in your system. plz try enter other email!"
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}