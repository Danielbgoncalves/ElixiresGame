import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, verificaCliqueNoInventario} from "../funcoesAuxiliares.js";


export default class CenaGaiola extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaGaiola'
        });
          this.passaroBotou = false;
        //this.ovo1Coletado = false;
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    preload(){}
    
    create(){
        this.add.image(450, 275, 'cenaGaiola');

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta,this, 'CenaPorta');

        this.spritesInventario = [];
        this.itemClicado; 
        inicializaIventarios(this);
        updateIventario(this);


        // Comida do corvo como coletavel
        this.comidaCorvoo = new itens(this, 550, 280, 'comida-corvo', 'comida-corvoPeq');
        if(this.gameState.itensColetados[this.comidaCorvoo.id])
            this.comidaCorvoo.disableBody(true,true);

        // Ovo coletavel
        if(this.passaroBotou) this.mostraOvo();

        //chamaCena(this.seta, this, 'CenaPorta');

        this.anims.create({
            key: 'comer',
            frames: this.anims.generateFrameNumbers('corvo-sprite', { start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        });
        this.animacao = this.physics.add.sprite(350, 305, 'sprite-corvo');


        // Identifica qualquer clique e vê se foi em um lugar interessante
        this.input.on('pointerdown',()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        });
    }

    verificaOndeClicou(mouseX, mouseY,menorX,maiorX){
        verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX);

         if(mouseX > 376 && mouseY > 286 && mouseX < 416 && mouseY < 323 ) 
            if(this.itemClicado == 'comida-corvoPeq')
                this.passaroCome();          
    }


    passaroCome(){
        let indexDaComida = this.inventario.indexOf('comida-corvoPeq');
        if(indexDaComida !== -1)
            this.inventario.splice(indexDaComida, 1);

        updateIventario(this);

        this.animacao.play('comer');
        this.time.delayedCall(3000, ()=>{
            this.animacao.stop('comer');
            this.animacao.setVisible(false);
            this.add.image(350, 305, 'sprite-corvo');    
            this.mostraOvo();    
        }, [], this);
    }

    mostraOvo(){
        this.passaroBotou = true;
        this.ovo1 = new itens(this, 280, 375, 'ovo1', 'ovo1');
        this.ovo1.setDepth(1);
        if(this.gameState.itensColetados[this.ovo1.id])
            this.ovo1.disableBody(true,true);
    }
                
    update(){}
}