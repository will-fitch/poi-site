import { JsxEmit } from "typescript";

export function Background(width: number, height: number, elements: JSX.Element[]) {

    return (
        <svg
            height={height}
            width={width}
            xmlns="http://www.w3.org/2000/svg">
                <circle r={300} cx={300} cy={300} fill="lightgrey" />
                <circle r={6} cx={300} cy={300} fill="black" />
                {elements}
        </svg>
    );
}

export function AngledText(text: string, angle: number) {
    return (
        <text text-anchor="start" style={{ userSelect: "none" }} alignment-baseline="middle" transform={"translate(300, 300) rotate("+angle+") translate(15, 0)"}>{text}</text>
    );

}