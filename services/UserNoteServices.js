import Firebase from '../config/Firebase';
import KeyChain from 'react-native-keychain';

class UserNoteServices {

    addNoteToFirebase = (title, note) => {
        return new Promise(async (resolve, reject) => {
            console.log('lllllll');
            const user = await KeyChain.getGenericPassword()
            const userDetails = JSON.parse(user.password)
            const notes = {
                title : title,
                note : note,
            }
            console.log(notes);
            console.log(userDetails.user.uid);
            Firebase.database().ref('notes/' + userDetails.user.uid).push({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }
}

export default new UserNoteServices();
