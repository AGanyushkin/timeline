use std::thread;
use std::sync::mpsc;

fn main() {
    
    let mut x: Vec<u64> = Vec::new();

    for i in 0..7 {
        x.push(i as u64);
    }

    let mut thPool: Vec<_> = Vec::new();

    let (tx, rx): (mpsc::Sender(Vec<u64>), mpsc::Receiver<Vec<u64>>) = mpsc::channel();

    for z in 0..1 {

        let thread_tx = tx.clone();

        thPool.push(

            thread::spawn(move || {
                for i in x.iter() {
                    print!("{}, ", i);
                }
                println!();
            })

        );
    }
    
    for th in thPool {
        th.join().unwrap();
    }
}
