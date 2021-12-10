function getFinalPrice(price: number, discount: number) {
    return price - price/discount;
}

console.log(`getFinalPrice(100, 10) === ${getFinalPrice(100, 10)}`);
// console.log(`getFinalPrice(100, "10%") === ${getFinalPrice(100, "10%")}`);  // TS2345


const sym1 = Symbol('orderID');
const sym2 = Symbol('orderID');
const myOrder = {
  [sym1]: "123",
  sym1: "456",
};
console.log(`(myOrder[sym1] === myOrder['sym1']) === ${myOrder[sym1] === myOrder['sym1']}`);
// console.log(`(sym1 === sym2) === ${sym1 === sym2}`);


const logger = (errorMessage: string) => {
  while (true) {
    console.log(errorMessage);
  }
};


let name1 = "John Smith";
let name2: string = "John Smith";


const age = 25;
function getTax(income: number) {
    return 0.15*income;
}


let name3: "John Smith";
// name3 = 'a';


let productId;
productId = null;
productId = 1;
productId = undefined;


let productId2 = 123;
// productId2 = null;
// productId2 = undefined;


function calcTax(state: string, income: number, dependants: number): number|undefined {
  if (state === 'NY') {
    return 0.06*income - 500*dependants;
  } else if (state === 'NJ') {
    return 0.05*income - 300*dependants;
  }
}
let tax = calcTax('NJ', 50000, 2);


let padding: string|number;
function padLeft(value: string, padding: string|number): string {
  if (typeof padding === 'number') {
    return Array(padding + 1).join('') + value;
  } else if (typeof padding === 'string') {
    return padding + value;
  } else {
    return padding;
  }
}
console.log(padLeft('Hello Word', 4));
console.log(padLeft('Hello Word', 'John Says'));
// console.log(padLeft('Hello Word', true));


type Foot = number;
type Pound = number;
type Patient = {
    name: string;
    height: Foot;
    weight?: Pound;
}
let patient: Patient = {
  name: 'Joe Smith',
  height: 5,
  // weight: 100
};


class FormControl {
  constructor(initialValue: string, validator: ValidationFn|null) {
    // ...
  }
}
type ValidationFn = (control: FormControl) => {[key: string]: any} | null;


class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number
  ) {
  }
}
const p = new Person("John", "smith", 25);
console.log(p.firstName);


class Block {
  readonly nonce: number;
  readonly hash: string;

  constructor(
    readonly index: number,
    readonly previousHash: string,
    readonly timestamp: number,
    readonly data: string
  ) {
    const { nonce, hash } = this.mine();
    this.nonce = nonce;
    this.hash = hash;
  }

  mine: () => { nonce: number, hash: string } = function () {
    return { nonce: 0, hash: '' }
  }
}


interface PersonInfo {
  firstName: string;
  lastName: string;
  age: number;
}
function savePerson(personInfo: PersonInfo) {
  console.log(`saving : ${personInfo}`);
}
const personInfo: PersonInfo = {
  firstName: "John",
  lastName: "Smith",
  age: 25
};
savePerson(personInfo);


class Fucker {
  constructor(
    name: string
  ) {
  }
}
class Fucker1 {
  constructor(
    name: string
  ) {
  }
}
class Fucker2 {
  constructor(
    private name: string
  ) {
  }
}
const fucker1: Fucker1 = new Fucker('Ryder');
// const fucker2: Fucker2 = new Fucker('CJ');


class Customer1 {
  constructor(
    public name: string,
    public age: number
  ) {
  }
}
class Customer2 {
  constructor(
    public name: string
  ) {
  }
}
// const customer1: Customer1 = new Customer2('Luigi');
const customer2: Customer2 = new Customer1('HeyHoes', 24);

customer2.name = 'a';


interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
type Shape = Rectangle|Circle;
function area(shape: Shape): number {
  switch (shape.kind) {
    case "rectangle": return shape.height*shape.width;
    case "circle": return Math.PI*shape.radius**2;
  }
}
const rectangle: Rectangle = { kind: 'rectangle', width: 10, height: 20 };
const circle: Circle = { kind: "circle", radius: 10 };
console.log(`Rectangle's area is ${area(rectangle)}`);
console.log(`Circle's area is ${area(circle)}`);


interface i1 {
  a: number;
}
interface i2 {
  b: string;
}
function foo(x: i1|i2) {
  if ("a" in x) {
    return x.a;
  }
  return x.b;
}


type PersonData = {
  discriminator: 'person';
  address: string;
}
const isPersonData1 = (object: any): object is PersonData => !!object && "address" in object;
const isPersonData2 = (object: any): object is PersonData => !!object && object.discriminator === "person";
let person1: any;
let person2: unknown;
person1 = JSON.parse('{"address":"25 Broadway"}');
person2 = JSON.parse('{"address":"25 Broadway"}');
console.log(person1.address);
// console.log(person2.address);
if (isPersonData2(person2)) {
  console.log(person2.address);
}


