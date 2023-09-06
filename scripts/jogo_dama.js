const casaVazia='L0C0'
const tempTranstition=0.5
var casaBranca='rgb(171, 191, 188)'
var casaPreta='rgb(75, 72, 72)'
var cor1=casaPreta
var cor2=casaBranca
var click_casa_original=casaVazia
var click_casa_destino=casaVazia
var qtdePecasJogo=24

document.getElementById('btnInicar').addEventListener('click',iniciarJogo)
document.getElementById('btnGuardarPecas').addEventListener('click',guardaNaCaixa)

iniciaPagina()


function guardaNaCaixa(){
    loopPecasParaCaixa(qtdePecasJogo,qtdePecasJogo/2)
}

function iniciarJogo(){
    colocarPecasNoTubuleiro()
}

function iniciaPagina(){
    criarCasasTabuleiro()
    criarEspacoCaixas()
    criarPecasJogo(qtdePecasJogo)
    loopPecasParaCaixa(qtdePecasJogo,qtdePecasJogo/2)
}

function criarCasasTabuleiro(){
    for (var lin=1;lin<=8; lin++){  //Linhas
        trocar_var()        
        for(var col=1; col<=8; col++){ //colunas
            criarUmaCasaDama(lin,col)
        }
    }
}

function criarPecasJogo(qtdePecas){
    var metade=qtdePecas/2
    for(iPeca=1;iPeca<=qtdePecas;iPeca++){
        if(iPeca>metade){
            criarUmaPecaDama('Branca',iPeca-metade)  
       }else{
            criarUmaPecaDama('Preta',iPeca)
       }
    }
}

function criarUmaPecaDama(corDaPeca,indice){
    var divPeca = document.createElement('div')
    var pagina=document.getElementById('corpoPagina')
    divPeca.id="peca"+corDaPeca+""+indice
    divPeca.className="pecas"+corDaPeca
    pagina.appendChild(divPeca)
}

function criarUmaCasaDama(linha, coluna){
    var div = document.createElement('div')
    div.id = `L${linha}C${coluna}`
    div.className='casaDama'
    div.style.borderStyle='solid'
    div.style.borderWidth='1px'
    div.style.borderColor='black'
    div.style.opacity='.7'
    div.style.backgroundColor=cor1
    div.style.textAlign='center'
    div.style.backgroundSize= '78%' //'contain' 
    div.style.backgroundRepeat='no-repeat'
    div.style.backgroundPosition='center'
    div.addEventListener('click',clicar)
    trocar_var()    
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
            colocarPecaNaCaixa('Branca',i-metade-1)  
       }else{
            colocarPecaNaCaixa('Preta',i-1)
       }
      if (--i) {          
        loopPecasParaCaixa(i,metade);              
      }                       
    }, tempTranstition*100)
}


function colocarPecaNaCaixa(corPeca,i){
    var espPecasCaixa=document.getElementsByClassName('espCaixa'+corPeca)  
    var pcaGuardar="url('images/peca" +corPeca+".png')"
    var idPeca='peca'+corPeca+''+(i+1)
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
    var corAdversario=corSelecionada=="Branca"?'Preta':'Branca'

    var contPeca=qtdePecasJogo/2
    for(lin=8;lin>=6;lin--){
        for(col=1;col<=8;col++){
            var idCasa = `L${lin}C${col}`
            var casaTabuleiro=document.getElementById(idCasa)
            if (casaTabuleiro.style.backgroundColor==casaPreta){
                colocarPecaNoTuleiro(corSelecionada,contPeca,casaTabuleiro)
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
                contPeca--
            }
        }
    }
}

function colocarPecaNoTuleiro(corPeca,indPeca,casaTabuleiro){
    var pcaGuardar="url('images/peca" +corPeca+".png')"
    var idPeca='peca'+corPeca+''+indPeca
    var pecaDama=document.getElementById(idPeca)
    var espPecasCaixa=document.getElementsByClassName('espCaixa'+corPeca) 
    
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
}

function clicar(e){
    var casa_clicada=e.target
    // window.alert(casa_clicada.id)
    if(click_casa_original==casaVazia){
        if(casa_clicada.style.backgroundImage!=''){
            click_casa_original=casa_clicada.id
        }else{
            click_casa_original=casaVazia
            click_casa_destino=casaVazia
        }
    }else{
        click_casa_destino=casa_clicada.id
    }

    if(click_casa_original!=casaVazia && click_casa_destino!=casaVazia){
        if(click_casa_original!=click_casa_destino){
            mover_peca() 
        }
    }
}

function mover_peca(){
    div_original=document.getElementById(click_casa_original)
    div_destino=document.getElementById(click_casa_destino)
    click_casa_original=casaVazia
    click_casa_destino=casaVazia
    div_destino.style.backgroundImage=div_original.style.backgroundImage
    div_original.style.backgroundImage=''
}

function trocar_var(){
    var troca=cor2
    cor2=cor1
    cor1=troca            
}
