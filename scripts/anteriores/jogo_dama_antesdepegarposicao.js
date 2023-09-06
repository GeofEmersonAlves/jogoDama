const casaVazia='L0C0'
var cor1='rgb(75, 72, 72)'
var cor2='rgb(171, 191, 188)'
var casa_banca=cor2
var casa_preta=cor1
var click_casa_original=casaVazia
var click_casa_destino=casaVazia

iniciaPagina()



function iniciaPagina(){
    criar_peças_na_caixa()
    colocarPecasNaCaixa()
}


function criar_peças_na_caixa(){
    for (var lin=1;lin<=8; lin++){  //Linhas
        trocar_var()        
        for(var col=1; col<=8; col++){ //colunas
            criar_casas_dama(lin,col)
        }
    }
}
function criar_casas_dama(linha, coluna){
    var div = document.createElement('div')
    div.id = `L${linha}C${coluna}`
    div.className='casa_dama'
    div.style.borderStyle='solid'
    div.style.borderWidth='1px'
    div.style.borderColor='black'
    div.style.opacity='.7'
    div.style.backgroundColor=cor1
    div.style.textAlign='center'
    // div.style.backgroundSize= '78%' //'contain' 
    // div.style.backgroundRepeat='no-repeat'
    // div.style.backgroundPosition='center'

    // if(linha<=3 && div.style.backgroundColor==casa_preta){
    //     div.style.backgroundImage="url('images/pecaBranca.png')"
    // }
    // if(linha >=6 && div.style.backgroundColor==casa_preta){
    //     div.style.backgroundImage="url('images/pecaPreta.png')"
    // }

    div.addEventListener('click',clicar)

    trocar_var()    
    var tabuleiro = document.getElementById("tabuleiro")
    tabuleiro.appendChild(div)
}

function criarPeca(top, left, width, height){
    var div = document.createElement('div')
    div.id = `L${linha}C${coluna}`
    div.className='pecaDama'

    div.style.position='absolute'
    div.style.width=width
    div.style.height=height
    div.style.top=top
    div.style.left=screenLeft
    div.style.backgroundImage="url('images/pecaBranca.png')"
}


function clicar(e){
    var casa_clicada=e.target
    var el = this;
    
    var coordenadas = el.getBoundingClientRect();
    window.alert(casa_clicada.id+'- top:'+coordenadas.top+' - left:'+coordenadas.left+' -larg:'+coordenadas.width+' -alt:'+coordenadas.height)
    
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
