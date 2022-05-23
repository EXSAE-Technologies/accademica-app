import * as React from 'react';
import { makeAutoObservable, observable } from 'mobx';
import * as SecureStore from 'expo-secure-store';

export async function saveKey(key:string,value:string){
    await SecureStore.setItemAsync(key,value)
}
export async function getKey(key:string, callback:CallableFunction) {
    let result = await SecureStore.getItemAsync(key);
    callback(result)
}
  
class UserData{
    data=null
    constructor(){
        makeAutoObservable(this)
    }
    setData(data:Object){
        this.data = data
    }
}

export let userData = new UserData()