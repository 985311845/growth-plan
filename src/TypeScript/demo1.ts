let x: [string, number];

x = ['hello', 100];

enum Color {Red = 11, Green = 12, Blue = 13};

let c: Color = Color.Red;
console.log(c)

let someValue: any = 4;

let strLength: number = someValue.length;

console.log(strLength)

function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

keepWholeObject({a: '123'})
