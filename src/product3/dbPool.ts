import {ConnectionPool} from 'mssql';

export class DBPool {
    private static readonly config = {
        user: 'plasek_sebastian',
        password: 'password',
        server: 'ifsql-01', // You can use 'localhost\\instance' to connect to named instance
        database: 's_plasek_sebastian_1',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        trustServerCertificate: true
    }
    private static instance: ConnectionPool | undefined;

    static getInstance(): ConnectionPool {
        if (!this.instance) {
            throw "Pool not connected to DB";
        }
        return this.instance
    }

    static async connect() {
        this.instance = await (new ConnectionPool(this.config)).connect();
    }
}