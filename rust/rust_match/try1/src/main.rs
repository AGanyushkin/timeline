
enum Coord {
    X,
    Y,
    Z,
    Q(String),
    F(i32, i32),
    W { t: i32, r: i32 }
}

fn main() {

    // let x: Coord = Coord::Q("123".to_string());
    let x = Coord::W {t: 5, r: 7};
    // let x = 10;
    // let flag = false;

    match x {
        // Coord::X => println!("X"),
        // Coord::Y => println!("Y"),
        // Coord::Z => println!("Z"),
        // Coord::Q(m) => println!("m = {}", m),
        // Coord::F(a, b) => println!("a = {}, b = {}", a, b),
        Coord::W {t, r} => println!("r = {}, t = {}", r, t),
        
        // 1 ... 7 => println!("bingo"),
        // 10 | 11 if flag => println!("bla bla"),
        _ => println!("undefined value"),
    }

}
