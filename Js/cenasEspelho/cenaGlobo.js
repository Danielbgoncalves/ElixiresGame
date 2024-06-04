import {inicializaIventarios, updateIventario, chamaCena, clickAnims, verificaCliqueNoInventario, retiraDoInventario} from "../funcoesAuxiliares.js";
export default class cenaGlobo extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaGlobo'
        });
        this.podeMostrarOlho = false;
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    preload(){}

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.background = this.add.image(450, 275, 'cenaGlobo');

        if(this.podeMostrarOlho)   this.add.image(398, 338, 'olho');

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaEspelho');

        // Identifica cliques 
        this.input.on('pointerdown',() =>{
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

        if(mouseX > 365 && mouseY > 305 && mouseX < 430 && mouseY < 360 ) {
            if(this.itemClicado == 'olhoPeq'){
                this.colocaOlho();
            } 
        }

        if( this.podeMostrarOlho ){
            this.scene.start('CenaDesafioFilho');
        }
    }

    colocaOlho(){
        retiraDoInventario(this, 'olhoPeq');
        this.seta.setVisible(false);

        
        this.add.image(398, 338, 'olhoPeq');
        
        this.time.delayedCall(300, () =>{
            this.podeMostrarOlho = true;
        });
    }

    update(){}
}