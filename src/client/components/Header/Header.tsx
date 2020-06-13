import * as React from 'react';

export interface HeaderProps {
    className?: string;
}

export interface HeaderState {

}

export class Header extends React.Component<HeaderProps, HeaderState> {
    el: HTMLDivElement;
    constructor(p: HeaderProps) {
        super(p);
    }

    render() {
        const { props, state } = this,
            cls = this.props.className || "";

        return (
            <div className={"hdr " + cls} ref={e => this.el = e}>

            </div>
        )
    }
}
