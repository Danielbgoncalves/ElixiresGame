import {inicializaIventarios, updateIventario, chamaCena, clickAnims, verificaCliqueNoInventario} from "../funcoesAuxiliares.js";
//import itens from "../itens.js";

export default class CenaPlantaVerde extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPlantaVerde'
        });
        this.galhoColetado = false;
    }
   
    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    preload(){}

    create(){
        this.add.image(450, 275, 'cenaPlantaVerde');

        //galho a ser coletado
        this.galho = this.add.image( 530, 380, 'galho');
        this.galho.setInteractive();
        if(this.galhoColetado) this.galho.setVisible(false);
        
        this.spritesInventario = [];
        this.itemClicado = 0; 
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaPorta');
                      
        this.input.on('pointerdown',()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX); // retorna o valor de this.itemClicado
            //this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        });
        
        // Coleta a galho
        this.galho.on('pointerdown', ()=>{
            if(this.itemClicado === 'tesoura') this.atualizaInventario();
        });
        

    }

    atualizaInventario(){
        
        let indexDaVela = this.inventario.indexOf('tesoura');
        if(indexDaVela !== -1)
            this.inventario.splice(indexDaVela, 1);

        this.inventario.push('galhoPeq');
        this.galho.setVisible(false);
        this.galhoColetado = true;
        updateIventario(this);
    }


    /*verificaOndeClicou(mouseX, mouseY,menorX,maiorX){
        verificaCliqueNoInventario(cena, mouseX, mouseY, menorX, maiorX); // retorna o valor de this.itemClicado
    }*/

    update(){}
}    