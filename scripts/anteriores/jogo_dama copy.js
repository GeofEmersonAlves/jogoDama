const casaVazia='L0C0'
var cor1='rgb(75, 72, 72)'
var cor2='rgb(171, 191, 188)'
var casa_banca=cor2
var casa_preta=cor1
var click_casa_original=casaVazia
var click_casa_destino=casaVazia

iniciaPagina()


function iniciaPagina(){
    criarCasasTabuleiro()
    criarEspacoCaixas()
    iniciarPecasNaCaixa('Branca')
    iniciarPecasNaCaixa('Preta')
}

    // if(linha<=3 && div.style.backgroundColor==casa_preta){
    //     div.style.backgroundImage="url('images/pecaBranca.png')"
    // }
    // if(linha >=6 && div.style.backgroundColor==casa_preta){
    //     div.style.backgroundImage="url('images/pecaPreta.png')"
    // }

function criarCasasTabuleiro(){
    for (var lin=1;lin<=8; lin++){  //Linhas
        trocar_var()        
        for(var col=1; col<=8; col++){ //colunas
            criarUmaCasaDama(lin,col)
        }
    }
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

function iniciarPecasNaCaixa(corPeca){
    var caixaPecas=document.getElementById('cxPcs'+corPeca)
    var espPecasCaixa=document.getElementsByClassName('espCaixa'+corPeca)
    
    // var posLeftIni=pecaDama.getBoundingClientRect().left
    // var posTopIni=pecaDama.getBoundingClientRect().top
    
    var pcaGuardar="url('images/peca" +corPeca+".png')"
    
    for (var i=0;i<espPecasCaixa.length; i++){
        var idPeca='peca'+corPeca+'Canto'+(i+1)
        
        var pecaDama=document.getElementById(idPeca)
       
        var posLeftFim=caixaPecas.getBoundingClientRect().width+espPecasCaixa[i].getBoundingClientRect().left-espPecasCaixa[i].getBoundingClientRect().width*2.9-600

        var posTopFim=caixaPecas.getBoundingClientRect().height+espPecasCaixa[i].getBoundingClientRect().top-espPecasCaixa[i].getBoundingClientRect().height*0.95

        pecaDama.style.transition='.7s'
        // pecaDama.style.transform="transLateX("+posLeftFim+'px) transLateY('+sinal+posTopFim+'px) scale(.6)'
        pecaDama.style.transform="transLateX(-"+posLeftFim+'px) transLateY(-'+posTopFim+'px) scale(.6)'
        // pecaDama.style.visibility="collapse"
        espPecasCaixa[i].style.backgroundImage=pcaGuardar
    }
    // for (var i=0;i<espPecasCaixa.length; i++){
    //     var idPeca='peca'+corPeca+'Canto'+(i+1)
    //     // window.alert(idPeca)
    //     var pecaDama=document.getElementById(idPeca)
    // }
   
    // pecaDama.style.transform=''

    // pecaDama.style.transform="transLateX(-"+posLeftIni+'px) transLateY(-'+posTopIni+'px)'
}

// function colocarPecaNaCaixa(lugar, objeto){
//     lugar.style.backgroundImage=objeto
// }
function colocarPecasNaCaixa(){

}

function criarPeca(newId,top, left, width, height){  
    // var divPeca = document.createElement('div')
    // divPeca.id = `Peca-${newId}`
    // divPeca.className='pecaDama'
    // divPeca.style.zIndex=1
    // divPeca.style.position="absolute"
    // var divPeca =document.getElementById('bolaBranca')
    // var posTop = (top*100)/parseInt(window.screen.height)
    // var posLeft = (left*100)/parseInt(window.screen.width)
    // window.alert(posTop+' - '+posLeft)
    // divPeca.style.width='5%'
    // divPeca.style.height=height+'px'
    // divPeca.style.top=posTop+'%'
    // divPeca.style.left=posLeft+'%'
    // divPeca.style.backgroundImage="url('images/pecaBranca.png')"
    // divPeca.style.backgroundSize= '78%' //'contain' 
    // divPeca.style.backgroundRepeat='no-repeat'
    // divPeca.style.backgroundPosition='center'
    // window.alert('- top:'+top+' - left:'+left+' -larg:'+width+' -alt:'+height)
    // var  varBody=document.getElementsByTagName('body')
    // varBody.appendChild(divPeca)
}


function clicar(e){
    var casa_clicada=e.target
    var el = this;
    
    var coordenadas = el.getBoundingClientRect();
    criarPeca(casa_clicada.id,coordenadas.top,coordenadas.left,coordenadas.width,coordenadas.height)
    // window.alert(casa_clicada.id+'- top:'+coordenadas.top+' - left:'+coordenadas.left+' -larg:'+coordenadas.width+' -alt:'+coordenadas.height)
    
    // var teste =document.getElementById('bolaBranca')
    // teste.style.left=coordenadas.left+'px'
    // teste.style.top=coordenadas.top+'px'

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
