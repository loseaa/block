import { Square } from "../entities/Square";
import { IViewer } from "../type/types";
import config from "../options/config"

export class HTMLViewer implements IViewer{

    private _ele?: HTMLElement;
    constructor(private _sq:Square,private _root:HTMLElement) {
        
    }
    show(): void {
        
        if(!this._ele){
            this._ele=document.createElement("div")
            this._root.appendChild(this._ele);
            this._ele.style.width=config.square.width+"px";
            this._ele.style.height=config.square.height+"px";
            // 设为边框盒
            this._ele.style.boxSizing="border-box";
            // 设置边框
            this._ele.style.border="1px solid #ccc";
            //渐变动画
            this._ele.style.transition="all 0.5s";
            // absolute
            this._ele.style.position="absolute";
        }

        
        this._ele.style.top=this._sq.point.y*config.square.width+"px";
        this._ele.style.left=this._sq.point.x*config.square.height+"px";
      

        this._ele.style.backgroundColor=this._sq.color;
    }
    hide(): void {
        this._ele?.remove();
    }
    
}