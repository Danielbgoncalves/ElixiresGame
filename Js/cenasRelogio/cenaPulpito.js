import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, clickAnims } from "../funcoesAuxiliares.js";

export default class CenaPulpito extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPulpito'
        });
        this.paginas = [];
        this.index = 0;
        this.comidaCorvoColetada = false;
        this.mostrouLivro = false;
        this.mostrouCarta = false;
    }
   
    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    /*
        É necessario mudar muita coisa aqui, só vai poder colocar o livro vermelho se a carta já tiver 
        sumido. 
        Precisa consertar os rasbiscos que quando tirar a carta as vezes eles continuam mas isso nem 
        vai ser problema pq a carta nao vai mais sair.
    */


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
        clickAnims(this);

        // Configuração das paginas do livro 
        this.paginaAtual = this.physics.add.image(450, 275, 'oUltElixir-0');
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

            console.log('x: ', mouseX, 'y: ', mouseY);
            console.log(this.gameState.borraPonterios);
            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        });

        if(this.mostrouLivro) this.mostraPaginasDoLivro(0);
        if(this.mostrouCarta) this.mostraCarta();

        this.ponteirosBorrados = this.add.image(553, 437, 'borradoPonteiros');
        this.ponteirosBorrados.setVisible(false);
        this.livrosBorrados = this.add.image(430, 293, 'borradoLivros');
        this.livrosBorrados.setVisible(false);

        if(this.gameState.borraPonterios && this.gameState.borraLivros) this.apagaCarta();

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
        } else if(mouseX < 700 && mouseY < 500) {
            if(this.itemClicado == 'oUltElixir-dorsoPeq' && !this.mostrouLivro){
                this.mostrouLivro = true;
                this.itemClicado = 0;
                this.mostraPaginasDoLivro(0);
            }else if(this.mostrouLivro) {
                this.mostrouLivro = false;
                this.paginaAtual.setVisible(false);
                this.setaEsq.setVisible(false);
                this.setaDir.setVisible(false);
                this.inventario.push('oUltElixir-dorsoPeq');
                updateIventario(this);
                //this.itemClicado = 0;
            } else if(this.itemClicado == 'carta1FechadaPeq' && !this.mostrouCarta){
                this.mostrouCarta = true;
                this.itemClicado = 0;
                this.mostraCarta();
            } else if(this.mostrouCarta){
                this.mostrouCarta = false;
                this.paginaAtual.setVisible(false);
                if((this.inventario.indexOf('carta1FechadaPeq') === -1))
                    this.inventario.push('carta1FechadaPeq');
                updateIventario(this);
                console.log('mostrouCarta esta true');
                //this.itemClicado = 0;
            }
        }
    }

    mostraCarta(){
        let indexDaCarta = this.inventario.indexOf('carta1FechadaPeq');
        if(indexDaCarta !== -1)
            this.inventario.splice(indexDaCarta, 1);
        updateIventario(this);

        if(this.mostrouLivro && (this.inventario.indexOf('oUltElixir-dorsoPeq') === -1) ){
            this.inventario.push('oUltElixir-dorsoPeq');
            updateIventario(this);
        }

        this.paginaAtual.setTexture('carta1Aberta');
        this.paginaAtual.setVisible(true);

        
    }

    apagaCarta(){
        this.tweens.add({
            targets: this.paginaAtual,
            alpha: { start: 1, to: 0.4 },
            duration: 500,
            ease: 'Linear',
            repeat: 5, 
            yoyo: true 
        });

        this.paginaAtual.setVisible(false); // rever pq nao esta de fato sumindo  <----------------
        this.paginaAtual.disableBody(true,true);
        this.ponteirosBorrados.setVisible(false);
        this.livrosBorrados.setVisible(false);

    }

    mostraPaginasDoLivro(sum){
        // Para tirar o livro do inventário
        let indexDoLivro = this.inventario.indexOf('oUltElixir-dorsoPeq');
        if(indexDoLivro !== -1)
            this.inventario.splice(indexDoLivro, 1);
        updateIventario(this);

        if(this.mostrouCarta && (this.inventario.indexOf('carta1FechadaPeq') === -1) && !this.gameState.this.gameState.borraPonterios && !this.gameState.borraLivros){
            this.inventario.push('carta1FechadaPeq');
            updateIventario(this);
            console.log('carta 1 foi pro inventario');
        }

        this.setaEsq.setVisible(true);
        this.setaDir.setVisible(true);

        this.index += sum;
        if(this.index < 0) this.index = 4;
        if(this.index == 5) this.index = 0;

        this.paginaAtual.setTexture(this.paginas[this.index]);
        this.paginaAtual.setVisible(true);

        if( this.index === 4 )
            this.mostraComidaDoPassaro();
        else if(this.comidaCorvo && this.comidaCorvo.body){
            this.comidaCorvo.disableBody(true,true);
        }
              
    }

    mostraComidaDoPassaro(){
        this.comidaCorvo = new itens(this, 500, 245, 'comida-corvo', 'comida-corvoPeq');
        if(this.gameState.itensColetados[this.comidaCorvo.id])
            if(this.comidaCorvo && this.comidaCorvo.body){
                this.comidaCorvo.disableBody(true,true);
            }
    }

    mudaPagina(objeto, valor){
        objeto.on('pointerdown',()=>{
            this.mostraPaginasDoLivro(valor);
        });
    }

    update(){
        if(this.gameState.borraPonterios && this.mostrouCarta ){
            this.ponteirosBorrados.setVisible(true);
        } 
         
        if( this.gameState.borraLivros && this.mostrouCarta){
            this.livrosBorrados.setVisible(true);
        }

        if( !this.mostrouCarta ){
            this.ponteirosBorrados.setVisible(false);
            this.livrosBorrados.setVisible(false);
        }

     } 
}