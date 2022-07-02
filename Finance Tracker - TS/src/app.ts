import { ListTemplate } from './modules/ListTemplate.js';
import { Invoice } from './modules/Invoice.js';
import { Payment } from './modules/Payment.js';
import { HasFormatter } from './interfaces/HasFormatter.js';

const form = document.querySelector('.new-item-form') as HTMLFormElement;

const type = form.querySelector('#type') as HTMLSelectElement;
const toFrom = form.querySelector('#to-from') as HTMLInputElement;
const details = form.querySelector('#details') as HTMLInputElement;
const amount = form.querySelector('#amount') as HTMLInputElement;
const addToStart = form.querySelector('#start-end') as HTMLInputElement;

const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  let values: [string, string, number] = [
    toFrom.value,
    details.value,
    amount.valueAsNumber,
  ];

  let doc: HasFormatter;
  if (type.value === 'invoice') {
    doc = new Invoice(...values);
  } else {
    doc = new Payment(...values);
  }

  list.render(doc, type.value, addToStart.checked ? 'start' : 'end');
});
