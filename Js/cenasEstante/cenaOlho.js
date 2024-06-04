import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";
export default class cenaOlho extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaOlho'
        });
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    preload(){}

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.background = this.add.image(450, 275, 'cenaOlho');

        this.add.image(450, 275, 'papelGlobo').setDepth(0.2);

        this.olho = new itens(this, 569, 420, 'olho', 'olhoPeq');
        this.olho.setDepth(0.1);
        if(this.gameState.itensColetados[this.olho.id])
            this.olho.disableBody(true,true);


        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaMesa1');
    }
}