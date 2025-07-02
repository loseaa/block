import { IViewer, Point } from "../type/types";
export class Square  {
    private  _view?:IViewer
    constructor(private _point:Point,private _color:string){

    }
    set view(view:IViewer){
        this._view = view;
    }

    get view():IViewer{
        return this._view!;
    }
    set point(point:Point){
        this._point = point;
        this.view?.show();// 当坐标改变时，重新绘制
    }
    get point():Point{
        return this._point;
    }

    set color(color:string){
        this._color = color;
    }
    get color():string{
        return this._color;
    }

    
}