import * as React from 'react';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props);
        // this.state = inAppInitialState;
    }


    render() {
        return (
            <div className="app">
                <Router hashType="noslash">
                    <Switch>
                        {/* <Route exact path="/" component={ContentPage} /> */}
                    </Switch>
                </Router>
            </div>
        )
    }

}

export default App;