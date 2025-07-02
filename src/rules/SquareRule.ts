import { SquareGroup } from "../entities/SquareGroup";
import { Direction, Point, Points } from "../type/types";
import options from "../options/config";
import { Square } from "../entities/Square";
export class SquareRule{
    static canMove(sqGroup:SquareGroup,targetPoint:Point,exists:Square[]):boolean{
        if(sqGroup.shape.some(p=> p.x+targetPoint.x<0 || p.x+targetPoint.x>options.ground.width || p.y+targetPoint.y>options.ground.height))
        return false; //if the square is out of the ground return false, else return true.
        if(sqGroup.shape.some(q => 
            exists.some(exist =>exist.point.x===q.x+targetPoint.x&& exist.point.y===q.y+targetPoint.y    )
        ))
        {
            return false;
        }
        return true;
    }
    static move(SquareGroup:SquareGroup,targetPoint:Point,exist:Square[]):boolean;
    static move(SquareGroup:SquareGroup,dir:Direction,exist:Square[]):boolean;
    static move(sq:SquareGroup,targetPointOrDirection:Point|Direction,exist:Square[]):boolean{
        //类型保护函数
        function isPoint(targetPointOrDirection:Point|Direction):targetPointOrDirection is Point{
            return (targetPointOrDirection as Point).x!==undefined;
        }
        if(isPoint(targetPointOrDirection)){
            if(this.canMove(sq,targetPointOrDirection,exist)){
                sq.centerpoint=targetPointOrDirection;
                return true;
            }else{
                return false;}
        }
        else{
            switch (targetPointOrDirection) {
                case Direction.left:
                    return this.move(sq,{x:sq.centerpoint.x-1,y:sq.centerpoint.y},exist);
                case Direction.right:
                    return this.move(sq,{x:sq.centerpoint.x+1,y:sq.centerpoint.y},exist);
                case Direction.down:
                    return this.move(sq,{x:sq.centerpoint.x,y:sq.centerpoint.y+1},exist);
            }
        }

    }

    static canRotate(sq:SquareGroup,exists:Square[]):boolean{
        let res=sq.afterRotate();
        if(res.some(p=> p.x+sq.centerpoint.x<0 || p.x+sq.centerpoint.x>=options.ground.width || p.y+sq.centerpoint.y>=options.ground.height)){
            return false;}
        if(res.some(q => exists.some(exist =>exist.point.x===q.x&& exist.point.y===q.y ) )){
            return false;
        }

        return true;
    }

    static rotate(sq:SquareGroup,exist:Square[]):boolean{
        if(this.canRotate(sq,exist)){
            sq.rotate();
            return true;}
            return false;
    }

    static isOver(sq:SquareGroup,exists:Square[]):boolean{
      if  (sq.squares.some(q=>exists.some(exist =>exist.point.x===q.point.x&& exist.point.y===q.point.y )))
      {
        return true;
      }
      return false;
    }
    
}