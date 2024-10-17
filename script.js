const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');
const info1 = document.getElementById('info1');
const info2 = document.getElementById('info2');
const info3 = document.getElementById('info3');
const info4 = document.getElementById('info4');
const winingColor = document.getElementById('winingColor');

let win=0;
let width = 80;
let height = 80;
let minwin=2000;

let re = 0, gr = 0, bl = 0, ye = 0;

let karta = [];

for (let i = 0; i < 80; i++) {
  karta[i] = [];
  for (let j = 0; j < 80; j++) {
    karta[i][j] = 0; 
  }
}

function rand(){return Math.floor(Math.random()*40)}
let x1 = rand();
let y1 = rand();
let x2 = rand()+40;
let y2 = rand();
let x3 = rand();
let y3 = rand()+40;
let x4 = rand()+40;
let y4 = rand()+40;

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  re = 0;
  gr = 0;
  bl = 0;
  ye = 0;
  for (let i = 0; i < 80; i++) {
    for (let j = 0; j < 80; j++) {
      if(karta[i][j] == 1){  
        ctx.fillStyle = '#FF8181';
        ctx.fillRect(i*10, j*10, 10, 10);re++;
      }
      if(karta[i][j] == 2){  
        ctx.fillStyle = '#81FF81';
        ctx.fillRect(i*10, j*10, 10, 10);gr++;
      }
      if(karta[i][j] == 3){  
        ctx.fillStyle = '#8181FF';
        ctx.fillRect(i*10, j*10, 10, 10);bl++;
      }
      if(karta[i][j] == 4){  
        ctx.fillStyle = '#FFFF81';
        ctx.fillRect(i*10, j*10, 10, 10);ye++;
      }
    }
  }
  drawer('red',x1,y1)
  drawer('green',x2,y2)
  drawer('blue',x3,y3)
  drawer('yellow',x4,y4)
  let colorCounts = [
    { name: 'Red', count: re },
    { name: 'Green', count: gr },
    { name: 'Blue', count: bl },
    { name: 'Yellow', count: ye }
  ];

  colorCounts.sort((a, b) => b.count - a.count);

  info1.innerHTML = "1. "+ colorCounts[0].name + " " + colorCounts[0].count;
  info2.innerHTML = "2. "+ colorCounts[1].name + " " + colorCounts[1].count;
  info3.innerHTML = "3. "+ colorCounts[2].name + " " + colorCounts[2].count;
  info4.innerHTML = "4. "+ colorCounts[3].name + " " + colorCounts[3].count;
  if (colorCounts[0].count>=minwin){win=1;winColor=colorCounts[0].name}
}

function updateKarta(){
  [x1,y1]=rotation(x1,y1,1);
  karta[x1][y1]=1;

  [x2,y2]=rotation(x2,y2,2);
  karta[x2][y2]=2;

  [x3,y3]=rotation(x3,y3,3);
  karta[x3][y3]=3;
  
  [x4,y4]=rotation(x4,y4,4);
  karta[x4][y4]=4;
}

function rotation(x,y,index){
  let x1=x,y1=y;
  r=Math.floor(Math.random()*4)+1;
  switch(r){
    case 1:x=check(x+1,width);break;
    case 2:x=check(x-1,width);break;
    case 3:y=check(y+1,height);break;
    case 4:y=check(y-1,height);break;
  }
  if(karta[x][y]==index){
    x=x1;y=y1;
    r=Math.floor(Math.random()*4)+1;
    switch(r){
      case 1:x=check(x+1,width);break;
      case 2:x=check(x-1,width);break;
      case 3:y=check(y+1,height);break;
      case 4:y=check(y-1,height);break;
    }
  }
  return [x,y];
}

function drawer(color,i,j){
  ctx.fillStyle = '#000';
  ctx.fillRect(i*10, j*10, 10, 10);
  ctx.fillStyle = color;
  ctx.fillRect(i*10+1, j*10+1, 9, 9);
}

function check(t,max){
  if (t < 0) return max - 1;
  if (t >= max) return 0;
  return t;
}

function mainLoop() {
  if (win==0){
  updateKarta();
  draw();
  setTimeout(mainLoop, 10);
  winingColor.innerText="";
  }else{
    winingColor.style.color = winColor; 
    winingColor.innerText=winColor+" Win";
    console.log(winColor);
    setTimeout(mainLoop, 3000);
    win=0;
    re = 0, gr = 0, bl = 0, ye = 0;
    x1 = rand();
    y1 = rand();
    x2 = rand()+40;
    y2 = rand();
    x3 = rand();
    y3 = rand()+40;
    x4 = rand()+40;
    y4 = rand()+40;
    for (let i = 0; i < 80; i++) {
      karta[i] = [];
      for (let j = 0; j < 80; j++) {
        karta[i][j] = 0; 
      }
    }
  }
}

mainLoop();

/*
  [x1,y1]=rotation(x1,y1);
  if(karta[x1][y1]==1){
    karta[x1][y1]=0
  }else{
    karta[x1][y1]=1;
  }
  [x2,y2]=rotation(x2,y2);
  if(karta[x2][y2]==2){
    karta[x2][y2]=0
  }else{
    karta[x2][y2]=2;
  }
  [x3,y3]=rotation(x3,y3);
  if(karta[x3][y3]==3){
    karta[x3][y3]=0
  }else{
    karta[x3][y3]=3;
  }
  [x4,y4]=rotation(x4,y4);
  if(karta[x4][y4]==4){
    karta[x4][y4]=0
  }else{
    karta[x4][y4]=4;
  }
*/