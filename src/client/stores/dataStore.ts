import { observable, action, computed } from "mobx";
import Firebase from "../../server/Firebase";


class DataStore {
    database: any;
    @observable data = null;
    @observable isDataLoaded = false;

    constructor() {
        this.database = new Firebase().db;
    }

    @action loadData = () => {
        const loadData = new Promise((res, rej) => {
            this.database.ref("/").on("value",
                (e: any) => {
                    this.data = e.val() as any;
                    this.isDataLoaded = true;
                    res(this.data);
                });
        })
        return loadData;
    }
}

export default DataStore;