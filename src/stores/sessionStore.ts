import { observable, action } from 'mobx';

class SessionStore {
    rootStore: any;
    @observable authUser = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setAuthUser = authUser => {
        this.authUser = authUser;
    }
}

export default SessionStore;