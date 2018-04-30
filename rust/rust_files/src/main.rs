
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::mem;

fn main() {

    // let mut f = File::open("./test.file").unwrap();

    // let mut content = String::new();

    // f.read_to_string(&mut content).expect("content read error");

    // println!("=> {}", content);

    // let mut fOut = File::create("./test.out").expect("fOut opening error");

    // let message = "test message\n123\nxyz";

    // fOut.write(message.as_bytes());
    // fOut.flush();


    let mut data: Vec<f64> = vec![];

    let mut i = 3;
    while i > 0 {
        data.push(i as f64 * 0.1);
        i = i - 1;
    };

    for i in 0..data.len() {
        println!("item = {}", data[i]);
    };

    {
        let mut f = File::create("array.bin").unwrap();
        let d: f64 = 1923e-2;
        println!("to file: {}", d);
        // f.write(d.to_string().as_bytes());
        
        let b: [u8; 8] = unsafe { mem::transmute(d) };
        f.write(&b);

        f.flush();
    }

    {
        let mut f = File::open("array.bin").unwrap();
        let mut buffer: [u8; 8] = [0; 8];
        f.read(&mut buffer);

        let r: f64 = unsafe { mem::transmute(buffer) };
        println!("from file: {}", r);
    }
    
}
