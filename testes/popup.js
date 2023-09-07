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
