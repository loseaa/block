import { SquareGroup } from "../entities/SquareGroup";
import config from "../options/config";
import { IgameViewer } from "../type/types";
import { HTMLViewer } from "./HTMLviewer";

export class GameViewer implements IgameViewer{

    constructor(private tipEle:HTMLElement,private panelEle:HTMLElement) {
        this.init()
    }
    update(oldSqGroup: SquareGroup, newSqGroup: SquareGroup): void {
        oldSqGroup.squares.forEach(sq => {
            sq.view?.hide();
        })
        this.showPanel(oldSqGroup);
        this.showTip(newSqGroup);
    }

    init(){
        //设置tipEle的高度
        this.panelEle.style.height=`${config.ground.height*config.square.width}px`;
        this.panelEle.style.width=`${config.ground.width*config.square.width}px`;
        this.tipEle.style.height=`${config.tip.height*config.square.width}px`;
        this.tipEle.style.width=`${config.tip.width*config.square.width}px`;

    }

    showTip(sqGroup:SquareGroup): void {
        sqGroup.squares.forEach(sq => {
            let viewer=new HTMLViewer(sq,this.tipEle);
            sq.view=viewer;
            sq.view.show();
        })
    }
    showPanel(sqGroup:SquareGroup): void {
        sqGroup.squares.forEach(sq => {
            let viewer=new HTMLViewer(sq,this.panelEle);
            sq.view=viewer;
            sq.view.show();
        })
        
    }

}