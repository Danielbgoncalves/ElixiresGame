import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";

export default class CenaPonteiros extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPonteiros'
        });
    }

    

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    preload(){}

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaPonteiros' );

        // Os Ponteiros, estrelas dessa cena
        this.ponteiroG = this.add.image(438, 314, 'ponteiroG');
        this.ponteiroP = this.add.image(438, 314, 'ponteiroP');
        this.ponteiroP.angle = 90;

        /*Falta mudar o ponto em q eles sao definidos, se colocar em suas bases fica mais facil
         fazer a manipulação de anglos */


        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;


        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);


        chamaCena(this.seta, this, 'cenaRelogio');
    }

    update(){}
}