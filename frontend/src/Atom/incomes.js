import { atom } from "recoil";

export const Incomes = atom({
    key: 'Incomes',
    default:  []
});

export const Expenses = atom({
    key: 'Expenses',
    default: []
});

export const IncomesArray = atom({
    key: 'incomeArray',
    default: []
});

export const ExpensesArray = atom({
    key: 'expensesArray',
    default: []
});