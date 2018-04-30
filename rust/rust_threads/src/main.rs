use std::thread;
use std::time::Duration;
use std::sync::mpsc;
use std::sync::{Mutex, Arc};

fn main() {
    let (tx, rx) = mpsc::channel();
    let x = 7.7;

    let tx2 = mpsc::Sender::clone(&tx);

    let h = thread::spawn(move || {
        for i in 1..10 {
            println!("num in thread: {}, x = {}", i, x);
            thread::sleep(Duration::from_millis(1));
        }
        let data = ";)";
        tx.send(data).unwrap();
    });

    println!("{}", x);

    for i in 1..10 {
        println!("num in app: {}", i);
        thread::sleep(Duration::from_millis(1));
    }

    h.join();

    let data = rx.recv().unwrap();
    println!("String from thread: {}", data);


    let z: Arc<Mutex<i64>> = Arc::new(Mutex::new(1));
    let mut handlers = vec![];
    
    for _ in 1..10 {
        let _z = Arc::clone(&z);
        let h = thread::spawn(move || {
            let mut num = _z.lock().unwrap();
            *num += 1;
        });
        handlers.push(h);
    }

    for hand in handlers {
        hand.join().unwrap();
    }

    println!("z = {}", z.lock().unwrap());
}
