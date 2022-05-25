import * as sqlite from 'sqlite3'
import { seedData } from '../utils';
const sqlite3 = sqlite.verbose();
let db = new sqlite3.Database('./sqlite.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

export default class {

    static setupDbForDev() {
        db.serialize(function () {
            
            //   Drop Tables:
            const dropUsersTable = "DROP TABLE IF EXISTS categories";
            db.run(dropUsersTable);
            
            // Create Tables:
            const createUsersTable = "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT ,name, parent_id)";
            if (db.run(createUsersTable)) {
                console.log("created")
            }
        });
    }

    static all(stmt: string, params: Array<string>) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }
    static get(stmt: string, params: Array<string>) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    static run(stmt: string, params: Array<any>) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error: any, result: any) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }


}