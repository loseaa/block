import { SquareGroup } from "../entities/SquareGroup";
import { IgameViewer } from "../type/types";
import { HTMLViewer } from "./HTMLviewer";

export class GameViewer implements IgameViewer{

    constructor(private tipEle:HTMLElement,private panelEle:HTMLElement) {
        
    }
    update(oldSqGroup: SquareGroup, newSqGroup: SquareGroup): void {
        
        oldSqGroup.squares.forEach(sq => {
            sq.view?.hide();
        })
        this.showPanel(oldSqGroup);
        this.showTip(newSqGroup);
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