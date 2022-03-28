//const local = window.document.querySelector('#pricipal');
const tudo = window.document.querySelector('#bd'),indicador = window.document.querySelector("#pd"),hearts = window.document.querySelector('.heart'), points = window.document.querySelector('.pontuaco'),export_pass = window.document.querySelector(".pass"), resultado =window.document.querySelector('.resultado');
const placar = window.document.querySelector('#painel'), area = [window.document.querySelector('#one'),window.document.querySelector('#two'),window.document.querySelector('#three'),window.document.querySelector('#four')];

var pontos = 0,vidas;
var controle_animation, velocidade = 2000,jogo = false;
var valor, passos = 0;

//inicio
function pre_play () {
    vidas = 5;
    hearts.innerText  = `hearts : ${vidas}`;
    let dv_play = window.document.createElement('img');
    dv_play.setAttribute('class','pre_start');
    dv_play.setAttribute("src","./imgs/icon.png")
    dv_play.setAttribute('onclick','start()');
    placar.appendChild(dv_play);
    indicador.innerText = `pontos : ${pontos}`;
}
 pre_play();
function gerador (q) {
    let response = [];
    for (let i = 0; i  < q; ++i) {
        response.push(Math.ceil(Math.random()*4));
        //console.log(response[i])
    }
    //console.log(response)
    return response;
}
//funcao de teste
//var feito = 0;

function start () {
    window.document.querySelector(".pre_start").style.display="none";
    resultado.style.display="none";
    let level = pontos + 1;
    let padrao = gerador(level);
    passos = padrao.length;
    let feito = 0;
    export_pass.innerHTML = `passos : ${passos}`;
    controle_animation = setInterval(()=>{if (feito === padrao.length) {
        clearInterval(controle_animation);
        area[0].style.backgroundColor="green";
            area[1].style.backgroundColor="red";
            area[2].style.backgroundColor="yellow";
            area[3].style.backgroundColor="blue";
        leitor(padrao);
    }else{
        switch (padrao[feito]) {
            case 1:
                area[0].style.animation="ending 0.5s linear 1";
                break;
            case 2:
                area[1].style.animation="ending 0.5s linear 1";
                break
            case 3:
                area[2].style.animation="ending 0.5s linear 1";
                break
            case 4:
                area[3].style.animation="ending 0.5s linear 1";
                break
        }
        setTimeout(()=>{
    console.log(`${padrao} / ${padrao[feito]}`);
    switch (padrao[feito]) {
        case 1: 
        area[1].style.backgroundColor="white";
        area[2].style.backgroundColor="white";
        area[3].style.backgroundColor="white";

            area[0].style.animation="none";
            area[0].style.backgroundColor="green";
            break
        case 2 :
            area[0].style.backgroundColor="white";
            area[2].style.backgroundColor="white";
            area[3].style.backgroundColor="white";
            
            area[1].style.animation="none";
            area[1].style.backgroundColor="red";
            break
        case 3 :
            area[0].style.backgroundColor="white";
            area[1].style.backgroundColor="white";
            area[3].style.backgroundColor="white";

            area[2].style.animation="none";
            area[2].style.backgroundColor="yellow";
            break
        case 4 :
            area[0].style.backgroundColor="white";
            area[1].style.backgroundColor="white";
            area[2].style.backgroundColor="white";

            area[3].style.animation="none";
            area[3].style.backgroundColor="blue";
            break
    }
    ++feito;
    console.log(feito);
}, 250)}}, velocidade);
    console.log('chegou aqui');
}
var padrão_ativo;
var num_pass;
var passo_avaliado;
function leitor (padrao=undefined, autorizção = null) {
    if (padrao) {
        jogo = true;
        padrão_ativo = padrao;
        num_pass = 0;
        console.log(`padrao ativado : ${padrão_ativo}`);
        passo_avaliado = padrão_ativo[0];
    }
    if (jogo && autorizção === "auto"){
        console.log(`passo_avaliado : ${passo_avaliado} / valor : ${valor}`);
       if (valor === passo_avaliado) {
           ++num_pass;
           //console.log(`num pass : ${num_pass}`);
           passo_avaliado = padrão_ativo[num_pass];
           export_pass.innerText = `acertos : ${num_pass}/${padrão_ativo.length}`;
           if (passo_avaliado === undefined) {
               ++pontos;
               indicador.innerText = `pontos : ${pontos}`;
               console.log('-------VITÓRIA-----'+pontos);
               resultado.style.display="block";
               resultado.innerHTML = `VITÓRIA       <small>próximo nivel</small>`;
               resultado.style.backgroundColor=`lime`;
               area.forEach(item => item.style.backgroundColor=`gold`);
               jogo = false;
               //next level
               //window.document.querySelector(".pre_start").style.display="block";
               resultado.setAttribute('onclick','start()');
               //start();
           }
       }else{
        console.log('erro!');
        --vidas;
        hearts.innerText  = `hearts : ${vidas}`;
        hearts.style.animation="not 1s linear 1";
        setTimeout(()=>{hearts.style.animation="none";},1100);
            if (vidas === 0) {
                area.forEach(item => item.style.backgroundColor=`orange`);
                hearts.innerText  = `you lose!`;
                resultado.style.display="block";
                resultado.innerHTML = `DERROTA      <small>tentar novamente</small>`;
                resultado.setAttribute('onclick','restart()');
                resultado.style.backgroundColor=`red`;
                jogo = false;

            }

       }
    }
}
function restart () {
    location.reload();
}
function sensor (tp) {
    switch (tp) {
        case 1 : 
            valor = 1;
            console.log('click top');
            break
        case 2 :
            valor = 2;
            console.log('click bottom');
            break
        case 3 :
            valor = 3;
            console.log('click left');
            break
        case 4 :
            valor = 4;
            console.log('click rigth');
            break
    }

    leitor(undefined, "auto");
}