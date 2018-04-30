use std::collections::HashMap;
use std::collections::LinkedList;

struct XS1 {
    x: f64,
    y: f64,
}

fn inc(a: i32) -> i32 {
    a + 1
}

fn main() {
    println!("Hello, world!");

    let i1: u64 = 1;
    println!("check 1: {}", i1 );

    let xs1: XS1 = XS1 { x: 1.1, y: 2.2 };
    println!("check 2: {}, {}", xs1.x, xs1.y);

    let arr1: [i8; 3] = [1, 2, -3];
    println!("check 3: {}, {}, {}", arr1[0], arr1[1], arr1[2]);

    let arr2: Vec<i8> = vec![1, 2];
    println!("check 4: {}, {}", arr2[0], arr2[1]);

    let f1: fn(a: i32) -> i32 = inc;
    println!("check 5: {}", f1(6) );

    let mut hm1: HashMap<&str, &str> = HashMap::new();
    hm1.insert("a", "b");
    println!("check 6: {:?}", hm1.get("a") );
    println!("check 6: {:?}", hm1.entry("p").or_insert("x") );
    println!("check 6: {:?}", hm1.get("p") );

    let mut ll1: LinkedList<f64> = LinkedList::new();
    println!("check 7: {}", ll1.is_empty() );
    ll1.push_back(1.0);
    ll1.push_front(-3.9);
    ll1.push_back(4.7);

    println!("check 7: {}", ll1.front().unwrap() );
    
    for item in ll1 {
        println!("check 8: {}", item );
    }

    
}
