import { observable, action, computed } from 'mobx';

class UserStore {
    rootStore: any;
    @observable users = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setUsers = users => {
        this.users = users;
    }

    @action setUser = (user, uId) => {
        if (!this.users) {
            this.users = {};
        }

        this.users[uId] = user;
    }

    @computed get userList() {
        return Object.keys(this.users || {}).map(key => (
            {
                ...this.users[key],
                uId: key
            }
        ))
    }
}


export default UserStore;