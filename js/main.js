"use strict";
// Кнопка утвердить 
const buttonStart = document.getElementById('start');
// Поля ввода
const budgetValue = document.querySelector('.budget-value'),
        dayBudget = document.querySelector('.daybudget-value'),
        lavelValue = document.querySelector('.level-value'),
        expensesValue = document.querySelector('.expenses-value'),
        optialValue = document.querySelector('.optionalexpenses-value'),
        incomeValue = document.querySelector('.income-value'),
        yearsValue = document.querySelector('.yearsavings-value'),
        optialExpresValue = document.querySelector('.optionalexpenses'),
        chooseValue = document.querySelector('.choose-income');
        
const inputItem = document.querySelectorAll('.expenses-item'),
      inputOptional = document.querySelectorAll('.optionalexpenses-item');
const countBtn = document.querySelector('.count-budget-btn');
const exensesBtn = document.querySelector('.expenses-item-btn'),
      optionalBtn = document.querySelector('.optionalexpenses-btn');   
// Чекбокс Сума Процент
const checkBox = document.getElementById('savings'),
    inputSum = document.querySelector('.choose-sum'),
    inputPrecent = document.querySelector('.choose-percent');
// Доход Накопления
const yearData = document.querySelector('.yearsavings-value'),
      monthData = document.querySelector('.monthsavings-value'),
      dayData = document.querySelector('.daybudget-value'),
      yearsValueDate = document.querySelector('.year-value'),
      monthValueDate = document.querySelector('.month-value'),
      dayValueDate = document.querySelector('.day-value')
      

      let money, time, sum;


buttonStart.addEventListener('click', function() {
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");
    

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearsValueDate .value = new Date(Date.parse(time)).getFullYear();
    monthValueDate.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValueDate.value = new Date(Date.parse(time)).getDate();
});

exensesBtn.addEventListener('click', function(){
    let sum = 0;
    for (let i = 0; i < inputItem.length; i++) {
        let a = inputItem[i].value,
            b = inputItem[++i].value;
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
            console.log ("done");
            appData.expenses[a] = b;
            sum += +b;
        } else {
            console.log ("bad result");
            i--;
        }
    }
    expensesValue.textContent = sum;
    appData.totalSum = sum;
    
});
optionalBtn.addEventListener('click', function(){
    for (let i = 0; i <= inputOptional.length; i++) {
        let questionOptExpenses = inputOptional[i].value;
        appData.optionalExpenses[i] = questionOptExpenses;
        optialValue.textContent += appData.optionalExpenses[i] + ' грн, ';   
    }
});

countBtn.addEventListener('click', function(){
    if (appData.budget != undefined) {
        let total = appData.budget - appData.totalSum;
        appData.moneyPerDay = (total / 30).toFixed();
        dayData.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            lavelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            lavelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            lavelValue.textContent = "Это высокий уровень достатка!";
        } else {
            lavelValue.textContent = "Ошибочка...!";
        }
    } else {
        dayData.textContent = "Нажмите Начать расчет";
    }  
});
chooseValue.addEventListener('input', function(){
    let items = chooseValue.value;
        appData.income = items.split(", ");
        incomeValue.textContent =  appData.income;
});
checkBox.addEventListener('click', function(){
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});
inputSum.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = inputSum.value,
            precent = inputPrecent.value;
            appData.monthIncome = sum/100/12*precent;
            appData.yearIncome = sum/100*precent;
            monthData.textContent = appData.monthIncome.toFixed(1);
            yearData.textContent = appData.yearIncome.toFixed(1);
    }
});

inputPrecent.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = inputSum.value,
            precent = inputPrecent.value;
            appData.monthIncome = sum/100/12*precent;
            appData.yearIncome = sum/100*precent;
            monthData.textContent = appData.monthIncome.toFixed(1);
            yearData.textContent = appData.yearIncome.toFixed(2);
       
    }
});
let appData = {
    budget: money,
    timeData: time,
    totalSum: [],   
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};
