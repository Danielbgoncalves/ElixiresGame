import {inicializaIventarios, updateIventario, chamaCena} from "../funcoesAuxiliares.js";

export default class CenaMesa2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaMesa2'
        });
    }


    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaMesa2');

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);

        // Seta pra sair da cena
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaEspelho');

        this.input.on('pointerdown', ()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;

            console.log('x: ', mouseX, 'y: ', mouseY);
            if(mouseX < 790 && mouseY < 63 )
                this.scene.start('CenaSobreMesa2', {inventario: this.inventario, gameState: this.gameState});
        });
    }

    update(){}
}