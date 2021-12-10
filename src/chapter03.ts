
class Person0 {
  constructor(
    public firstName: string,
    protected lastName: string,
    private age: number
  ) {
  }
  sayHello(): string {
    return `My name is '${this.firstName}/${this.lastName} (${this.age})'`;
  }
  sellStock(symbol: string, numberOfShares: number) {
    console.log(`Selling ${numberOfShares} of ${symbol}`);
  }
}
class Employee extends Person0 {
  constructor(
    firstName: string,
    lastName: string,
    age: number,
    public department: string,
  ) {
    super(firstName, lastName, age);
    console.log(`inherited this.lastName === ${this.lastName}`);  /**protected: available on subclass**/
    // console.log(this.age);   /**private: not available on subclass**/
  }
  sellStock(symbol: string, shares: number) {
    super.sellStock(symbol, shares);
    this.reportToCompliance(symbol, shares);
  }
  private reportToCompliance(symbol: string, shares: number) {
    console.log(`'${this.lastName}' from '${this.department}' sold ${shares} shares of '${symbol}'`);
  }
}
const employee = new Employee('Carl', 'Johnson', 34, 'Grove');
console.log(`employee.firstName === ${employee.firstName}`);
// console.log(`employee.lastName === ${employee.lastName}`);   /**protected: available on other location**/
// console.log(`employee.age === ${employee.age}`);   /**private: not available on other location**/
console.log(employee.sayHello());
employee.sellStock('IBM', 100);



class Gangsta {
  static totalBullets = 100;
  shoot() {
    Gangsta.totalBullets--;
    console.log(`Bullets left: ${Gangsta.totalBullets}`);
  }
}
class Asshole extends Gangsta {

}
const g1 = new Gangsta();
const g2 = new Gangsta();
const asshole = new Asshole();
g1.shoot();
g2.shoot();
asshole.shoot();
console.log(`Asshole.totalBullets === ${Asshole.totalBullets}`)


/** Singleton Pattern **/
class AppState {
  counter = 0;
  private static instanceRef: AppState;

  private constructor() {
  }
  static getInstance(): AppState {
    if (AppState.instanceRef === undefined) {
      AppState.instanceRef = new AppState();
    }
    return AppState.instanceRef;
  }
}
// const appState = new AppState();
const appState1 = AppState.getInstance();
const appState2 = AppState.getInstance();
console.log(`appState1 === appState2 : ${appState1 === appState2}`);
appState1.counter++;
appState2.counter++;
appState2.counter++;
appState1.counter++;
console.log(`appState1.counter === ${appState1.counter}`);
console.log(`appState2.counter === ${appState2.counter}`);



abstract class Member {
  protected constructor(
    public name: string,
    protected payKind: "salary"|"hourly rate"
  ) {
  }
  changeAddress(newAddress: string) {
    console.log(`changing address to '${newAddress}'`);
    this.name = newAddress;
  }
  giveDayOff() {
    console.log(`Giving a day off to '${this.name}'`);
  }
  promote(percent: number) {
    this.giveDayOff();
    this.increasePay(percent);
  }
  abstract increasePay(percent: number): void

}
class Staff extends Member {
  constructor(
    name: string
  ) {
    super(name, "salary");
  }
  increasePay(percent: number): void {
    console.log(`Increasing the ${this.payKind} of ${this.name} by ${percent}%`);
  }
}
class Contractor extends Member {
  constructor(
    name: string
  ) {
    super(name, "hourly rate");
  }
  increasePay(percent: number): void {
    console.log(`Increasing the ${this.payKind} of ${this.name} by ${percent}%`);
  }
}
const workers: Member[] = [];
workers[0] = new Staff('Ryder');
workers[1] = new Contractor('Big Smoke');
workers.forEach(worker => worker.promote(5));



interface Product {
  id: number;
  description: string;
}
class ProductService {
  // getProducts(): void;
  getProducts(description: string): Product[];
  getProducts(id: number): Product;
  getProducts(product: number|string): Product|Product[] {
    if (typeof product === 'number') {
      console.log(`Getting the product info for [${product}]`);
      return {
        id: product,
        description: `great product`
      };
    } else {
      console.log(`Getting the product with description '${product}'`);
      return [
        { id: 123, description: product },
        { id: 456, description: product },
      ];
    }
  }
}
const productService = new ProductService();
const product123 = productService.getProducts(123);
const productDope = productService.getProducts('something dope');
console.log(`productService.getProducts(123) === ${product123}`);
console.log(`productService.getProducts('something dope') === ${productDope}`);


interface ProductProperties {
  id?: number;
  description?: string;
}
class ProductWrapper {
  protected id?: number;
  protected description?: string;
  constructor(properties?: ProductProperties) {
    this.id = properties?.id;
    this.description = properties?.description;
  }
}
class ProductWrapperLegacy {
  constructor();
  constructor(id: number);
  constructor(id: number, description: string);
  constructor(id?: number, description?: string) {
    if (typeof id === "undefined" && typeof description === "undefined") {
      // this.constructor();
    } else if (typeof id !== "undefined" && typeof description === "undefined") {
      // this.constructor(id);
    } else if (typeof id === "undefined" && typeof description !== "undefined") {
      // this.constructor(description);
    } else {
      // this.constructor(id, description);
    }
  }
}



interface MotorVehicle {
  startEngine(): boolean;
  stopEngine(): boolean;
  brake(): boolean;
  accelerate(speed: number): void;
  honk(howLong: number): void;
}
class Car implements MotorVehicle {
  accelerate(speed: number) {
    console.log(`Driving Faster => ${speed}`);
  }
  brake(): boolean {
    return false;
  }
  honk(howLong: number): void {
    console.log(`Beep for => ${howLong}`);
  }
  startEngine(): boolean {
    return false;
  }
  stopEngine(): boolean {
    return false;
  }
}
const car: MotorVehicle = new Car();
car.startEngine();


interface Flyable extends MotorVehicle {
  fly(howHigh: number): void;
  land(): void;
}
interface Swimmable {
  swim(howFar: number): void;
}
class FutureCar extends Car implements MotorVehicle, Flyable, Swimmable {
  fly(howHigh: number): void {
    console.log(`Fly '${howHigh}' Feet High!`);
  }
  land(): void {
    console.log(`Landing Complete.`);
  }
  swim(howFar: number): void {
    console.log(`Swimming with speed '${howFar}'!`);
  }
}


interface ProductInfo {
  id: number;
  description: string;
}
interface IProductInfoService {
  getProductById(id: number): ProductInfo;
  getProducts(): ProductInfo[];
}
// class ProductInfo {
//   constructor(
//     id: number,
//     description: string
//   ) {
//
//   }
// }
class ProductInfoService implements IProductInfoService{
  getProducts(): ProductInfo[] {
    return [];
  }
  getProductById(id: number): ProductInfo {
    return {
      id: id,
      description: `Man, this is good shit..`
    };
  }
}
class MockProductInfoService implements IProductInfoService {
  getProductById(id: number): ProductInfo {
    return {
      id: id,
      description: `Man, this is dope..`
    };
  }
  getProducts(): ProductInfo[] {
    return [];
  }
}
// class MockProductInfoService {   /** Not a good definition... **/
//   getProducts(): ProductInfo[] {
//     return [];
//   }
//   getProductById(id: number): ProductInfo {
//     return {
//       id: id,
//       description: `Man, this is dope..`
//     };
//   }
// }
function getProductService(isProduction: boolean): IProductInfoService {
  if (isProduction) {
    return new ProductInfoService();
  }
  return new MockProductInfoService();
}
const productInfoService = getProductService(false);
const productInfos = productInfoService.getProducts();


