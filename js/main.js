const local = window.document.querySelector('#pricipal');
const tudo = window.document.querySelector('#bd'),indicador = window.document.querySelector("#pd");
const placar = window.document.querySelector('#placar'), area = [window.document.querySelector('#one'),window.document.querySelector('#two'),window.document.querySelector('#three'),window.document.querySelector('#four')];

var pontos = 0;
var controle_animation, velocidade = 2000,jogo = false;
var valor, passos = 0;

//inicio
function pre_play () {
let dv_play = window.document.createElement('img');
dv_play.setAttribute('class','pre_start');
dv_play.setAttribute("src","./imgs/icon.png")
local.setAttribute('onclick','start()');
placar.appendChild(dv_play);
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
var feito = 0;

function start () {
    local.removeAttribute('onclick');
    placar.innerHTML= '';
    let padrao = gerador(6);
    passos = padrao.length;
    //let feito = 0;
    placar.innerHTML = `passos :<br>${passos}`;
    controle_animation = setInterval(()=>{if (feito === padrao.length) {
        clearInterval(controle_animation);
        leitor(padrao);
    }else{
    console.log(`${padrao} / ${padrao[feito]}`);
    switch (padrao[feito]) {
        case 1: 
        local.style.border="100px solid white";
            local.style.borderTop="100px solid green";
            break
        case 2 :
            local.style.border="100px solid white";
            local.style.borderRight="100px solid red";
            break
        case 3 :
            local.style.border="100px solid white";
            local.style.borderBottom="100px solid yellow";
            break
        case 4 :
            local.style.border="100px solid white";
            local.style.borderLeft="100px solid blue";
            break
        case 5:

            break
            //finalizado
    }
    ++feito;
    console.log(feito);
}}, velocidade);
    console.log('chegou aqui');
}
var padrão_ativo;
var num_pass;
var passo_avaliado;
//var your_p = [];
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
           indicador.innerText = `adicionado : ${valor}`;
           ++num_pass;
           console.log(`num pass : ${num_pass}`);
           passo_avaliado = padrão_ativo[num_pass];
           placar.innerText = `${num_pass}/${padrão_ativo.length}`;
           if (passo_avaliado === undefined) {
               ++pontos;
               console.log('-------VITÓRIA-----'+pontos);
               jogo = false;
               start();
           }
       }else{
        console.log('erro!')
       }
    }
}

function sensor (tp) {
    switch (tp) {
        case 1 : 
            valor = 4;
            console.log('click top');
            break
        case 2 :
            valor = 1;
            console.log('click bottom');
            break
        case 3 :
            valor = 3;
            console.log('click left');
            break
        case 4 :
            valor = 2;
            console.log('click rigth');
            break
    }

    leitor(undefined, "auto");
}