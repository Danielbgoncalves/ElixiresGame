import {inicializaIventarios, updateIventario, chamaCena} from "../funcoesAuxiliares.js";
//import itens from "../itens.js";

export default class CenaPlantaVerde extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPlantaVerde'
        });
        this.galhoColetado = false;
    }
   
    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    preload(){}

    create(){
        this.add.image(450, 275, 'cenaPlantaVerde');

        //galho a ser coletado
        this.galho = this.add.image( 530, 380, 'galho');
        this.galho.setInteractive();
        if(this.galhoColetado) this.galho.setVisible(false);
        
        this.spritesInventario = [];
        this.itemClicado = 0; 
        inicializaIventarios(this);
        updateIventario(this);

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaPorta');
                      
        this.input.on('pointerdown',()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        });
        
        // Coleta a galho
        this.galho.on('pointerdown', ()=>{
            if(this.itemClicado = 'tesouraPeq'){
                this.inventario.push('galhoPeq');
                this.updateIventario();
                this.galho.setVisible(false);
                this.galhoColetado = true;
            }
        });

    }

    inicializaIventarios() {
        for (let i = 0; i < 6; i++) {
            let sprite = this.physics.add.image(835, 80 + (i * 80), 'seta').setDepth(1);
            this.spritesInventario[i] = sprite;
        }
    }

    updateIventario() {
        for (let i = 0; i < 6; i++) {
            if (this.inventario[i])
                this.spritesInventario[i].setTexture(this.inventario[i]);
            else 
                this.spritesInventario[i].setTexture('seta');
        }
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
        } 
    }

    update(){}
}    