import { atom } from "recoil";

export const display = atom({
    key: 'displayFrom',
    default: false
});

export const displayExForm = atom({
    key: 'displayExForm',
    default: false
})

export const displayChart = atom({
    key: 'displayCharts',
    default: false
})