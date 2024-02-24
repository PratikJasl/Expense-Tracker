import { atom } from "recoil";

export const Selection = atom({
    key: 'selection',
    default: 4
});

export const SelectForm = atom({
    key: 'selectForm',
    default: 1
});

export const IncomeFormSubmit = atom({
    key: 'IncomeformSubmit',
    default: false
});

export const ExpenseFormSubmit = atom({
    key: 'ExpenseformSubmit',
    default: false
});