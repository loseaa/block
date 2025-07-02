export function getRandomNumber(min:number,max:number):number{
    let d=max-min;
    return Math.floor(Math.random()*d+min);
}