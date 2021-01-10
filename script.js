const currentDiv = document.querySelector('#current');
const currentParagraf = document.querySelector('.currentPar');
const incomeSumP = document.querySelector('.incomeSum');
const expensesSumP = document.querySelector('.expensesSum');
const message = document.querySelector('.errorMessage');
const select = document.querySelector('#choice');
const descriptionInput = document.querySelector('#description');
const amountInput = document.querySelector('#amount');
const submitBtn = document.querySelector('#submit-btn');
const incomeDiv = document.querySelector('#income');
const expensesDiv = document.querySelector('#expenses');
let arrayOfEntries = [];

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (isValid()) {
        let entry = {
            incomeOrExpenses: select.value,
            description: descriptionInput.value.trim(),
            amount: +amountInput.value.toLocaleString()
        };
        arrayOfEntries.push(entry);
        addToDom(entry);
        displayCurrent();
        console.log(arrayOfEntries);
    } else {
        alert('Your entry is not valid! Try again!')
    }

    select.value = '';
    descriptionInput.value = '';
    amountInput.value = '';
})

const isValid = () => descriptionInput.value !== "" &&
    +amountInput.value > 0

const displayCurrent = () => {
    var sumIncome = 0;
    var sumExpenses = 0;
    let percentage = 0;
    arrayOfEntries.forEach(element => element.incomeOrExpenses === '+' ? sumIncome += element.amount : sumExpenses += element.amount);
    if (sumIncome !== 0) {
        percentage = ((sumExpenses * 100) / sumIncome).toFixed(0);
    } else {
        percentage;
    }
    incomeSumP.innerHTML = `<p>Income</p><span style="color: green; font-weight: bold; font-size: 25px"> + ${sumIncome.toLocaleString()}</span>`;
    expensesSumP.innerHTML = `<p>Expense</p><span style="color: #fff; font-weight: bold; font-size: 25px"> - ${sumExpenses.toLocaleString()} | ${percentage}%`;
    localStorage.setItem('incomeSum', sumIncome);
    localStorage.setItem('expensesSum', sumExpenses);
    calculateDifference();
    return sumIncome;
}

// Calculation percentage for an entry
function calcPercentage(sum, currentEntry) {
    return ((currentEntry * 100) / sum).toFixed(2);
}

const addToDom = entry => {
    let list = document.createElement('ul');
    list.className = 'list';
    let elementLi = document.createElement('li');
    elementLi.className = 'element';

    if (select.value === '+') {
        elementLi.innerHTML = `<p>${entry.description}</p> <span style="color: green"> + ${entry.amount.toLocaleString()}</span>`;
        list.appendChild(elementLi);
        incomeDiv.appendChild(list);
    } else {
        let entryPercentage = 0
        if (displayCurrent() !== 0) {
            entryPercentage = calcPercentage(displayCurrent(), entry.amount);
        } else {
            entryPercentage;
        }
        elementLi.innerHTML = `<p>${entry.description}</p> <span style="color: red"> - ${entry.amount.toLocaleString()} | ${entryPercentage}%</span>`;
        list.appendChild(elementLi);
        expensesDiv.appendChild(list);
        calcPercentage(displayCurrent(), entry.amount)
    }

    // Delete element on hover
    let delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fas fa-times-circle"></i>';
    delButton.className = 'delete-btn';
    elementLi.appendChild(delButton);

    delButton.addEventListener('click', () => {
        elementLi.remove();
        let index = arrayOfEntries.indexOf(entry);
        arrayOfEntries.splice(index, 1);
        displayCurrent();
    });
}

// Calculate the current state
function calculateDifference() {
    let income = localStorage.getItem('incomeSum');
    let expenses = localStorage.getItem('expensesSum');
    let current = (income - expenses).toLocaleString();
    currentParagraf.innerHTML = `${current}`;
}

window.localStorage.clear();


