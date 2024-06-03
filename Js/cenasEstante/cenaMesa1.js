import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";

export default class cenaMesa1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaMesa1'
        });
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    preload(){}

    create(){
        this.add.image(450, 275, 'cenaMesa1');

        /*this.obs = this.add.image(450, 275, 'obstaculos');
        this.obs.setInteractive();

        this.obs.on('pointerdown', () =>{
            console.log('encostou');
        });*/

        // caixa1
        this.caixa = this.add.image(532, 240, 'caixa1');
        this.caixa.setInteractive();

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaEstante');
        chamaCena(this.caixa, this, 'CenaCaixa1');

    }

   
    update(){

    }

}