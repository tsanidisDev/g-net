import * as React from 'react';

export interface LoaderProps {
    className?: string;
}

function generateCircles(count, space) {
    var circlesArr = [];
    for (var i = 0; i < count; i++) {
        circlesArr.push(
            <circle
                key={"load-circle-" + i}
                className={"ldr__cr"}
                cx={`${12.5 + (i * space)}`}
                cy="12.5"
                fill="#0EF907" r="12.5"
                style={{
                    animationDelay: `${i * 0.25 * 0.5}s, ${i * 0.25 * 0.5}s`
                }}
            />);
    }

    return circlesArr;
}

export const Loader: React.SFC<LoaderProps> = (props) => {
    const cls = props.className || "";

    return (
        <div className={"ldr " + cls}>
            <svg
                height="150"
                width="150"
                fill="none"
                viewBox="0 0 109 25"
                xmlns="http://www.w3.org/2000/svg"
            >
                {generateCircles(3, 42)}
            </svg>
        </div>
    )
}
