import * as React from 'react';

export interface HomeProps {
    className?: string;
}

export interface HomeState {

}

export class Home extends React.Component<HomeProps, HomeState> {
    el: HTMLDivElement;
    constructor(p: HomeProps) {
        super(p);
    }

    render() {
        const { props, state } = this,
            cls = this.props.className || "";

        return (
            <div className={"home " + cls} ref={e => this.el = e}>
                im home
            </div>
        )
    }
}

export default Home;
