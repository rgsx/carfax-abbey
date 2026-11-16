'use strict';
// Carfax Abbey: plain JavaScript (source.js)

const path = require('path');
const { EventEmitter } = require('events');

const BOXES = 50; // of earth, from Varna to Whitby
const CABLE = /^come\s+(?<name>[a-z]+)\b/gi;

class Hunter extends EventEmitter {
  static #count = 0;
  #faith = 100;

  constructor(name, { city = 'London', rank } = {}) {
    super();
    this.name = name;
    this.city = city;
    this.rank = rank ?? 'friend';
    Hunter.#count++;
  }

  get faith() {
    return this.#faith;
  }

  static get count() {
    return Hunter.#count;
  }

  watch(hours = 8) {
    this.#faith -= hours * 1.5;
    if (this.#faith < 10) throw new Error(`${this.name} can watch no longer\n`);
    this.emit('watch', { hours, faith: this.#faith });
    return this;
  }
}

function* nights(max) {
  for (let i = 0; i < max; i++) yield i % 2 === 0 ? 'dusk' : 'dawn';
}

async function cable(who, words = []) {
  const [first, ...rest] = words;
  const result = await Promise.resolve({ who, first, rest });
  return result?.who?.name ?? 'nobody';
}

const options = { connections: { compression: false, retries: 3 }, root: path.join(__dirname, 'carfax') };
delete options.connections.retries;

const harker = new Hunter('Harker', { city: 'Whitby' });
console.log(typeof harker, harker instanceof Hunter, 'city' in harker, void 0);

for (const hour of nights(4)) {
  if (hour === 'dawn') continue;
  console.log(hour, CABLE.test('come mina'));
}

switch (Hunter.count) {
  case 1:
    cable(harker, ['Bistritz', 'Borgo Pass']).then((name) => console.log(name));
    break;
  default:
    break;
}

module.exports = { Hunter, cable, BOXES, options };
