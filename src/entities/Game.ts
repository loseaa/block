import { SquareRule } from "../rules/SquareRule";
import { Direction, GameStatus } from "../type/types";
import { GameViewer } from "../views/Gameviewer";
import { produceGroupRandom } from "./produceGroup";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import config from "../options/config";

export class Game{
    private _state:GameStatus=GameStatus.init;
    // 计时器
    private _timer?:NodeJS.Timeout;
    private _currentGroup?:SquareGroup;
    private _nextGroup:SquareGroup=produceGroupRandom();
    private _exist:Square[]=[];
    constructor( private _viewer:GameViewer){

    }

    update(){
        this._currentGroup=this._nextGroup;
        SquareRule.resetCenterPoint(this._currentGroup,config.ground.height,config.ground.width);
        if(SquareRule.isOver(this._currentGroup!,this._exist))
        {
            this.over();
        }
        this._nextGroup=produceGroupRandom();
        

    }


    over(){
        console.log("over");
        this._timer&&clearInterval(this._timer); //clear the timer to stop the game, clearInterval is a method of NodeJS.Timeout, so we need to import NodeJS at the top of the file to use it.
        this._state=GameStatus.over;
    }

    start()
    {
        if(this._state===GameStatus.playing) return;
        this._state=GameStatus.playing;
        this.update();

        this._viewer.showTip(this._nextGroup);
        this._viewer.showPanel(this._currentGroup!);
        this.autoDrop();
    }

    // 触底检测
    touchBottom(){
        this._exist.push(...this._currentGroup!.squares);
        let removelines=this.need2Remove();
        if(removelines.length>0){
            removelines.forEach(index=>{
                this.removeLine(index);
            })
            this._exist.forEach(sq=>{
                sq.point={
                    x:sq.point.x,
                    y:sq.point.y+removelines.length
                }
            })

        }

        this.update();
        this._viewer.update(this._currentGroup!,this._nextGroup);
    }

    need2Remove():number[]{
        let removelines=[]
        for(let i=0;i<config.ground.height;i++){
            let line=this._exist.filter(sq=>sq.point.y===i); //filter the squares that are at the same line, and return the squares that are at the same line.
            if(line.length===config.ground.width-1){ //if the number of squares at the same line is equal to the width of the ground, return true.
                removelines.push(i); //push the line number to the removelines array.
            }
        }
        return removelines;
    }

    // 消除底部一行
    removeLine(index:number){
        let line=this._exist.filter(sq=>sq.point.y===index);
        line.forEach(sq=>{
            sq.view.hide(); //hide the square, and remove it from the exist array.
            this._exist.splice(this._exist.indexOf(sq),1);
        })
    }


    autoDrop(){
        if(this._state!==GameStatus.playing) return;
        if(this._timer) return 
        this._timer=setInterval(()=>{
            if(!SquareRule.canMove(this._currentGroup!,{x:this._currentGroup!.centerpoint.x,y:this._currentGroup!.centerpoint.y+1} ,this._exist))
            {
                this.touchBottom();
            }
            else{
                SquareRule.move(this._currentGroup!,Direction.down,this._exist);
                
            }
        },1000)
        
    }

    moveDown(){
        if(this._state!==GameStatus.playing) return;
        while(SquareRule.move(this._currentGroup!,Direction.down,this._exist)){
        }
        this.touchBottom();
    }

    moveLeft(){
        if(this._state!==GameStatus.playing) return;
        SquareRule.move(this._currentGroup!,Direction.left,this._exist);
    }

    moveRight(){
        if(this._state!==GameStatus.playing) return;
        SquareRule.move(this._currentGroup!,Direction.right,this._exist);
    }
    rotate(){
        if(this._state!==GameStatus.playing) return;
        SquareRule.rotate(this._currentGroup!,this._exist);
    }
}

