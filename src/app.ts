// function type:
type sumOrderType = (pizzasNo: number, price?: number) => string;
let sumOrder: sumOrderType;
sumOrder = (pizzasNo, price = 10) => {
  return `you total order is ${pizzasNo*price}`
};

// primitive type bigint, BigInt in JS is an object that can represent large numbers over 2^23 - 1

// object type:
type humanObjectType = {name: string, age: number, gender: string, children?: string[], getName: () => string}

let pawel: humanObjectType;
pawel = {name: 'pawel', age: 33, gender: "male", getName(){ return this.name}};

console.log(pawel.getName());

// array type:
let sizes: string[];
sizes = ['small', 'large', 'extra large'];
// array generic / union type:
type sizesType = Array< number | string >
const sizes2:sizesType = [1, '2'];

// tuple


