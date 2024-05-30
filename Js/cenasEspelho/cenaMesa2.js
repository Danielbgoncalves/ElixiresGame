import itens from '../itens.js'
import {inicializaIventarios, updateIventario, chamaCena, verificaCliqueNoInventario, clickAnims} from "../funcoesAuxiliares.js";

export default class CenaMesa2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaMesa2'
        });
        this.gavVDestrancada = false;
        this.gavCDestrancada = false;
        this.gavADestrancada = false;

        this.podeMostrarCarta = false;
         this.podeMostrarCinzas = false;

    }


    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaMesa2');

        this.spritesInventario = [];
        this.itemClicado = 0;
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Seta pra sair da cena
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;
        
        chamaCena(this.seta, this, 'CenaEspelho');

        // Adição das gavetas
        this.adicionaGavetas();

        this.mudatextura(this.gavVA);
        this.mudatextura(this.gavVF);
        this.mudatextura(this.gavCA);
        this.mudatextura(this.gavCF);
        this.mudatextura(this.gavAA);
        this.mudatextura(this.gavAF);

        this.input.on('pointerdown', ()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            //console.log('x: ', mouseX, 'y: ', mouseY);
            if(mouseX < 790 && mouseY < 63 )
                this.scene.start('CenaSobreMesa2', {inventario: this.inventario, gameState: this.gameState});

            if(mouseX > menorX && mouseX < maiorX)
                verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX)

        });

     
    }


    adicionaGavetas(){
        this.gavVA = this.add.image(516,165, 'gavetaVAberta-cena3');
        this.gavVA.setVisible(false);
        this.gavVA.setDepth(0.3);
        this.gavVA.setInteractive();
        this.gavVF = this.add.image(516,127, 'gavetaVFechada-cena3');
        this.gavVF.setInteractive();

        this.gavCA = this.add.image(516,234, 'gavetaCAberta-cena3');
        this.gavCA.setVisible(false);
        this.gavCA.setDepth(0.2);
        this.gavCA.setInteractive();
        this.gavCF = this.add.image(516,196, 'gavetaCFechada-cena3');
        this.gavCF.setInteractive();

        this.gavAA = this.add.image(516,304, 'gavetaAAberta-cena3');
        this.gavAA.setVisible(false);
        this.gavAA.setDepth(0.1);
        this.gavAA.setInteractive();
        this.gavAF = this.add.image(516,266, 'gavetaAFechada-cena3');
        this.gavAF.setInteractive();
    }

    mudatextura(gaveta){
        gaveta.on('pointerdown', ()=>{
            if(gaveta === this.gavVF && ( this.itemClicado === 'chaveVerdePeq' || this.gavVDestrancada)){
                this.abreGaveta(gaveta, this.gavVA, 'chaveVerdePeq');

            } else if(gaveta === this.gavVA){
                gaveta.setVisible(false);
                this.gavVF.setVisible(true);
                

            } else if(gaveta === this.gavCF && ( this.itemClicado === 'chaveCinzaPeq' || this.gavCDestrancada)){
                this.abreGaveta(gaveta, this.gavCA, 'chaveCinzaPeq');

            } else if(gaveta === this.gavCA){
                gaveta.setVisible(false);
                this.gavCF.setVisible(true);
                if(this.cinzas)
                    this.cinzas.disableBody(true,true);

            } else if(gaveta === this.gavAF && ( this.itemClicado === 'chaveAmarela' || this.gavADestrancada)){
                this.abreGaveta(gaveta, this.gavAA, 'chaveAmarela');

            } else if(gaveta === this.gavAA){
                gaveta.setVisible(false);
                this.gavAF.setVisible(true);
                if(this.carta1Fechada)
                    this.carta1Fechada.disableBody(true,true);

            }          
        });
    }

    abreGaveta(gavetaA, gavetaB, chave){
        gavetaA.setVisible(false);
        gavetaB.setVisible(true);

        if(chave === 'chaveVerdePeq'){
            this.gavVDestrancada = true;
        } else if(chave === 'chaveCinzaPeq' || this.podeMostrarCinzas){
            this.gavCDestrancada = true;
            this.mostraCinzas();
        } else if(chave == 'chaveAmarela' || this.podeMostrarCarta){
            this.gavADestrancada = true;
            this.mostraCarta();
        }
            
        
       // this.mostraOItem(this.itemClicado);

        // Apagua o item do inventário
        let indexDoItem = this.inventario.indexOf(this.itemClicado);
        if(indexDoItem !== -1){
            this.inventario.splice(indexDoItem, 1);
            updateIventario(this);
        }

    }

    mostraCarta(){
        this.podeMostrarCinzas = true;
        this.carta1Fechada = new itens(this, 480, 270, 'carta1Fechada', 'carta1FechadaPeq');
        this.carta1Fechada.setDepth(0.1);
        this.carta1Fechada.angle = 90;
        if(this.gameState.itensColetados[this.carta1Fechada.id])
            this.carta1Fechada.disableBody(true,true);
        
    }

    mostraCinzas(){
        this.podeMostrarCarta = true;
        this.cinzas = new itens(this, 480, 200, 'cinzas', 'cinzas');
        this.cinzas.setDepth(0.2);
        if(this.gameState.itensColetados[this.cinzas.id])
            this.cinzas.disableBody(true,true);
    }

    /*mostraOItem(item){
          if(item === 'chaveCinzaPeq' || this.podeMostrarCinzas){
            this.podeMostrarCarta = true;
            this.cinzas = new itens(this, 480, 200, 'cinzas', 'cinzas');
            this.cinzas.setDepth(0.2);
            if(this.gameState.itensColetados[this.cinzas.id])
                this.cinzas.disableBody(true,true);
        }

    }*/

    update(){}
}