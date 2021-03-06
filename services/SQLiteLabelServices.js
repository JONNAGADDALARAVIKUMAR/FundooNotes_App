import { openDatabase } from 'react-native-sqlite-storage';
import KeyChain from 'react-native-keychain';

var db = openDatabase({ name: 'SQLiteStorage.db', createFromLocation: 1 });

class SQLiteLabelServices {

    storeLabelinSQliteStorage = (userId, labelName, lebelKey) => {
        return new Promise(async (resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${userId}Label (lebelKey TEXT PRIMARY KEY, labelName TEXT, noteKeys TEXT)`,
                    [],(tx, results) => {},
                    error => reject(error)
                )
                tx.executeSql(
                    `INSERT INTO '${userId}Label' (lebelKey, labelName, noteKeys) VALUES (?,?,?)`,
                    [lebelKey, labelName, JSON.stringify([])],
                    (tx, results) => resolve(results),
                    error => reject(error)
                );
            });
        })
    }

    updateLabelinSQliteStorage = (userId, labelName, labelKey) => {
        return new Promise(async (resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId}Label set labelName = ? where lebelKey = ?`,
                    [labelName, labelKey],
                )
            })
        })
    }

    deleteLabel = (userId, labelKey) => {
        db.transaction(tx => {
            console.log('transact');
            tx.executeSql(
                `SELECT noteKeys FROM ${userId}Label where lebelKey = ?`,
                [labelKey],(tx, results) => {
                    let tempNoteKeys = JSON.parse(results.rows.item(0).noteKeys);
                    tempNoteKeys.map(noteKey => {
                        tx.executeSql(
                            `SELECT Labels from ${userId} where NoteKey = ?`,
                                [noteKey],
                                (tx, results) => {
                                    let tempLabelKeys = JSON.parse(results.rows.item(0).Labels)
                                    for(let i = 0; i < tempLabelKeys.length; i++) {
                                        if(tempLabelKeys[i] == labelKey) {
                                            tempLabelKeys.splice(i, 1)
                                        }
                                    }
                                    tx.executeSql(
                                        `UPDATE ${userId} set Labels = ?  where NoteKey = ?`,
                                        [JSON.stringify(tempLabelKeys), noteKey],
                                        async (tx, results) => {},
                                        error => console.log(error)
                                    )
                                },
                            error => reject(error)  
                        )
                    })
                },
                error => reject(error)
            )
            tx.executeSql(
                `DELETE FROM ${userId}Label WHERE lebelKey = ?`,
                [labelKey], (tx, results) => {},
                error => reject(error)
            )
        })
    }

    getLabelsFromSQliteStorage = (userId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                // db.transaction((tx) => {
                //     tx.executeSql(`DROP TABLE ${userId}Label`)
                // })
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${userId}Label (lebelKey TEXT PRIMARY KEY, labelName TEXT, noteKeys TEXT)`,
                    [],
                    (tx, results) => {},
                    error => console.log(error)
                )
                tx.executeSql(
                    `SELECT * FROM '${userId}Label'`,
                    [],
                    (tx, results) => resolve(results),
                    error => reject(error)
                );
            });
        })
    }

    addNoteKeysToTheLabelsInSQLite = async (labelKey, noteKey) => {
        let user = await KeyChain.getGenericPassword();
        let userDetails = JSON.parse(user.password);
        let userId = userDetails.user.uid
        let tempNoteKeys = []
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM '${userId}Label' WHERE lebelKey = ?`,
                [labelKey],
                (tx, results) => {    
                    tempNoteKeys = JSON.parse(results.rows.item(0).noteKeys)
                    if(!tempNoteKeys.includes(noteKey)) {
                        tempNoteKeys.push(noteKey)
                    }
                    tx.executeSql(
                        `UPDATE ${userId}Label set noteKeys = ? where lebelKey = ?`,
                        [JSON.stringify(tempNoteKeys), labelKey],
                        (tx, results) => {'update results'},
                        error => console.log(error)
                    )
                },
                error => reject(error)
            )
        });
    }
}

export default new SQLiteLabelServices