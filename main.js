// inicializacion de variable
let tarjetasdestapadas=0;
let tarjetauno =null;
let tarjetados =null;
let primerresultado =null;
let segundoresulado =null;
let movimientos =0;
let aciertos=0;
let temporizador =false;
let timer=30;
let timerinicial=30;
let tiemporegresivo=null;

//apuntando a doc html
let mostrarmovimientos = document.getElementById('movimientos');
let mostraraciertos =document.getElementById('aciertos');
let mostrartiempo =document.getElementById('tiempo');

//generacion de numeros aleatorios
let numeros =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5})
console.table(numeros)

//funciones
function contarTiempo(){
   tiemporegresivo= setInterval(()=>{
        timer--;
        mostrartiempo.innerHTML=`Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiemporegresivo);
            bloqueartarjeta();
        }
    },1000)
}

function bloqueartarjeta(){
    for (let i = 0; i <= 15; i++) {
        let tarjetabloqueada = document.getElementById(i);
        tarjetabloqueada.innerHTML=numeros[i];
        tarjetabloqueada.disabled=false;
    }
}

//function principal
function destapar(id){
    if (temporizador==false) {
        contarTiempo();
        temporizador=true;  
        
    }
    tarjetasdestapadas++;   
    console.log(tarjetasdestapadas);
    if(tarjetasdestapadas ==1){
        //mostrar primer numero
        tarjetauno =document.getElementById(id);
        primerresultado = numeros[id];
        tarjetauno.innerHTML=primerresultado;

        //deshabilitar primer boton
        tarjetauno.disabled=true;
    }
    else if(tarjetasdestapadas==2){
        tarjetados=document.getElementById(id);
        segundoresulado= numeros[id];
        tarjetados.innerHTML = segundoresulado;

        //deshabilitar segundo boton
        tarjetados.disabled=true;

        //incrementar movimientos.
        movimientos++;
        mostrarmovimientos.innerHTML=`Movimientos: ${movimientos}`;
        if (primerresultado==segundoresulado) {
            tarjetasdestapadas=0;

            //
            aciertos++;
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos==8) {
                clearInterval(tiemporegresivo);
                mostraraciertos.innerHTML=`Aciertos: 🥳 ${aciertos} `;
                mostrartiempo.innerHTML=`Genial 😎 acabaste en: ${timerinicial - timer} segundos`;
                
            }
        }else{
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjetauno.innerHTML='';
                tarjetados.innerHTML='';
                tarjetauno.disabled=false;
                tarjetados.disabled=false;
                tarjetasdestapadas=0;

            },800)
        }
    }

}