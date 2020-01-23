// function type:
type sumOrderType = (pizzasNo: number, price?: number) => string;
let sumOrder: sumOrderType;
sumOrder = (pizzasNo, price = 10) => {
  return `you total order is ${pizzasNo*price}`
};

// Primitive type bigint, BigInt in JS is an object that can represent large numbers over 2^23 - 1

// Object type:
type HumanType = {name: string, age: number, gender: string, children?: string[], getName: () => string}

let pawel: HumanType;
pawel = {name: 'pawel', age: 33, gender: "male", getName(){ return this.name}};

console.log(pawel.getName());

// Array type:
let sizes: string[];
sizes = ['small', 'large', 'extra large'];
// array generic / union type:
type SizesType = Array< number | string >
const sizes2:SizesType = [1, '2'];

// Tuple type:
type PizzaTupleType = [string, number, boolean];
let pizza: PizzaTupleType;
pizza = ['I must be a string', 1222, true, 1, 2, 2]; // first string, second number, third boolean, rest does not matter

// Alias and type for function
type Size = 'medium' | 'small' | 'large';
type SetSize = (size: Size) => void;
let pizzaSize: Size;

const setSize: SetSize = (size) => {
  pizzaSize = size;
  return 2; // ??? question: why this is 'ok', if type of return is void ?????
};
const returnedFrom = setSize('medium');
console.log("returnedFrom", returnedFrom);

// Type Assertions:  we specify type comming back from unknown typed place, like localStorage string.

  type Pizza = {name: string, toppings: string};
  const pizzaPawla: Pizza = {name: 'Roma', toppings: 'tomato, bazylia'};
  const serialized = JSON.stringify(pizzaPawla);

  function deserializeFromJSON(jsonObj: string) {
    // return <Pizza>JSON.parse(jsonObj) // assertion first method, confused with JSX
    return JSON.parse(jsonObj) as Pizza // assertion second method, we use as keyword
  }
  const pizzaPawlaFromJSON = deserializeFromJSON(serialized);
  // console.log(pizzaPawlaFromJSON);



// interfaces:
(function () {
  interface Sizes {
    sizes: string[];
  }

  interface Pizza extends Sizes {
    name: string;
    toppings: number;
    getAvailableSizes(): string[]; // this is type for method
    paymentMethod: string; // ??? no complains about missing property in createPizza function which returns Pizza type when we return with 'as Pizza'
    [key: number]: string;
  }

  let myPizza: Pizza;
  function createPizza(name: string, sizes: string[], toppings: number) {
    return {
      name,
      sizes,
      toppings,
      getAvailableSizes() {
        return this.sizes;
      }
    } as Pizza// ??? why does not complain about missing property 'paymentMethod: string;' when used 'as Pizza'
  }
  myPizza = createPizza('Pepperoni', ['small', 'large'], 1);
  myPizza[1] = 'option one';
  // console.log('myPizza', myPizza);
}());

// classes:
(function () {
  interface PizzaInterface {
    toppings: string[];
    name: string;
    // no private and protected members can be listed in here!!!
  }

  class Pizza implements PizzaInterface {
    foo: string = "bar";
    toppings: string[] = [];
    constructor(public name: string) {}

    addToppings(...toppings: string[]) {
      this.toppings = [...this.toppings, ...toppings]
    }

    getDetails(){
      console.log(`This is ${this.name} pizza with ${this.toppings.join(', ')}`);
    }

    static foo () {
      console.log('static example');
    }
  }
  const myPizza = new Pizza('Pepperoni');
  myPizza.addToppings('pepperoni', 'tomato');

  Pizza.foo();
}());

// 'typeof' Type Queries
(function () {
  const john = {
    name: 'John',
    age: 33,
  };
  type Person = typeof john;
  const pawel: Person = {
    name: 'Pawel',
    age: 37,
  }
}());

// 'keyof' Index type queries, type safe lookup
(function () {
  const john = {
    name: 'John',
    age: 33,
  };

  type Person = typeof john;
  type PersonKeys = keyof Person;

  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }
  const personName = getProperty(john, 'name');
}());

// -- GENERICS --
(function () {
  function identity<T>(arg: T):T {
    return arg;
  }

  let mySecretIdentity: {<Z>(args: Z): Z} = identity;

  let myIdentity: {<U>(arg: U):U};
  myIdentity = identity;
}());

// generic interface for function:
(function () {

  interface IdentityFn<V> {
    <V>(args: V):V
  }
  function identity<T> (args: T): T {
    return args;
  }
  const identityGenerator:IdentityFn<number> = identity;

}());

// generic classes:
(function () {

  class GenericNumber<T> { // generics works only on instance side of type
    zeroValue: T;
    add: (x: T, y: T) => T;
  }
  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = (a,b) => a+b;

}());

// generic constrains:
(function () {
  //lets constrain our generic type to members with .length property on them
  interface Lengthwise {
    length: number
  }

  function identity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
  }

  identity([1,2,3])

}());

(function () {
  //lets grab a property from object given its its key

  interface Person {
    name: string;
    lastName: string;
    age: number;
  }
  const obj: Person = {
    name: 'Pawel',
    lastName: 'Lesniowski',
    age: 37,
  };

  function getPropertyByKey<T, K extends keyof T>(obj: T, key: K){
    return obj[key];
  }
  const mySearch = getPropertyByKey(obj, 'name');

}());


// Class types:
(function () {

  interface AnimalType {
    legs: number;
    tail: boolean;
  }
  class Animal implements AnimalType {
    constructor(public legs: number, public tail: boolean, public claws: boolean ) {}
    get description () {
      return `This Animal has ${this.legs}${this.tail ? ' and a tail.' : '.'} `
    }
  }
  const cat = new Animal(4, true, true);
  console.log(cat.description);

}());

// Mapped types:
(function () {
  interface Person {
    name: string,
    age: number,
  }
  const person: Person = {
    name: "pawel",
    age: 73,
  }
}());

// Namespaces:
  namespace Validation {
    export interface StringValidator {
      isAcceptable(s: string): boolean
    }

    let lettersRegexp = /^[A-Za-z]+$/;
    let numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
      isAcceptable (s: string) {
        return lettersRegexp.test(s);
      }
    }

    export class ZipCodeValidator implements StringValidator {
      isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
      }
    }
  }

  let validators: {[key: string]: Validation.StringValidator} = {};
  validators["ZIP code"] = new Validation.ZipCodeValidator();
  validators["Letters only"] = new Validation.LettersOnlyValidator();

  console.log('validators: ', validators["ZIP code"].isAcceptable('1234n'));

