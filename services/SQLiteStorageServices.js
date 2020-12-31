import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "UserNotes.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

class SQLiteStorageServices {
    initDB = (userId) => {
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
            .then(() => {
                console.log("Integrity check passed ...");
                console.log("Opening database ...");
                SQLite.openDatabase(
                    database_name,
                    database_version,
                    database_displayname,
                    database_size
                )
                .then(DB => {
                    db = DB;
                    console.log("Database OPEN");
                    db.executeSql('SELECT 1 FROM Product LIMIT 1')
                    .then(() => {
                        console.log("Database is ready ... executing query ...");
                    }).catch((error) =>{
                        console.log("Received error: ", error);
                        console.log("Database not yet ready ... populating data");
                        db.transaction((tx) => {
                            let table = tx.executeSql('CREATE TABLE IF NOT EXISTS UserNotes (Title VARCHAR(16) PRIMARY KEY, Notes VARCHAR(16) NOT NULL)');
                            console.log('table',table);
                        }).then(() => {
                            console.log("Table created successfully");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log("echoTest failed - plugin not functional");
            });
        })
    }
}
export default new SQLiteStorageServices