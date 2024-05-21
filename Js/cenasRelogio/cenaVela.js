import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena,verificaCliqueNoInventario} from "../funcoesAuxiliares.js";

export default class CenaVela extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaVela'
        });
        this.chaveOfertada = false;    
    }
   
    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaVela');

        // Desenho do ovo
        this.ovo1 = this.add.image(408, 259, 'ovo1');
        this.ovo1.setVisible(false);

        // Seta pra sair da cena
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        if(this.chaveOfertada) this.mostraChave();

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
       
        chamaCena(this.seta, this, 'CenaRelogio');

        this.anims.create({
            key: 'bruxelear',
            frames: this.anims.generateFrameNumbers('sprite-vela', { start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        });
        this.animacaoVela = this.physics.add.sprite(408, 286, 'seta');
        this.animacaoVela.play('bruxelear');

        // Detecta o clique na tela
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

         if(mouseX > 136 && mouseY > 244 && mouseX < 768 && mouseY < 498 ) {
            if(this.itemClicado == 'ovo1'){
                this.colocaOvo();
            }
        }
    }

    colocaOvo(){
        let indexDaVela = this.inventario.indexOf('ovo1');
        if(indexDaVela !== -1)
            this.inventario.splice(indexDaVela, 1);
        updateIventario(this);

        if(!this.chaveOfertada) this.ovo1.setVisible(true);

        this.tweens.add({
            targets: this.ovo1,
            alpha: { start: 1, to: 0.7 },
            duration: 500,
            ease: 'Linear',
            repeat: -1, // Repete infinitamente
            yoyo: true // Faz o valor de alpha ir e voltar
        });

        this.time.delayedCall(4500, ()=>{
            this.ovo1.setVisible(false);
            this.mostraChave();
        }, [], this);

    }

    mostraChave(){
        this.itemClicado = 0;
        this.chaveOfertada = true;
        this.chaveCinza = new itens(this, 408, 250, 'chaveCinza', 'chaveCinzaPeq');
        this.chaveCinza.setDepth(1);
        if(this.gameState.itensColetados[this.chaveCinza.id])
            this.chaveCinza.disableBody(true,true);
    }

    
    update(){
        
    }

}