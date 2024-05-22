import {inicializaIventarios, updateIventario, chamaCena, verificaCliqueNoInventario, clickAnims} from "../funcoesAuxiliares.js";

export default class CenaEspelhoMesmo extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaEspelhoMesmo'
        });
    }


    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaEspelhoMesmo');
        this.add.image(450, 275, 'espelho').setDepth(0.2);
        this.add.image(359, 475, 'escondeEldric').setDepth(0.3);

        this.eldric = this.add.image(360, 350, 'eldric');
        
        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta').setDepth(0.3);
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaEspelho');

        this.input.on('pointerdown',()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;
            
            console.log('x: ', mouseX, 'y: ', mouseY);            
            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        });

    }

    verificaOndeClicou(mouseX, mouseY,menorX,maiorX){

        verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX);

         if(mouseX > 79 && mouseY > 87 && mouseX < 640 && mouseY < 400 ) {
            if(this.itemClicado == 'copoPeq'){
                this.mudaSprite();
            }
        }
    }

    mudaSprite(){
        let indexDaVela = this.inventario.indexOf('copoPeq');
        if(indexDaVela !== -1)
            this.inventario.splice(indexDaVela, 1);
        updateIventario(this);

        this.eldric.setTexture('eldric-seguraCopo');
    }

    update(){
        if(this.eldric.y > 280)
            this.eldric.y-=1.5;
    }
}