const User = require("../Apis/Users/UserModel")
let bcrypt = require('bcrypt')

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

try {
    User.findOne({ email: email }).then(val => {
        if (val == null) {
            let newUser = new User()
            newUser.name = "admin"
            newUser.email = email
            newUser.password = bcrypt.hashSync(password, 10)

            newUser.save()
                .then(data => {
                    console.log("Admin Registered");
                })
                .catch(err => {
                    console.log("error: ", err);
                })
        }
    })

} catch (error) {
    console.log("Error Occurs: " + error);
}
