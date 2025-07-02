import { Point, Points } from "../type/types";
import { SquareGroup } from "./SquareGroup";

export class lineShape extends SquareGroup{
    constructor( _centerpoint: Point, color:string) {
        super(_centerpoint,color,[
            {x:0,y:0},
            {x:1,y:0},
            {x:2,y:0},
            {x:3,y:0}
        ]); // 调用父类的构造函数，传入初始坐标和颜色

    }
    rotate():boolean{
        super.rotate();
        this.isClock=!this.isClock;
        return true;
    }
}

export class boxShape extends SquareGroup{
    constructor( _centerpoint: Point, color:string) {
        super(_centerpoint,color,[
            {x:0,y:0},
            {x:0,y:1},
            {x:1,y:0},
            {x:1,y:1}
        ]); // 调用父类的构造函数，传入初始坐标和颜色
    }
    rotate(): boolean {
        return true; // 不进行旋转操作，直接返回 true，表示旋转成功;
    }
}

export class zShape extends SquareGroup{
    constructor( _centerpoint: Point, color:string) {
        super(_centerpoint,color,[
            {x:0,y:0},
            {x:0,y:1},
            {x:1,y:1},
            {x:1,y:2}
        ]); // 调用父类的构造函数，传入初始坐标和颜色
    }
    rotate(): boolean {
        super.rotate();
        this.isClock=!this.isClock;
        return true;
    }
}

export class LShape extends SquareGroup{
    constructor( _centerpoint: Point, color:string) {
        super(_centerpoint,color,[
            {x:0,y:0},
            {x:0,y:-1},
            {x:0,y:1},
            {x:1,y:1}
        ]); // 调用父类的构造函数，传入初始坐标和颜色
    }
}

export class tShape extends SquareGroup{
    constructor( _centerpoint: Point, color:string) {
        super(_centerpoint,color,[
            {x:0,y:0},
            {x:-1,y:0},
            {x:0,y:1},
            {x:1,y:0}
        ]
        ); // 调用父类的构造函数，传入初始坐标和颜色
    }
}

export const shapes=[lineShape,boxShape,zShape,LShape,tShape];

export const colors:string[]=[
    "blue",
    "green",
    "red",
    "yellow",
    "orange",
    "purple",
    "cyan",
    "magenta",
    "teal",
    "maroon",
]
