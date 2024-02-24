import { atom } from "recoil";

export const Username = atom({
    key: 'userName',
    default: ''
});

export const Password = atom({
    key: 'Password',
    default: ''
});

export const UserInfo = atom({
    key: 'userInfo',
    default: ''
})