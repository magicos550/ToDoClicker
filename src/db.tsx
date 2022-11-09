import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase('todos');

export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS todos (ID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, target INTEGER DEFAULT 0, score INTEGER DEFAULT 0, step INTEGER DEFAULT 0, color TEXT)",
            [],
            () => {
                console.log("CREATED")
            }
        )
    })
}
