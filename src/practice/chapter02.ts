

class Dog {
  constructor(
    private name: string
  ) {
  }
  sayHello(): string {
    return `Hello! I am '${this.name}'`;
  }
}
class Fish {
  constructor(
    private name: string
  ) {
  }
  dive(howDeep = 0): string {
    return `Hello! I am ${this.name}, i am going to dive '${howDeep}' feet`;
  }
}
type Pet = Dog|Fish;


function talkToPet(pet: Pet): string {
  if (pet instanceof Dog) {
    return pet.sayHello();
  }
  return pet.dive();
}


let dog = new Dog('puppy');
let fish = new Fish('shark');
let other = { property: "unknown" };
console.log(talkToPet(dog));
console.log(talkToPet(fish));
// talkToPet(other);

