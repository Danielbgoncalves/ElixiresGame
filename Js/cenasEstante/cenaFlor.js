import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, clickAnims, verificaCliqueNoInventario, retiraDoInventario} from "../funcoesAuxiliares.js";

export default class cenaFlor extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaFlor'
        });
        this.posAgua = false;
        this.posFlor = false;
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    preload(){}

    create(){
        this.background = this.add.image(450, 275, 'cenaFlor');

        this.vaso = this.add.image(198, 358, 'vasoVazio');
        this.vaso.setInteractive();

        this.flor = this.add.image(198, 277, 'flor');
        this.flor.setVisible(false);

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);
        

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaEstante');

        this.input.on('pointerdown',() =>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;
            
            verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX);
            //this.destaca(this.itemClicado);
        }); 

        this.vaso.on('pointerdown', () =>{
            if(this.itemClicado === 'vasilhaComAgua'){
                this.vaso.setTexture('vasoComAgua');
                this.posAgua = true;
                retiraDoInventario(this, 'vasilhaComAgua');

            } else if(this.itemClicado === 'florPeq' && this.posAgua){
                this.flor.setVisible(true);
                retiraDoInventario(this, 'florPeq');
            }
                     
        });
    }

    

    update(){

        //this.destaca(this.itemClicado)
    }
    
}