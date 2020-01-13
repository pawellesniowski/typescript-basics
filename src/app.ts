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









