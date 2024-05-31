import {inicializaIventarios, updateIventario, chamaCena, clickAnims, setasLaterais, verificaCliqueNoInventario, retiraDoInventario} from "../funcoesAuxiliares.js";

export default class CenaVaso extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaVaso'
        });
        this.estaPlantada = false;
    }


    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaVaso');

        setasLaterais(this);
        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Logica da seta de saída
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaEspelho');

        // Semente plantada ou não
        if(this.estaPlantada) this.add.image(400, 220, 'sementeEnterrada').setScale(0.7);

        this.input.on('pointerdown', () =>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            //console.log('x: ', mouseX, 'y: ', mouseY);
            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        });
    }

    verificaOndeClicou(mouseX, mouseY,menorX,maiorX){

        verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX);

        if(mouseX > 173 && mouseY > 173 && mouseX < 592 && mouseY < 325){ // posicao onde a semente vai ser posta 
            this.planta();
        }

    }

    planta(){
        retiraDoInventario(this, 'semente');
        this.add.image(400, 220, 'sementeEnterrada').setScale(0.7);
        this.estaPlantada =  true;
    }


}