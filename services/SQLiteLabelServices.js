import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'SQLiteStorage.db', createFromLocation: 1 });

class SQLiteLabelServices {

    storeLabelinSQliteStorage = (userId, labelName) => {
        return new Promise(async (resolve, reject) => {
            let lebelKey = await this.generateRandomLabelKey()
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${userId}Label (lebelKey TEXT PRIMARY KEY, labelName TEXT)`,
                    [],
                    error => console.log(error)
                )
                tx.executeSql(
                    `INSERT INTO '${userId}Label' (lebelKey, labelName) VALUES (?,?)`,
                    [lebelKey, labelName],
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
            )})
        })
    }

    getLabelsFromSQliteStorage = (userId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${userId}Label (lebelKey TEXT PRIMARY KEY, labelName TEXT)`,
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
                // db.transaction((tx) => {
                //     tx.executeSql(`DROP TABLE ${userId}Label`)
                // })
            });
        })
    }

    generateRandomLabelKey = () => {
        var today = new Date()
        var labelNoteKey = ''
        labelNoteKey = today.getFullYear() 
                + String((today.getMonth() + 1) < 10 ? (0 + String(today.getMonth() + 1)) : today.getMonth) 
                + String(today.getDate() < 10 ? (0 + String(today.getDate())) : today.getDate()) 
                + String(today.getHours() < 10 ? '0' + today.getHours() : today.getHours())
                + String(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) 
                + String(today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds())
        
        return labelNoteKey
    }
}

export default new SQLiteLabelServices