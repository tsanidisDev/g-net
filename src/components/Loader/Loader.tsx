import * as React from 'react';

export interface LoaderProps {
    className?: string;
}

export const Loader: React.SFC<LoaderProps> = (props) => {
    const cls = props.className || "";

    return (
        <div className={"loader " + cls}>
            <svg
                height="25"
                width="109"
                fill="none"
                viewBox="0 0 109 25"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="12.5" cy="12.5" fill="#0EF907" r="12.5" />
                <circle cx="54.5" cy="12.5" fill="#0EF907" r="12.5" />
                <circle cx="96.5" cy="12.5" fill="#0EF907" r="12.5" />
            </svg>
        </div>
    )
}
