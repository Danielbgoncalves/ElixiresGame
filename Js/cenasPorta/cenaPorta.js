import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena} from "../funcoesAuxiliares.js";

export default class CenaPorta extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPorta'
        });
        this.primeiraVez = true;
        this.gameState = {
            itensColetados: {}
        };
        /*this.inventario = this.inventario || [];
        this.spritesInventario = this.spritesInventario || [];*/
    }

    init(data){
        if(this.primeiraVez){
            this.inventario = [];
            this.primeiraVez = false;
        } else {
            this.inventario = data.inventario;
            this.gameState = data.gameState;
        }
        
    }

    preload(){}  

    create(){
        
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cena1' );

        //setas
        this.setaEsq = this.add.image(20, 275, 'seta');
        this.setaEsq.setInteractive();
        this.setaDir = this.add.image(790, 275, 'seta');
        this.setaDir.setInteractive();
        this.setaDir.angle = 180;

        this.gaiola = this.add.image(206,333, 'gaiola')
        this.gaiola.setInteractive();

        this.plantaVerde = this.add.image(627, 385, 'plantaVerde');
        this.plantaVerde.setInteractive();

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);

        // Ítem pegável
        this.pedacoFoto1 = new itens(this, 450, 300, 'fotoPeq1', 'fotoPeq1');
        if(this.gameState.itensColetados[this.pedacoFoto1.id])
            this.pedacoFoto1.disableBody(true,true);


        this.pedacoFoto4 = new itens(this, 450, 300, 'fotoPeq4', 'fotoPeq4');
        if(this.gameState.itensColetados[this.pedacoFoto4.id])
            this.pedacoFoto4.disableBody(true,true);
        
        // Setas
        chamaCena(this.setaEsq, this ,'CenaRelogio');
        chamaCena(this.setaDir, this  ,'CenaEstante');

        // Gaiola
        chamaCena(this.gaiola, this  ,'CenaGaiola');

        // Planta verde
        chamaCena(this.plantaVerde, this  ,'CenaPlantaVerde');
        
    
    }

    

    update(){

        
    }
}