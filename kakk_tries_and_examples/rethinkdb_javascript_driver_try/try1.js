// cd ./bin
// ./rethinkdb.exe -d ../data/

const r = require('rethinkdb')
const Kakka = require('kakka/node')
const Rx = require('rxjs/Rx')

const DB_NAME = 'testdb'
const DB_HOST = 'localhost'
const DB_PORT = 28015
const EVENT_TABLE_NAME = 'events'

const insertAction = Kakka.def('INSERT_ACTION')

const {act, fire, libs} = new Kakka({
    libs: {
        rethinkdb: r.connect({host: DB_HOST, port: DB_PORT})
    },
    ready: () => {
        fire(insertAction({field: 1, args: 2}))
    }
})

act(insertAction)
    .flatMap(e => dbInsertAction(libs.rethinkdb, e.payload))
    .subscribe()

function dbInsertAction(conn, payload) {
    return Rx.Observable.fromPromise(
        r.db(DB_NAME)
            .table(EVENT_TABLE_NAME)
            .insert(payload)
            .run(conn)
    )
}

