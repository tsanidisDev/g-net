import { observable, action, computed } from 'mobx';

class MessageStore{
    rootStore: any;
    @observable messages = null;
    @observable limit = 5;

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @action setMessages = msgs => {
        this.messages = msgs;
    }

    @action setLimit = limit => {
        this.limit = limit;
    }

    @computed get messageList()  {
        return Object.keys(this.messages || {}).map(key => (
            {
                ...this.messages[key],
                uId: key
            }
        ))
    }
}

export default MessageStore;