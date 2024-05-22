import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";

export default class CenaRelogio extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaRelogio'
        });
    }

    

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    preload(){
        this.load.image('cena4', 'Assets/cena4c.png');
    }

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cena4' );

        // Vela
        this.vela = this.add.image(600, 313, 'vela');
        this.vela.setInteractive();

        // Setas
        this.setaEsq = this.add.image(20, 275, 'seta');
        this.setaEsq.setInteractive();
        this.setaDir = this.add.image(790, 275, 'seta');
        this.setaDir.setInteractive();
        this.setaDir.angle = 180;

        // Pulpito
        this.pulpito = this.add.image(186, 423, 'pulpito');
        this.pulpito.setInteractive();

        // Mesa3
        this.mesa3 = this.add.image(598, 410, 'mesa3');
        this.mesa3.setInteractive();

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        
        chamaCena(this.setaEsq, this, 'CenaEspelho');
        chamaCena(this.setaDir, this, 'CenaPorta');
        chamaCena(this.pulpito, this, 'CenaPulpito');
        chamaCena(this.mesa3, this, 'CenaMesa3');
        chamaCena(this.vela, this,'CenaVela');

    }

    chamaCena(objeto, cena){
        objeto.on('pointerdown',()=>{
            this.cameras.main.fadeOut(200, 0, 0, 0, (camera, progress)=> {
                if (progress > 0.9) {
                    this.scene.start(cena, {inventario: this.inventario, gameState: this.gameState});
                }
            }, this);
            
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

    update(){

    }
}