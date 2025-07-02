import { Point, Points } from "../type/types";
import { HTMLViewer } from "../views/HTMLviewer";
import { Square } from "./Square";

export class SquareGroup {
    private _squares: Square[] = [];
    
    constructor(private _centerpoint: Point,private color:string,private _shape:Points) {
        _shape.forEach(p => {
            let t=new Square({x:p.x+_centerpoint.x,y:p.y+_centerpoint.y},color);
            this._squares.push(t);
        })

    }
    set centerpoint(value:Point){
        this._centerpoint=value;
        this._squares.forEach((sq,i)=>{
            sq.point={x:this._centerpoint.x+this._shape[i].x,y:this._centerpoint.y+this._shape[i].y};
        })
    }
    get centerpoint(){
        return this._centerpoint;

    }
    get shape(){
        return this._shape;
    }

    get squares(){
        return this._squares;
    }

    protected isClock=true

    afterRotate():Points
    {
        let res:Points=[];
        if(this.isClock)
        {
            this._shape.forEach((p,i)=>{
                res.push({x:-p.y,y:p.x});
            })
        }
        else{
            this._shape.forEach((p,i)=>{
                res.push({x:p.y,y:-p.x});
            })
        }
        return res
    }

    rotate():boolean{
        let res=this.afterRotate();
        this._shape=res;
        this._shape.forEach((p,i)=>{
            this._squares[i].point={x:this._centerpoint.x+this._shape[i].x,y:this._centerpoint.y+this._shape[i].y};
        })
        return true;
    }
    
    
}