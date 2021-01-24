import KeyChain from 'react-native-keychain';

class FirebaseAPIServices {
    storeNoteinDatabaseThroughAPI = (noteKey, notes) => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);
            fetch(`https://fundonotes-d4273-default-rtdb.firebaseio.com/notes/${userDetails.user.uid}/${noteKey}.json`,{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   notes : notes
                })
            })
            .then((responce) => resolve('success')) 
            .catch(error => reject(error))
        })
    }
    
    removeNoteinDatabaseThroughAPI = (notekey) => {
        return new Promise(async (resolve, reject) => {
            const user = await KeyChain.getGenericPassword();
            const userDetails = JSON.parse(user.password);

            fetch(`https://fundonotes-d4273-default-rtdb.firebaseio.com/notes/${userDetails.user.uid}/${notekey}.json`,{
                method: 'DELETE'
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }
}

export default new FirebaseAPIServices();