

function whoAmI(target: Function): void {
  console.log(`You are : \n${target}`);
}
@whoAmI
class Friend {
  constructor(
    private name: string,
    private age: number
  ) {
  }
}


function UIComponent(html: string): ClassDecorator {
  console.log(`The decorator received ${html} \n`);
  return function (target: Function) {
    console.log(`Someone wants to create a UI component from \n${target}`);
  }
}
@UIComponent(`<h1>Hello Shopper!</h1>`)
class Shopper {
  constructor(
    private name: string
  ) {
  }
}


type constructorMixin = {
  new(...args: any[]): {}
}
function useSalutation(salutation: string) {
  return function<T extends constructorMixin>(target: T) {
    return class extends target {
      name?: string;
      sayHello() {
        console.log(`Hello ${this.getFullName()}`);
      }
      sayGoodbye() {
        console.log(`GoodBye ${this.getFullName()}`)
      }
      protected getFullName() {
        if ("name" in this) {
          return `${salutation} / ${this.name}`;
        }
        return `${salutation}`;
      }
    }
  }
}
@useSalutation(`Mr.`)
class Greeter {
  constructor(
    public name: string
  ) {
  }
  sayHello() {  // overridden by decorator
    console.log(`Hi! I am '${this.name}'`);
  }
}
const greeter = new Greeter('John');
greeter.sayHello();
// greeter.sayGoodbye();    /**WARNING: defined in decorator, but not detected by tsc**/



// @ts-ignore
function logTrade(target, key, descriptor) {
  const originalCode = descriptor.value;
  descriptor.value = function () {
    console.log(`Invoked ${key} providing: `, arguments);
    return originalCode.apply(this.arguments);
  }
  return descriptor;
}
class Trade {
  @logTrade
  placeOrder(stockName: string, quantity: number, operation: string, traderID: number) {
    console.log(`[placeOrder] called - stockName: ${stockName} , quantity: ${quantity} , operation: ${operation} , traderID: ${traderID}`);
  }
}
const trade = new Trade();
trade.placeOrder('IBM', 100, 'Buy', 123);



interface PersonalRecord {
  name: string;
  age: number;
}
const worker: PersonalRecord = { name: 'Carl', age: 23 };
function doStuffX(person: PersonalRecord) {
  person.age = 25;
}
function doStuff(person: Readonly<PersonalRecord>) {
  // person.age = 25;
}


function filterBy<T, P extends keyof T>(property: P, value: T[P], array: T[]) {
  return array.filter(item => item[property] === value);
}
const personalRecords: PersonalRecord[] = [
  { name: 'Carl', age: 23 },
  { name: 'Sweet', age: 25},
];
console.log(`filterBy('name', 'Carl', personalRecords) === `, filterBy('name', 'Carl', personalRecords));
console.log(`filterBy('age', 25, personalRecords) === `, filterBy('age', 25, personalRecords));
// console.log(`filterBy('age', 'twenty', personalRecords) === `, filterBy('age', 'twenty', personalRecords));
// console.log(`filterBy('name', 'Carl', personalRecords) === `, filterBy('lastName', 'Johnson', personalRecords));


type Modifiable<T> = {
  -readonly [P in keyof T]: T[P];
};
interface PersonalRecordReadonly {
  readonly name: string;
  readonly age: number;
}
const worker1: PersonalRecordReadonly = { name: 'Ryder', age: 23 };
const worker2: Modifiable<PersonalRecordReadonly> = { name: 'BigSmoke', age: 26 };
const worker3: Partial<Modifiable<PersonalRecordReadonly>> = {};
// const worker4: Required<Partial<Modifiable<PersonalRecordReadonly>>> = { name: 'Catalina' };
const worker4: Required<Partial<Modifiable<PersonalRecordReadonly>>> = { name: 'Catalina', age: 19 };
// worker1.age = 27;
worker2.age = 27;
worker3.name = 'Cesar';
// worker3.myname = 'Cesar';
console.log(`worker1 === `, worker1);
console.log(`worker2 === `, worker2);
console.log(`worker3 === `, worker3);
console.log(`worker4 === `, worker4);


type PersonalInformation = {
  name: string;
  age: number;
  address: string;
};
type PersonalInformationRequired = Pick<PersonalInformation, 'name'|'age'>;



class Product {
  constructor(
    public id: number
  ) {
  }
}
const getProducts = function<T> (id?: T): T extends number ? Product : Product[] {
  if (typeof id === 'number') {
    // @ts-ignore
    return new Product(id);
  }
  return [
    new Product(123),
    new Product(456),
  ] as any;   // same effect as @ts-ignore
}
const result1 = getProducts(123);
const result2 = getProducts();
console.log(`result1 === `, result1);
console.log(`result2 === `, result2);


type Union1 = 'U1'|'U2'|'U3'|'U4';
type Union2 = 'U1'|'U2'|'U3'|'U4';
type Union3 = 'U3'|'U4';
type Union4 = 'U3'|'U5';
type Excluded1 = Exclude<Union1, Union2>;
type Excluded2 = Exclude<Union1, Union3>;
type Excluded3 = Exclude<Union1, Union4>;


type RemoveProps<T, K> = Exclude<keyof T, K>;
class PersonalRecordObject {
  constructor(
    public id: number,
    public name: string,
    public age: number
  ) {
  }
}
type RemainingProps = RemoveProps<PersonalRecordObject, 'name'|'age'>;
type PersonalRecordBlinded = Pick<PersonalRecordObject, RemainingProps>;



interface SyncService {
  baseUrl: string;
  getA(): string;
}
type ReturnPromise<T> = T extends (...args: infer A) => infer R ? (...args: A) => Promise<R> : T;
type Promisfy<T> = {
  [P in keyof T]: ReturnPromise<T[P]>;
};
class AsyncService implements Promisfy<SyncService> {
  constructor(
    public baseUrl: string
  ) {
  }
  getA(): Promise<string> {
    return Promise.resolve('');
  }
}
let service = new AsyncService(``);
let response = service.getA();
console.log(`response === `, response);
