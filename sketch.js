const height = 800;
const width = 800;

let boundriesX = [width/5, 4*width/5];
let boundriesY = [4*height/5, height/5];

let listaPontos = [];

let resolution = 4000;

const bgColor = 255;

let l;
let lInit;

let modo = 1;


function setup() {
  createCanvas(height, width);
  background(bgColor);
  stroke(126);
  line(boundriesX[0],
       height/2,
       boundriesX[1],
       height/2);

  line(width/2,
       boundriesY[0],
       width/2,
       boundriesY[1]);
       
  button1 = createButton("Tudo");
  button1.mousePressed(plotInterpolacao1);

  button2 = createButton("7 em 7");
  button2.mousePressed(plotInterpolacao7);

  button3 = createButton("5 em 5");
  button3.mousePressed(plotInterpolacao5);

  button4 = createButton("3 em 3");
  button4.mousePressed(plotInterpolacao3);
  

}

function draw() {

  for(let i = 0; i < listaPontos.length; i++){
    point(listaPontos[i].x, listaPontos[i].y);
    stroke(255,0,0);
    strokeWeight(4);
  }
}

function mouseClicked() {
  valueX = mouseX;
  valueY = mouseY;
  if( valueX > boundriesX[0] &&
      valueX < boundriesX[1] &&
      valueY < boundriesY[0] && 
      valueY > boundriesY[1]){


      listaPontos.push(createVector(valueX, valueY));
      listaPontos.sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0));
  }
  if(modo == 1){
    plotInterpolacao1();
  }else if(modo == 7){
    plotInterpolacao7();
  }else if(modo == 5){
    plotInterpolacao5();
  }else if(modo == 3){
    plotInterpolacao3();
  }
}

function interpolar(lista){
  if(lista.length > 1){
    l = 0;
    l = new Lagrange(lista[0].x,
                     lista[0].y,
                     lista[1].x,
                     lista[1].y);
  
  for(var i = 2; i < lista.length; i++){
  let index = l.addPoint(lista[i].x, lista[i].y);
  }
  if(lInit == undefined) lInit = l;

  stroke(255,100,100);
  strokeWeight(1);

  var x0, y0, x1, y1;
  var i = 0;
  const inicio = lista[0].x;
  const final = lista[lista.length -1].x;
  while((inicio + i*Math.abs(boundriesX[1] - boundriesX[0])/resolution) < final){
    x0 = (inicio + i*(Math.abs(boundriesX[1] - boundriesX[0])/resolution));
    y0 = l.valueOf(x0);
    x1 = (inicio + (i+1)*(Math.abs(boundriesX[1] - boundriesX[0])/resolution));
    y1 = l.valueOf(x1);

    line(x0, y0, x1, y1);
    i++;
  }
  }
}

function finalizarInterpolacao(x){
  stroke(255,100,100);
  strokeWeight(1);
  var x0, y0, x1, y1;
  const inicio = x;
  var i = 0;
  while(inicio + i*(Math.abs(boundriesX[1] - boundriesX[0])/resolution)  < width){
    x0 = (inicio + i*(Math.abs(boundriesX[1] - boundriesX[0])/resolution));
    console.log(x0);
    y0 = l.valueOf(x0);
    x1 = (inicio + (i+1)*(Math.abs(boundriesX[1] - boundriesX[0])/resolution));
    y1 = l.valueOf(x1);

    line(x0, y0, x1, y1);
    i++;
  }
}

function iniciarInterpolacao(){
  lista = listaPontos;
  stroke(255,100,100);
  strokeWeight(1);
  var x0, y0, x1, y1;
  var i = 0;
  const inicio = 0;
  while((inicio + i*Math.abs(boundriesX[1] - boundriesX[0])/resolution) < lista[0].x){
    x0 = (inicio + i*(Math.abs(boundriesX[1] - boundriesX[0])/resolution));
    y0 = lInit.valueOf(x0);
    x1 = (inicio + (i+1)*(Math.abs(boundriesX[1] - boundriesX[0])/resolution));
    y1 = lInit.valueOf(x1);

    line(x0, y0, x1, y1);
    i++;
  }
}

function plotInterpolacao1(){
  lInit = undefined;
  modo = 1;
  reset();

  interpolar(listaPontos);
  iniciarInterpolacao();
  finalizarInterpolacao(listaPontos[listaPontos.length -1].x);
}

function plotInterpolacao3(){
  lInit = undefined;
  modo = 3;
  reset();
  var resto = listaPontos.length % 3;
  var listaTemp = [];
  var listaResto = [];
  for(var i = 0; i < resto; i++){
    listaResto.push(listaPontos[listaPontos.length - resto + i]);
  }
  if(resto == 1){
    listaResto == listaPontos.slice(listaPontos.length -3, listaPontos.length -1);
  }
  if(listaResto.length == 0) listaResto.push(listaPontos[listaPontos.length -1])
  for(var i = 0; i <= Math.ceil(listaPontos.length/3); i++){
    if(i==0)listaTemp = listaPontos.slice(0, 3);
    else listaTemp = listaPontos.slice((i * 3)-1, ((i + 1)*3))
    interpolar(listaTemp);
  }
  //interpolar(listaResto);
  iniciarInterpolacao();
  finalizarInterpolacao(listaPontos[listaPontos.length -1].x);
}

function plotInterpolacao5(){
  lInit = undefined;
  modo = 5;
  reset();
  var resto = listaPontos.length % 5;
  var listaTemp = [];
  var listaResto = [];
  for(var i = 0; i < resto; i++){
    listaResto.push(listaPontos[listaPontos.length - resto + i]);
  }
  if(resto == 1){
    listaResto == listaPontos.slice(listaPontos.length -5, listaPontos.length -1);
  }
  if(listaResto.length == 0) listaResto.push(listaPontos[listaPontos.length -1])
  for(var i = 0; i <= Math.ceil(listaPontos.length/5); i++){
    if(i==0)listaTemp = listaPontos.slice(0, 5);
    else listaTemp = listaPontos.slice((i * 5)-1, ((i + 1)*5))
    interpolar(listaTemp);
  }
  //interpolar(listaResto);
  iniciarInterpolacao();
  finalizarInterpolacao(listaPontos[listaPontos.length -1].x);
}

function plotInterpolacao7(){
  lInit = undefined;
  modo = 7;
  reset();
  var resto = listaPontos.length % 7;
  var listaTemp = [];
  var listaResto = [];
  for(var i = 0; i < resto; i++){
    listaResto.push(listaPontos[listaPontos.length - resto + i]);
  }
  if(listaResto.length == 0) listaResto.push(listaPontos[listaPontos.length -1])
  for(var i = 0; i <= Math.ceil(listaPontos.length/7); i++){
    if(i==0)listaTemp = listaPontos.slice(0, 7);
    else listaTemp = listaPontos.slice((i * 7)-1, ((i + 1)*7))
    interpolar(listaTemp);
  }
  //interpolar(listaResto);
  iniciarInterpolacao();
  finalizarInterpolacao(listaPontos[listaPontos.length -1].x);
}


function reset(){
  background(bgColor);
  stroke(126);
  strokeWeight(2);
  line(boundriesX[0],
    height/2,
    boundriesX[1],
    height/2);

  line(width/2,
      boundriesY[0],
      width/2,
      boundriesY[1]);
}


class Lagrange{
  constructor(x1, y1, x2, y2) {
   
   this.xs = [x1, x2];
   this.ys = [y1, y2];
   this.ws = [];
   this._updateWeights();
 }
 
 /**
  * Adds a new point to the polynomial. L(x) = y
  * @return {Number} The index of the added point. Used for changing the point. See changePoint.
  */
     addPoint(x, y) {
         this.xs.push(x);
         this.ys.push(y);
         this._updateWeights();
         return this.xs.length-1;
     }
 
 /**
  * Changes a previously added point.
  */
     changePoint(index, x, y) {
         this.xs[index] = x;
         this.ys[index] = y;
         this._updateWeights();
     }
 
 /**
  * Recalculate barycentric weights.
  */
     _updateWeights() {
         var k = this.xs.length;
         var w;
         
         for (var j = 0; j < k; ++j) {
             w = 1;
             for (var i = 0; i < k; ++i) {
                 if (i != j) {
                     w *= this.xs[j] - this.xs[i];
                 }
             }
             this.ws[j] = 1/w;
         }
     }
 
 /**
  * Calculate L(x)
  */
     valueOf(x) {
         var a = 0;
         var b = 0;
         var c = 0;
         
         for (var j = 0; j < this.xs.length; ++j) {
             if (x != this.xs[j]) {
                 a = this.ws[j] / (x - this.xs[j]);
                 b += a * this.ys[j];
                 c += a;
             } else {
                 return this.ys[j];
             }
         }
         
         return b / c;
     }
 }
