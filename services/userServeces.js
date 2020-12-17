import Firebase from '../config/Firebase'

class UserServices {
    createAccount = (email, password) => {
        return new Promise((resolve, reject) => {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve('User account created & signed in!')
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                        reject('email in use!')
                }
                if (error.code === 'auth/invalid-email') {
                        reject('invalid email!')
                }
            })
        })
    }

    logIn = (email, password) => {
        return new Promise((resolve, reject) => {
            Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve(true)
            })
            .catch((error) => {
                if(error.code === 'auth/user-not-found') {
                    reject('User not Found')
                }
                else if(error.code === 'auth/wrong-password') {
                    reject('Invalid Password')
                }
                else if(error.code === 'auth/invalid-email') {
                    reject('Invalid Email')
                }
                console.log(error.code);
            })
        })
    }

    resetPassword = (email) => {
        
        return new Promise((resolve, reject) => {
            Firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                resolve(true)
            })
            .catch((error) => {
                if(error.code === 'auth/invalid-email') {
                    reject('invalid email')
                } else if(error.code === 'auth/user-not-found') {
                    reject('User not found')
                }
                console.log(error)
            })
        })
    }
}

export default new UserServices();