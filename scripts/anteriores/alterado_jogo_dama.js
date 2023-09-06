cor1='rgb(75, 72, 72)'
cor2='rgb(171, 191, 188)'

criar_casas_dama()

function criar_casas_dama(){
    for (var lin=1;lin<=8; lin++){  //Linhas
        trocar_var()        
        for(var col=1; col<=8; col++){ //colunas
            criar_casa_dama(lin,col)
        }
    }
}

function criar_casa_dama(linha, coluna){
    var img=document.createElement('img')
    img.id=`img${linha}${coluna}`
    img.src='carta1.jpg'
    var div = document.createElement('div')
    div.id = `L${linha}C${coluna}`
    div.className='casa_dama'

    div.style.borderStyle='solid'
    div.style.borderWidth='1px'
    div.style.borderColor='black'
    div.style.backgroundColor=cor1
    div.style.textAlign='center'
    div.style.paddingTop='30px'

    div.append(img)
    
    // div.innerText=div.id
    trocar_var()    
    div.addEventListener('click',clicar)
    var tabuleiro = document.getElementById("tabuleiro")
    tabuleiro.appendChild(div)
}

function clicar(e){
    window.alert(e.target.id)
}
function trocar_var(){
    var troca=cor2
    cor2=cor1
    cor1=troca            
}