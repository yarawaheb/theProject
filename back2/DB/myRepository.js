let allUsers = require('./myusers').users;

const getall = () => {
    return allUsers;
};
exports.getall = getall;

const checkUsernameAndPassword = (username,password) =>{
    let found = `Couldn't find user with username = ${username}`;
    allUsers.forEach((current) => {
        if (current.userName === username && current.password === password) {
            found = current;
            return found;
        }
    })
    return found;
}
exports.checkUsernameAndPassword = checkUsernameAndPassword;
const findUserByUsername = (username) => {
    let found = `Couldn't find user with username = ${username}`;
    // console.log("-------");
    // console.log(allUsers);
    allUsers.forEach((current) => {
        if (current.userName === username) {
            found = current;
            return found;
        }
    })
    return found;
}
exports.findUserByUsername = findUserByUsername;

const addUser = (newuser) => {
    //console.log(newuser);
    allUsers.push(newuser);
    //console.log(allUsers);
    return true;
}
exports.addUser = addUser;

const deleteUserByUsername = (params) => {
    console.log(params);
    for (let i = 0; i < allUsers.length; i++) {
        // console.log(allUsers[i].userName);
        // console.log("###");
        // console.log(params.userName);
        if (allUsers[i].userName === params) {
            allUsers.splice(i, 1);
            console.log(allUsers);
            return true;
        }
    }
    return false;
}
exports.deleteUserByUsername = deleteUserByUsername;

function updateUserByUsername(params){
    // console.log(params);
    // console.log("$$");
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].userName === params.userName) {
            allUsers[i]=params;
            return true;
        }
    }
    return false;
}
exports.updateUserByUsername = updateUserByUsername;




