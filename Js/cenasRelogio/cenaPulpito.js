import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena } from "../funcoesAuxiliares.js";

export default class CenaPulpito extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPulpito'
        });
        this.paginas = [];
        this.index = 0;
        this.comidaCorvoColetada = false;
        this.mostrouLivro = false;
    }
   
    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaPulpito');

        // Setas pra mudar as paginas do livro
        this.setaEsq = this.add.image(100, 275, 'seta');
        this.setaEsq.setInteractive();
        this.setaEsq.setVisible(false);
        this.setaDir = this.add.image(710, 275, 'seta');
        this.setaDir.setInteractive();
        this.setaDir.setVisible(false);
        this.setaDir.angle = 180;

        // Seta pra sair da cena
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaRelogio');

        // Detecta o clique nas setas de muda a página
        this.mudaPagina(this.setaEsq, -1);
        this.mudaPagina(this.setaDir, 1);

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);

        // Configuração das paginas do livro 
        this.paginaAtual = this.add.image(450, 275, 'oUltElixir-0');
        this.paginaAtual.setVisible(false);

        for(let i = 0; i < 5; i++){
            this.paginas.push('oUltElixir-' + i);
        }

        // Identifica qualquer clique e vê se foi em um lugar interessante
        this.input.on('pointerdown',()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

           // console.log('x: ', mouseX);
            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        });

        if(this.mostrouLivro) this.mostraPaginasDoLivro(0);

    }

    verificaOndeClicou(mouseX, mouseY,menorX,maiorX){
        if(mouseX > menorX && mouseX < maiorX){
            if( mouseY > 48 && mouseY < 116)
                this.itemClicado = this.inventario[0];
            else if (mouseY > 48 + 76*1 && mouseY < 116 + 76*1)
                this.itemClicado = this.inventario[1];
            else if (mouseY > 48 + 76*2 && mouseY < 116 + 76*2)
                this.itemClicado = this.inventario[2];
            else if (mouseY > 48 + 76*3 && mouseY < 116 + 76*3)
                this.itemClicado = this.inventario[3];
            else if (mouseY > 48 + 76*4 && mouseY < 116 + 76*4)
                this.itemClicado = this.inventario[4];
            else if (mouseY > 48 + 76*5 && mouseY < 116 + 76*5)
                this.itemClicado = this.inventario[5];
            else this.itemClicado = 0;
        } else if(mouseX < 791) {
            if(this.itemClicado == 'oUltElixir-dorsoPeq' && !this.mostrouLivro){
                this.mostrouLivro = true;
                this.mostraPaginasDoLivro(0);
            }
        }
    }

    mostraPaginasDoLivro(sum){
        // Para tirar o livro do inventário
        let indexDoLivro = this.inventario.indexOf('oUltElixir-dorsoPeq');
        if(indexDoLivro !== -1)
            this.inventario.splice(indexDoLivro, 1);
        updateIventario(this);

        this.setaEsq.setVisible(true);
        this.setaDir.setVisible(true);

        this.index += sum;
        if(this.index < 0) this.index = 4;
        if(this.index == 5) this.index = 0;

        this.paginaAtual.setTexture(this.paginas[this.index]);
        this.paginaAtual.setVisible(true);

        if( this.index == 4 )
            this.mostraComidaDoPassaro();
        else if(this.comidaCorvo){
            this.comidaCorvo.disableBody(true,true);
        }
              
    }

    mostraComidaDoPassaro(){
        this.comidaCorvo = new itens(this, 550, 280, 'comida-corvo', 'comida-corvoPeq');
        if(this.gameState.itensColetados[this.comidaCorvo.id])
            this.comidaCorvo.disableBody(true,true);
    }

    mudaPagina(objeto, valor){
        objeto.on('pointerdown',()=>{
            this.mostraPaginasDoLivro(valor);
        });
    }

    update(){ }
}