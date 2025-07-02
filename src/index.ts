import { produceGroupRandom } from "./entities/produceGroup";
import { Square } from "./entities/Square";
import { SquareGroup } from "./entities/SquareGroup";
import { Direction, Points } from "./type/types";
import { HTMLViewer } from "./views/HTMLviewer";
import { SquareRule } from "./rules/SquareRule";
import { Game } from "./entities/Game";
import { GameViewer } from "./views/Gameviewer";

const game=new Game(new GameViewer(document.getElementById("tip")!,document.getElementById("panel")!));
game.start();

// 键盘绑定w事件
document.addEventListener("keydown",(e)=>{
    if(e.key==="a"){
        game.moveLeft();
    }else if(e.key==="d"){
        game.moveRight();
     }
    else if(e.key==="s"){
        game.moveDown();
    }
    // 空格
    else if(e.key===" ") {
        game.rotate();
    }

})






