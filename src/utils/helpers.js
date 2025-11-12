export function randomInt(min, max){
return Math.floor(Math.random()*(max-min+1))+min
}


export function generateArray(n, min=10, max=300){
const arr = [];
for(let i=0;i<n;i++) arr.push(randomInt(min,max));
return arr;
}