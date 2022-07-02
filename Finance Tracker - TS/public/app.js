import { ListTemplate } from './modules/ListTemplate.js';
import { Invoice } from './modules/Invoice.js';
import { Payment } from './modules/Payment.js';
const form = document.querySelector('.new-item-form');
const type = form.querySelector('#type');
const toFrom = form.querySelector('#to-from');
const details = form.querySelector('#details');
const amount = form.querySelector('#amount');
const addToStart = form.querySelector('#start-end');
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let values = [
        toFrom.value,
        details.value,
        amount.valueAsNumber,
    ];
    let doc;
    if (type.value === 'invoice') {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payment(...values);
    }
    list.render(doc, type.value, addToStart.checked ? 'start' : 'end');
});
