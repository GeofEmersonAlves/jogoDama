const casaVazia='L0C0'
const tempTranstition=0.5
const branca="Branca"
const preta="Preta"
const NJ="XXXX" //nao joga
const JG="0000" //joga
const PB='PB'
const PP='PP'
const atributoPecas='casaTabuleiro'
var casaBranca='rgb(171, 191, 188)'
var casaPreta='rgb(75, 72, 72)'
var cor1=casaPreta
var cor2=casaBranca
var qtdePecasJogo=24
var casaClicadaDestino=casaVazia
var pecaClicadaJogar=casaVazia
var statusTabuleiro=[]

document.getElementById('btnInicar').addEventListener('click',iniciarJogo)
document.getElementById('btnGuardarPecas').addEventListener('click',guardaNaCaixa)
window.onresize=arrumarPecasNoTabuleiro

iniciaPagina()



function iniciarJogo(){
    iniciaMatrizTabuleiro()
    colocarPecasNoTubuleiro()
}

function guardaNaCaixa(){
    iniciaMatrizTabuleiro()
    loopPecasParaCaixa(qtdePecasJogo,qtdePecasJogo/2)
}

function iniciaPagina(){
    iniciaMatrizTabuleiro()
    criarCasasTabuleiro()
    criarEspacoCaixas()
    criarPecasJogo(qtdePecasJogo)
    loopPecasParaCaixa(qtdePecasJogo,qtdePecasJogo/2)
}

function criarCasasTabuleiro(){
    for (var lin=1;lin<=8; lin++){  //Linhas
        trocarVarCor()        
        for(var col=1; col<=8; col++){ //colunas
            criarUmaCasaDama(lin,col)
        }
    }
}

function criarPecasJogo(qtdePecas){
    var metade=qtdePecas/2
    for(iPeca=1;iPeca<=qtdePecas;iPeca++){
        if(iPeca>metade){
            criarUmaPecaDama(branca,iPeca-metade)  
       }else{
            criarUmaPecaDama(preta,iPeca)
       }
    }
}

function criarUmaPecaDama(corDaPeca,indice){
    var divPeca = document.createElement('div')
    var pagina=document.getElementById('corpoPagina')
    var stTab = corDaPeca==branca ? PB:PP

    divPeca.id=stTab+("0"+indice).slice(-2)
    divPeca.className="pecas"+corDaPeca
    divPeca.addEventListener('click',clickJogar)
    pagina.appendChild(divPeca)
}

function criarUmaCasaDama(linha, coluna){
    var div = document.createElement('div')
    div.id = `L${linha}C${coluna}`
    div.className='casaDama'
    div.style.borderStyle='solid'
    div.style.borderWidth='1px'
    div.style.borderColor='black'
    div.style.opacity='.65'
    div.style.backgroundColor=cor1
    div.style.textAlign='center'
    div.style.backgroundSize= '78%' //'contain' 
    div.style.backgroundRepeat='no-repeat'
    div.style.backgroundPosition='center'
    
    if(cor1==casaPreta){
        div.addEventListener('click',clickJogar)
    }
    trocarVarCor()    
    var tabuleiro = document.getElementById("tabuleiro")
    tabuleiro.appendChild(div)
}

function criarEspacoCaixas(){
    var caixas=['pecasBrancas','pecasPretas']
    for(var caixa=0;caixa<=1;caixa++){
        for (var peca=1;peca<=12; peca++){  //Linhas
            var div = document.createElement('div')
            div.id = `${caixas[caixa]}-P${peca}`
            div.style.backgroundSize= '60%' //'contain' 
            div.style.backgroundRepeat='no-repeat'
            div.style.backgroundPosition='center'
            div.style.boxShadow='5px 5px 5px rgba(0, 0, 0, .6)'
            if(caixa==0){
                div.className='espCaixaBranca'
                var boxPecas = document.getElementById("cxPcsBranca")
                boxPecas.appendChild(div)
            }else{
                div.className='espCaixaPreta'
                var boxPecas = document.getElementById("cxPcsPreta")
                boxPecas.appendChild(div)
            }
        }    
    }
}
//https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
function loopPecasParaCaixa(i,metade) {         //  create a loop function    
    setTimeout(function() {  
       if(i>metade){
            colocarPecaNaCaixa(branca,i-metade-1)  
       }else{
            colocarPecaNaCaixa(preta,i-1)
       }
      if (--i) {          
        loopPecasParaCaixa(i,metade);              
      }                       
    }, tempTranstition*100)
}


function colocarPecaNaCaixa(corPeca,i){
    var espPecasCaixa=document.getElementsByClassName('espCaixa'+corPeca)  
    var pcaGuardar="url('images/peca" +corPeca+".png')"
    var stTab = corPeca==branca ? PB:PP
    var idPeca=stTab+("0"+(i+1)).slice(-2)
    var pecaDama=document.getElementById(idPeca)

    var deslocV=(espPecasCaixa[i].getBoundingClientRect().width-pecaDama.getBoundingClientRect().width*0.6)/2

    var deslocH=(espPecasCaixa[i].getBoundingClientRect().height-pecaDama.getBoundingClientRect().height*0.1)/2

    var posLeftFim=espPecasCaixa[i].getBoundingClientRect().left-deslocV
    var posTopFim=espPecasCaixa[i].getBoundingClientRect().top-deslocH

    pecaDama.style.transition=tempTranstition+'s'
    pecaDama.style.transitionProperty='transform, top, left'
    pecaDama.style.left=posLeftFim+'px'
    pecaDama.style.top=posTopFim+'px'
    pecaDama.style.transform='scale(.5) rotate(3turn)'
    //Faz um delay para esconder a peca e colocar o a imagem no background da div na caixa, cauxa a sensacao de que a peca entrou na caixa
    setTimeout(function() { 
        pecaDama.style.visibility="collapse"
        espPecasCaixa[i].style.backgroundImage=pcaGuardar
    },1000*tempTranstition*1.22)
}

function colocarPecasNoTubuleiro(){
    var corSelecionada=document.getElementById('corSelecinada').value
    var corAdversario=corSelecionada==branca?preta:branca
    var contPeca=qtdePecasJogo/2
    for(lin=8;lin>=6;lin--){
        for(col=1;col<=8;col++){
            var idCasa = `L${lin}C${col}`
            var casaTabuleiro=document.getElementById(idCasa)
            if (casaTabuleiro.style.backgroundColor==casaPreta){
                colocarPecaNoTuleiro(corSelecionada,contPeca,casaTabuleiro)
                var stTab = corSelecionada==branca ? PB:PP
                statusTabuleiro[lin-1][col-1] = stTab+("0"+contPeca).slice(-2)
                contPeca--
            }
        }
    }

    var contPeca=qtdePecasJogo/2
    for(lin=1;lin<=3;lin++){
        for(col=1;col<=8;col++){
            var idCasa = `L${lin}C${col}`
            var casaTabuleiro=document.getElementById(idCasa)
            if (casaTabuleiro.style.backgroundColor==casaPreta){
                colocarPecaNoTuleiro(corAdversario,contPeca,casaTabuleiro)
                var stTab = corAdversario==branca ? PB:PP
                statusTabuleiro[lin-1][col-1] = stTab+("0"+contPeca).slice(-2)
                contPeca--
            }
        }
    }
}

function colocarPecaNoTuleiro(corPeca,indPeca,casaTabuleiro){
    // var pcaGuardar="url('images/peca" +corPeca+".png')"
    var stTab = corPeca==branca ? PB:PP
    var idPeca=stTab+("0"+(indPeca)).slice(-2)
    var pecaDama=document.getElementById(idPeca)
    var espPecasCaixa=document.getElementsByClassName('espCaixa'+corPeca) 
    
    pecaDama.setAttribute(atributoPecas,casaTabuleiro.id)

    pecaDama.style.visibility="visible"
    pecaDama.style.transition=""
    pecaDama.style.transitionProperty=''
    pecaDama.style.transform=''

    var deslocV=(casaTabuleiro.getBoundingClientRect().width-pecaDama.getBoundingClientRect().width)/2

    var deslocH=(casaTabuleiro.getBoundingClientRect().height-pecaDama.getBoundingClientRect().height)/2

    var posLeftFim=casaTabuleiro.getBoundingClientRect().left+deslocV
    var posTopFim=casaTabuleiro.getBoundingClientRect().top+deslocH

    pecaDama.style.transition=tempTranstition+'s'
    pecaDama.style.transitionProperty='transform, top, left'
    pecaDama.style.left=posLeftFim+'px'
    pecaDama.style.top=posTopFim+'px'
    pecaDama.style.transform='scale(.9) rotate(3turn)'

    espPecasCaixa[indPeca-1].style.backgroundImage=""
    casaTabuleiro.removeEventListener('click',clickJogar)
}

function clickJogar(e){
    var casaClicada=e.target
       
    if(casaClicada.id.substring(0,1)=='L' && pecaClicadaJogar!=casaVazia){
        casaClicadaDestino=casaClicada.id
    }else{
        pecaClicadaJogar=casaClicada.id
    }

    if(casaClicadaDestino!="" && pecaClicadaJogar!=""){
        moverPeca(pecaClicadaJogar,casaClicadaDestino)
        casaClicadaDestino=casaVazia
        pecaClicadaJogar=casaVazia
    }
}

function arrumarPecasNoTabuleiro(){
    for(lin=0;lin<=7;lin++){
        for(col=0;col<=7;col++){
            var statusCasa=statusTabuleiro[lin][col]

            if(statusCasa!=NJ && statusCasa!=JG){
                var idCasa = `L${lin+1}C${col+1}`
                var corPeca= statusCasa.substring(0,2)==PB?branca:preta
                var casaTabuleiro=document.getElementById(idCasa)
                var indPeca=parseInt(statusCasa.slice(-2))
                colocarPecaNoTuleiro(corPeca,indPeca,casaTabuleiro)
            }
        }
    }
}

function moverPeca(idPecaClicadaJogar,casaDestinoID){
    var pecaAJogar=document.getElementById(idPecaClicadaJogar)
    var idCasaOriginal=pecaAJogar.getAttribute(atributoPecas)
    var casaDestino=document.getElementById(casaDestinoID)
    var casaOriginal=document.getElementById(idCasaOriginal)

    var deslocV=(casaDestino.getBoundingClientRect().width-pecaAJogar.getBoundingClientRect().width)/2

    var deslocH=(casaDestino.getBoundingClientRect().height-pecaAJogar.getBoundingClientRect().height*1.1)/2

    var posLeftFim=casaDestino.getBoundingClientRect().left+deslocV
    var posTopFim=casaDestino.getBoundingClientRect().top+deslocH

    pecaAJogar.style.left=posLeftFim+'px'
    pecaAJogar.style.top=posTopFim+'px'
    
    var lin=parseInt(idCasaOriginal.substring(1,2))-1
    var col=parseInt(idCasaOriginal.substring(3,4))-1
    statusTabuleiro[lin][col]=JG
    
    lin=parseInt(casaDestinoID.substring(1,2))-1
    col=parseInt(casaDestinoID.substring(3,4))-1
    statusTabuleiro[lin][col]=idPecaClicadaJogar

    pecaAJogar.setAttribute(atributoPecas,casaDestinoID)
    casaOriginal.addEventListener('click',clickJogar)
    casaDestino.removeEventListener('click',clickJogar)
}

function trocarVarCor(){
    var troca=cor2
    cor2=cor1
    cor1=troca            
}

function newPopup(){
    var newWindow = window.open ('popup.html','pagina',
    "width=350, height=255, top=100, left=110, scrollbars=no " );
    
    for(lin=0;lin<=7;lin++){
        for(col=0;col<=7;col++){
            newWindow.document.write(statusTabuleiro[lin][col]+';')
        }
        newWindow.document.write('<br>')
    }
}

function iniciaMatrizTabuleiro(){
    //X->posição não Jogável
    //0 -Casa vazia
    statusTabuleiro=[[NJ,JG,NJ,JG,NJ,JG,NJ,JG],
                     [JG,NJ,JG,NJ,JG,NJ,JG,NJ],
                     [NJ,JG,NJ,JG,NJ,JG,NJ,JG],
                     [JG,NJ,JG,NJ,JG,NJ,JG,NJ],
                     [NJ,JG,NJ,JG,NJ,JG,NJ,JG],
                     [JG,NJ,JG,NJ,JG,NJ,JG,NJ],
                     [NJ,JG,NJ,JG,NJ,JG,NJ,JG],
                     [JG,NJ,JG,NJ,JG,NJ,JG,NJ]]

}
