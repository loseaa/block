import { Point, Points } from "../type/types";
import { getRandomNumber } from "../utils/utils";
import { HTMLViewer } from "../views/HTMLviewer";
import {colors,shapes} from "./shapes"
import { SquareGroup } from "./SquareGroup";

export function produceGroupRandom(){
    let centerpoint:Point={x:1,y:1};
    let color=colors[getRandomNumber(0,colors.length)];
    let group=new shapes[getRandomNumber(0,shapes.length)](centerpoint,color);
    // group.squares.forEach(sq => {
    //     let viewer=new HTMLViewer(sq,document.getElementById("root") as HTMLElement);
    //     sq.view=viewer;
    //     sq.view.show();
    // });

    return group;
}

