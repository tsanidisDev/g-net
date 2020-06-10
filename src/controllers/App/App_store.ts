import { autorun, observable, computed, action } from 'mobx';

class AppStore {
    @observable data = null;

}
// var test = observable({
//     name: "ss",
//     age: 55,
//     setAge(age) {
//         this.age = age
//     },
//     get txt() {
//         return this.name + this.age
//     }

// })

var store = (window as any).store = new AppStore;

export default store;

// autorun(() => {
//     console.log(store.filter, store.todos)
// })