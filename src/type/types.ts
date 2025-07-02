import { SquareGroup } from "../entities/SquareGroup";

export interface Point{
    readonly x :number,
    readonly y:number
}
export interface IViewer{
    show():void,
    hide():void,
}

export type Points=Point[];

export enum Direction{
    left="left",
    right="right",
    down="down",
}

export enum GameStatus{
    init="init",
    playing="playing",
    pause="pause",
    over="over",
}

export interface IgameViewer{
    showTip(sqGroup:SquareGroup): void,
    showPanel(sqGroup:SquareGroup): void,
    update(oldSqGroup:SquareGroup,newSqGroup:SquareGroup):void,
}
