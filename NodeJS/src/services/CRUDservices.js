import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('Create a new user succeed!')
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = () =>{
    return new Promise(async (resolve, reject)=>{
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error)
        }
    })
}

let getUserInfoById = (userId)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: { id: userId},
                raw: true,
            })
            if(user){
                resolve(user)
            }
            else{
                resolve({})
            }
        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (user)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            await db.User.update({
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            }, {
                where: { id: user.id }
            })
            
            let addUsers = getAllUser()
            resolve(addUsers)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
}