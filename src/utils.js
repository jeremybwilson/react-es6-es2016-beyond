class Random {

  constructor(max = 1000, allowNegatives = true){
    this.max = max;
    this.allowNegatives = allowNegatives;
  }

  randomInt(min, max) {
    if (max > this.max){
      max = this.max;
    }
    if (min < 0 && !this.allowNegatives){
      min = 0;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max -min + 1)) + min;
  }
}

class ColorGenerator extends Random {

  constructor(max, allowNegatives, type = "rgb") {
    super(max, allowNegatives)
    if (this.typeList.includes(type)) {
      this.type = type;
    } else {
      this.type = "rgb";
    }
  }

  typeList = ["hex", "rgb"];

  get types() {
    return this.typeList;
  }

  set types(types = ['hex', 'rgb']) {
    if (Array.isArray(types)) {
      this.typeList = types.map(type => type);
    }
  }

  color() {
    let r = super.randomInt(0, 255);
    let g = super.randomInt(0, 255);
    let b = super.randomInt(0, 255);

    if (this.type === 'hex') {
      return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
}


export const rando = new ColorGenerator();

const shakespeareApi = 'https://api.graph.cool/simple/v1/shakespeare';

let options = () => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        allPoems(
          first: 1
          skip: ${rando.randomInt(0, 160)}
        ) {
          title
          author
          lines
          text
        }
      }`
    })
  }
}

export async function getRandomPoem(){
  try {
    let result = await fetch(shakespeareApi, options());
    let response = await result.json();
    let poem = response.data.allPoems[0];
    return poem.text;
  } catch(error) {
    console.error('Error in getRandomPoem:', error);
    throw error;
  }
};

fetch(shakespeareApi, options())
  .then( response => response.json())
  .then(json => {
    console.log(json);
  })
  .catch(error => {
    console.error('Error:', error);
  })

let addFunc = (a, b) => { return a + b };

const calc = {
  status: 'Awesome',
  plus: function(a, b){
    return (
      console.log(this),
      console.log(a+b),
      console.log(arguments),
      console.log(this.status)
    )
  }
}

export default addFunc;

const Dog = function() {
  let name, breed;
  return console.dir(this);
}

firstDog = new Dog;
firstDog.name = "Rover";
firstDog.breed = "Doberman";

secondDog = new Dog;
secondDog.name = "Fluffy";
secondDog.breed = "Poodle";

console.log(firstDog.name);
console.log(secondDog.name);
