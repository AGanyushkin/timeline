const r = require('rethinkdb')
const uuid = require('uuid/v4')

const DB_NAME = 'tg'
const DB_HOST = 'localhost'
const DB_PORT = 28015
const TABLE_NAME = 'accs'

const tableOpts = {
    primaryKey: 'login',
    durability: 'hard'
}

function Acc(login, pwd) {
    this.id = uuid()
    this.token = null
    this.login = login
    this.pwd = pwd
    this.createdAt = new Date()
}


r.connect({host: DB_HOST, port: DB_PORT})
/*
    .then(conn => {
        
        return r.db(DB_NAME)
            .tableCreate(TABLE_NAME, tableOpts)
            .run(conn)
            .then(e => {
                if (e.tables_created !== 1) throw new Error('Fail :(')
            })
            .then(e => conn)
            .catch(err => conn)
    })
    .then(conn => console.log('done'))
    .catch(err => console.log('E', err))
*/
/*
    .then(conn => {
        const acc = new Acc('login2', 'pwd2')
        return r.db(DB_NAME)
            .table(TABLE_NAME)
            .insert(
                acc,
                {conflict: "error"}
            )
            .run(conn)
            .then(e => {
                if (e.inserted === 1) {
                    return acc
                } else {
                    throw new Error('Fail again ;(')
                }
            })

    })
    .then(acc => console.log(acc))
*/
/*
    .then(conn => {
        return r.db(DB_NAME)
            .table(TABLE_NAME)
            .get('login2')
            .run(conn)
            .then(acc => {
                if (acc.pwd !== 'pwd2') {
                    throw new Error('Incorrect password')
                }
                return acc
            })
            .then(_acc => {
                const acc = Object.assign({}, _acc, {token: uuid()})
                return r.db(DB_NAME)
                    .table(TABLE_NAME)
                    .get(acc.login)
                    .update({
                        token: acc.token
                    })
                    .run(conn)
                    .then(e => acc)
            })
    })
    .then(acc => console.log(acc))
*/
/*
    .then(conn => {
        return r.db(DB_NAME)
            .table(TABLE_NAME)
            .filter(
                r.row('token').eq("5928cf14-54ff-4af6-adc5-acccf9699455")
            )
            .run(conn)
            .then(cursor => cursor.next())
    })
    .then(acc => console.log(acc))
*/
/*
    .then(conn => {
        return r.db(DB_NAME)
            .table(TABLE_NAME)
            .filter(
                r.row('token').eq("e1bdb186-4a3b-420b-9e67-3442eb489cde")
            )
            .run(conn)
            .then(cursor => cursor.next())
            .then(acc => r.db(DB_NAME)
                .table(TABLE_NAME)
                .get(acc.login)
                .update({
                    token: null
                })
                .run(conn)
            )
    })
    .then(console.log)
*/
    .then(conn => {
        return r.db(DB_NAME)
            .tableList()
            .run(conn)
            .then(tables => {
                if (tables.includes('accss')) {
                    return 'A'
                }
            })
    })
    .then(console.log)