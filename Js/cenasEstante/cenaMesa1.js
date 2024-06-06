import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, clickAnims, verificaCliqueNoInventario, retiraDoInventario} from "../funcoesAuxiliares.js";

export default class cenaMesa1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaMesa1'
        });

        this.aberta = false;
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    preload(){}

    create(){
        this.background = this.add.image(450, 275, 'cenaMesa1');
        if(this.aberta) this.abrePortas();

        // caixa1
        this.caixa = this.add.image(532, 240, 'caixa1');
        this.caixa.setInteractive();

        // Objetos dela aberta
        this.obj1 = this.add.image(530, 400,'objetos1');
        this.obj1.setInteractive();
        this.obj1.setVisible(false);

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
        chamaCena(this.obj1, this, 'CenaOlho');

        this.input.on('pointerdown',() =>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;
            
            //console.log(mouseX, mouseY);
            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        }); 

    }

    verificaOndeClicou(mouseX, mouseY,menorX,maiorX){

        verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX);

         if(mouseX > 136 && mouseY > 244 && mouseX < 768 && mouseY < 498 ) {
            if(this.itemClicado == 'chaveMesa1'){
                this.abrePortas();
            } 
        }
    }

    abrePortas(){
        this.itemClicado = 0;
        this.aberta = false;
        retiraDoInventario(this, 'chaveMesa1');
        this.background.setTexture('cenaMesa1Tx2');

        this.obj1.setVisible(true);

        this.mostraVasoEFlor();
        
    }

    mostraVasoEFlor(){
        this.vasilhaComAgua = new itens(this, 210, 405, 'vasilhaComAgua', 'vasilhaComAgua');
        if(this.gameState.itensColetados[this.vasilhaComAgua.id])
            this.vasilhaComAgua.disableBody(true,true);

        this.flor = new itens(this, 250, 390, 'florPeq', 'florPeq');
        if(this.gameState.itensColetados[this.flor.id])
            this.flor.disableBody(true,true);
    }

   
    update(){

    }

}