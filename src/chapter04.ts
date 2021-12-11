

enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
let dayOff = Weekdays.Tuesday;
console.log(`Weekdays[3] === ${Weekdays[3]}`);



enum Direction {
  FtoC,
  CtoF
}
function convertTemperature(temp: number, fromTo: Direction): number {
  return Direction.FtoC === fromTo ?
    5.0*(temp-32)/9.0 :
    9.0*temp/5.0+32;
}
console.log(`convertTemperature(70., 'FtoC') === ${convertTemperature(70., Direction.FtoC)}'`);
console.log(`convertTemperature(21, 'CtoF') === ${convertTemperature(21, Direction.CtoF)}`);
// console.log(`convertTemperature(35, 'ABCD') === ${convertTemperature(35, 'ABCD')}`);
// convertTemperature(50, 0.99);



enum MovingDirection {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
function move(to: MovingDirection) {
  if (to === MovingDirection.Up) {
    // ... do something ...
  }
}
move(MovingDirection.Up);
// move("North");
// move('UP');

function move2(to: 'Up'|'Down'|'Left'|'Right') {
  // ... do something ...
}
move2('Up');
// move2('North');



enum ProductsActionTypes {
  Search = 'Products Search',
  Load = 'Products Load All',
  LoadFailure = 'Products Load All Failure',
  LoadSuccess = 'Products Load All Success',
}
// if load failed,
console.log(`[MESSAGE] ${ProductsActionTypes.LoadFailure}`);
// console.log(`[MESSAGE] ${ProductsActionTypes['Products Load All Failure']}`);



const enum MovingDirection2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
const theNextMove = MovingDirection2.Up;




let lotteryNumbers: Array<number>;
const someValues: number[] = [];
const someValues2: Array<number> = [];


class PersonalInfo {
  constructor(
    public name: string
  ) {
  }
}
const people = new Array<PersonalInfo>(10);
console.log(`people === ${people}`);


class EmployeeInfo extends PersonalInfo {
  constructor(
    name: string,
    private department: string
  ) {
    super(name);
  }
}
class Animal {
  constructor(
    protected breed: string
  ) {
  }
}
class Werebeast extends Animal {
  constructor(
    breed: string,
    public name: string
  ) {
    super(breed);
  }
}
const personalInfos: Array<PersonalInfo> = [];
personalInfos[0] = new PersonalInfo('Jesse');
personalInfos[1] = new EmployeeInfo('Sweet', 'Grove');
// personalInfos[2] = new Animal('Whale');
personalInfos[2] = new Werebeast('Shark', 'Jaws');
console.log(`personalInfos === ${personalInfos}`);
// const werewolf: Werebeast = new PersonalInfo('Woozie');




interface Comparable<T> {
  compareTo(value: T): number;
}
class Rectangled implements Comparable<Rectangled> {
  constructor(
    public width: number,
    public height: number
  ) {
  }
  compareTo(value: Rectangled): number {
    return this.width*this.height - value.width*value.height;
  }
}
class Triangled implements Comparable<Triangled> {
  constructor(
    private width: number,
    private height: number
  ) {
  }
  compareTo(value: Triangled): number {
    return this.width*this.height - value.width*value.height;
  }
}
class Programmer implements Comparable<Programmer> {
  constructor(
    public name: string,
    private salary: number
  ) {
  }
  compareTo(value: Programmer): number {
    return this.salary - value.salary;
  }

}
const rectangle1 = new Rectangled(2, 5);
const rectangle2 = new Rectangled(2, 3);
const triangle1 = new Triangled(3, 4);
console.log(`rectangle1.compareTo(rectangle2) === ${rectangle1.compareTo(rectangle2)}`);
// console.log(`rectangle1.compareTo(triangle1) === ${rectangle1.compareTo(triangle1)}`);
const programmer1 = new Programmer('Michael', 4000);
const programmer2 = new Programmer('Trevor', 3000);
console.log(`programmer1.compareTo(programmer2) === ${programmer1.compareTo(programmer2)}`);



function printMe<T>(content: T): T {
  console.log(`content === ${content}`);
  return content;
}
const printMe2 = <T>(content: T): T => {
  console.log(`content === ${content}`);
  return content;
}
class PersonInformation {
  constructor(
    public name: string
  ) {
  }
}
const a1 = printMe<string>(`Hello`);
const a2 = printMe(`Hello`);
const a3 = printMe(new PersonInformation(`Ryder`));
const b1 = printMe2<string>(`Hello`);
const b2 = printMe2(`Hello`);
const b3 = printMe2(new PersonInformation(`BigBear`));
console.log(`a1 === ${a1}`);
console.log(`a2 === ${a2}`);
console.log(`a3 === ${a3}`);
console.log(`b1 === ${b1}`);
console.log(`b2 === ${b2}`);
console.log(`b3 === ${b3}`);


class Pair<K, V> {
  constructor(
    public key: K,
    public value: V
  ) {
  }
}
function compare<K, V>(pair1: Pair<K, V>, pair2: Pair<K, V>): boolean {
  return pair1.key === pair2.key && pair1.value === pair2.value;
}
let p1 = new Pair<number, string>(1, 'Apple');
let p2 = new Pair<number, string>(2, 'Orange');
let p3 = new Pair('first', 'Apple');
let p4 = new Pair('first', 'Apple');
console.log(`compare(p1, p2) === ${compare<number, string>(p1, p2)}`);
console.log(`compare(p3, p4) === ${compare(p3, p4)}`);



enum UserRole {
  Administrator = 'admin',
  Manager = 'manager'
}
interface User {
  name: string,
  role: UserRole
}
function loadUser<T>(): T {
  return JSON.parse(`{"name": "john", "role": "admin"}`)
}
const user = loadUser<User>();
switch (user.role) {
  case UserRole.Administrator:
    console.log(`[${user.role}] Show Control Panel`);
    break;
  case UserRole.Manager:
    console.log(`[${user.role}] Hide Control Panel`);
    break;
  default:
    break;
}


const outerFunction = (someValue: number) => (multiplier: number) => someValue*multiplier;
const innerFunction = outerFunction(10);
let result = innerFunction(5);
console.log(`result === ${result}`);


type numFunc<T> = (arg: T) => (c: number) => number;
const noArgFunc: numFunc<void> = () => (c: number) => c+5;
const numArgFunc: numFunc<number> = (someValue: number) => (multiplier: number) => someValue*multiplier;
const stringArgFunc: numFunc<string> = (someText: string) => (padding: number) => someText.length+padding;
// const createSumString: numFunc<number> = () => (x: number) => 'Hello';
