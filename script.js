class Campo{
    constructor(quantLin, quantCol, quantBombas){

        this.quantLin = quantLin+2;
        this.quantCol = quantCol+2;
        this.quantBombas = quantBombas;

        this.tabuleiro;
        this.bombas;

        this.criarMatrizes();
        this.inicializarMatrizes();
        this.gerarBombas();
        this.gerarNumeros();
        
    }

    criarMatrizes(){
        this.tabuleiro = new Array(this.quantLin);
        this.bombas = new Array(this.quantLin);

        for(let i=0; i<this.quantLin; i++){
            this.tabuleiro[i] = new Array(this.quantCol);
            this.bombas[i] = new Array(this.quantCol);
        }
    }

    inicializarMatrizes(){
        for(let i=0; i<this.quantLin; i++){
            for(let j=0; j<this.quantCol; j++){

                if(i==0 || i==this.quantLin-1 || j==0 || j==this.quantCol-1){
                    this.bombas[i][j] = -1;
                    this.tabuleiro[i][j] = -1;
                }
                else{
                    this.bombas[i][j] = 0;
                    this.tabuleiro[i][j] = false;
                }
            }
        }
    }

    gerarBombas(){
        let quantBombas=0;

        while(quantBombas<this.quantBombas){
            let lin = Math.floor(Math.random() * this.quantLin);
            let col = Math.floor(Math.random() * this.quantCol);

            if(this.bombas[lin][col] != 9 && this.bombas[lin][col] != -1){
                this.bombas[lin][col] = 9;
                quantBombas++;
            }
        }
    }

    gerarNumeros(){
        for(let i=1; i<this.quantLin-1; i++){
            for(let j=1; j<this.quantCol-1; j++){

                let quantBombas = 0;

                if(this.bombas[i][j]!=9){

                    for(let lin=i-1; lin<=i+1; lin++){
                        for(let col=j-1; col<=j+1; col++){                      
                            
                            if(lin == i && col == j){
                                continue;
                            }
    
                            if(this.bombas[lin][col] == 9){
                                quantBombas++;
                            }
    
                        }
                    }

                    this.bombas[i][j] = quantBombas;
                }
                

            }
        }
    }
}

function start(){
    exibirCampo(campoMinado);
}

function exibirCampo(campo){
    let html = "<table>"
    
    for(let i=0; i<campo.quantLin; i++){
        html += "<tr>"

        for(let j=0; j<campo.quantCol; j++){
            if(i==0 || i==campo.quantLin-1 || j==0 || j==campo.quantCol-1){
                html += `<td class="parede" oncontextmenu="ola()">`
            }
            else{
                html += `<td class="campo-${campo.bombas[i][j]} ${campo.tabuleiro[i][j] ? "exibindo":"oculto"} ${campoMinado.bombas[i][j]==9 && campoMinado.tabuleiro[i][j] ? "bomba":""}" onclick="fazerJogada(${i},${j})">`
                html += `<p>${campo.bombas[i][j]}</p>`;
            }

            html += "</td>"
        }

        html += "</tr>"
    }

    html += "</table>"
    document.querySelector("div#campo").innerHTML = html;
}

function fazerJogada(lin, col){

    switch(campoMinado.bombas[lin][col]){
        case 9:
            exibirTodos();
        break;

        case 0:
            analisarCampo(lin, col);
        break;

        default:
            campoMinado.tabuleiro[lin][col] = true;
        break;
    }

    exibirCampo(campoMinado);
}

function analisarCampo(lin, col){
    for(let i=lin-1; i<=lin+1; i++){
        for(let j=col-1; j<=col+1; j++){
            if(campoMinado.bombas[i][j]==0){
                if(campoMinado.tabuleiro[i][j] == false){
                    campoMinado.tabuleiro[i][j] = true;
                    analisarCampo(i, j);
                }
            }
            else if(campoMinado.bombas[i][j]!=9){
                campoMinado.tabuleiro[i][j] = true;
            }
        }
    }
}

function exibirTodos(){
    for(let i=0; i<campoMinado.quantLin; i++){
        for(let j=0; j<campoMinado.quantCol; j++){
            if(!(i==0 || i==campoMinado.quantLin-1 || j==0 || j==campoMinado.quantCol-1)){
                campoMinado.tabuleiro[i][j] = true;
            }
        }
    }
}

let campoMinado = new Campo(9, 9, 12);
start();

function ola(){
    alert("ola");
}