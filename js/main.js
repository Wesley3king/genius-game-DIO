const local = window.document.querySelector('#principal'), tudo = window.document.querySelector('#bd');
const placar = window.document.querySelector('#placar'), area = [window.document.querySelector('#one'),window.document.querySelector('#two'),window.document.querySelector('#three'),window.document.querySelector('#four')];

var pontos = 0;
var controle_animation, velocidade = 2000,jogo = false;
var valor, passos = 0;

//inicio
function pre_play () {
let dv_play = window.document.createElement('div');
dv_play.setAttribute('class','pre_start');
dv_play.addEventListener('click',start);
placar.appendChild(dv_play);
}
pre_play();
function gerador (q) {
    let response = [];
    for (let i = 0; i  === q; ++i){
        response.push(Math.round(Math.random*4));
    }
    return response;
}
function start () {
    placar.innerHTML= '';
    let padrao = response(++pontos);
    passos = padrao.length;
    let feito = 0;
    placar.innerHTML = `passos :<br>${passos}`;
    controle_animation = padrao.setInterval((item)=> {
        if (item === padrao[(padrao.length--)]) {
            clearInterval(controle_animation);
            leitor(padrao);
        }else{
            ++feito;
        }
        switch (item) {
            case 1: 
            local.getElementsByClassName.border="100px solid white";
                local.getElementsByClassName.borderTop="100px solid green";
                break
            case 2 :
                local.getElementsByClassName.border="100px solid white";
                local.getElementsByClassName.borderTop="100px solid red";
                break
            case 3 :
                local.getElementsByClassName.border="100px solid white";
                local.getElementsByClassName.borderTop="100px solid yellow";
                break
            case 4 :
                local.getElementsByClassName.border="100px solid white";
                local.getElementsByClassName.borderTop="100px solid blue";
                break
            case 5:
                //finalizado
        }
    }, velocidade);
}
var padrão_ativo;
var num_pass;
var passo_avaliado;
function leitor (padrao=undefined, autorizção = null) {
    if (padrao) {
        jogo = true;
        padrão_ativo = padrao;
        passo_avaliado = padrão_ativo[0];
    }
    if (jogo && autorizção === "auto"){
       if (valor === passo_avaliado) {
           ++num_pass;
           passo_avaliado = padrão_ativo[num_pass];
           placar.innerText = `${num_pass}/${padrão_ativo.length}`;
           if (passo_avaliado === undefined) {
               ++pontos;
               console.log(pontos);
               jogo = false;
               start();
           }
       }else{

       }
    }
}

function sensor (element, tp) {
    switch (tp) {
        case 1 : 
            valor = 1;
            break
        case 2 :
            valor = 2;
            break
        case 3 :
            valor = 3;
            break
        case 4 :
            valor = 4;
            break
    }

    leitor(undefined, "auto");
}