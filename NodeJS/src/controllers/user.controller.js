import userService from "../services/user.services"

let handleLogin = async (req,res) =>{
    let email = req.body.email
    let password = req.body.password
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs!!!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async(req, res)=>{
    let id = req.body.id; //ALL, Single
    let user = await userService.getAllUsers(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users: user
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}