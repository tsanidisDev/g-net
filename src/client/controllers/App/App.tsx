import * as React from 'react';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';
import { observer } from 'mobx-react';
import DataStore from '../../stores/dataStore';
import { Loader } from '../../components/Loader/Loader';
import Home from '../../pages/Home/Home';

export interface AppProps {
    store?: any;
}

@observer
export class App extends React.Component<AppProps, any> {
    dataStore;
    constructor(props: AppProps) {
        super(props);
        this.dataStore = new DataStore();
    }

    componentDidMount() {
        this.updateData();
    }

    updateData = () => {
        if (!this.dataStore.isDataLoaded) {
            this.dataStore.loadData().then((e) => {
                this.props.store.data = e;
            });
        } else {
            this.props.store.data = this.dataStore.data;
        }
    }

    render() {
        if (!this.dataStore.isDataLoaded) {
            return (<Loader />)
        }
        let props = this.props;
        return (
            <div className="app">
                {/* <h1>{`LOADED DATA: ${this.props.store.data}`}</h1> */}
                <h1>{`LOADED DATA: SSR`}</h1>
                <Router hashType="noslash">
                    <Switch>
                        <Route exact path="/" render={() => <Home></Home>} />
                    </Switch>
                </Router>
            </div>
        )
    }

}