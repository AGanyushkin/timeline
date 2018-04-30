extern crate futures;
extern crate reql;
extern crate reql_types;
extern crate tokio_core;

use futures::stream::Stream;
use reql::{Client, Document, Run};
use reql_types::ServerStatus;
use tokio_core::reactor::Core;

fn main() {
    let r = Client::new();
    let core = Core::new().unwrap();
    let conn = r.connect(&core.handle()).unwrap();
    let query = r.db("test")
        .table("table1")
        .filter(r.row.)
        .run::<ServerStatus>(conn)
        .unwrap();

    let stati = query.and_then(|status| {
        match status {
            Some(Document::Expected(status)) => {
                println!("{:?}", status);
            }
            Some(Document::Unexpected(status)) => {
                println!("unexpected response from server: {:?}", status);
            }
            None => {
                println!("got no documents in the database");
            }
        }
        Ok(())
    })
    .or_else(|error| {
        println!("{:?}", error);
        Err(())
    });

    for _ in stati.wait() {}
}
