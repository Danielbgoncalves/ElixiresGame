import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, verificaCliqueNoInventario} from "../funcoesAuxiliares.js";

export default class CenaMesa3 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaMesa3'
        });
    }
   
    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    create(){
         this.cameras.main.fadeIn(400, 0, 0, 0);
         this.add.image(450, 275, 'cenaMesa3');

         this.gaveta1 = this.add.image(387, 270, 'gavetaFechada-cena4');
         this.gaveta1.n = 1;
         this.gaveta1.setInteractive();

         this.gaveta2 = this.add.image(387, 379, 'gavetaFechada-cena4');
         this.gaveta2.n = 1;
         this.gaveta2.setInteractive();


         this.spritesInventario = [];
         inicializaIventarios(this);
         updateIventario(this);

         // Seta pra sair da cena
         this.seta = this.add.image(450, 520, 'seta');
         this.seta.setInteractive();
         this.seta.angle = 270;

         chamaCena(this.seta, this, 'CenaRelogio');

         this.mudatextura(this.gaveta1);
         this.mudatextura(this.gaveta2);

         /*this.gaveta1.on('pointerdown', ()=>{ 
            this.mudatextura(this.gaveta1);
         });

         this.gaveta2.on('pointerdown', ()=>{ 
            this.mudatextura(this.gaveta2);
         });*/

         /*this.input.on('pointerdown', ()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            console.log('x: ', mouseX, 'y: ', mouseY);
         });*/

    }

    mudatextura(gaveta){
        gaveta.on('pointerdown', ()=>{ 
            if(gaveta === this.gaveta1){
                gaveta.setDepth(1);
                this.gaveta2.setDepth(0);
            } else {
                gaveta.setDepth(1);
                this.gaveta1.setDepth(0);
            }
    
            if(gaveta.n % 2){
                gaveta.setTexture('gavetaFechada-cena4');
                if(this.pedacoFoto3) this.pedacoFoto3.disableBody(true,true);
                if(this.pedacoFoto2) this.pedacoFoto2.disableBody(true,true);
            } else{
                this.gavetaAberta(gaveta);  
                gaveta.setTexture('gavetaAberta-cena4');
            }
            gaveta.n ++;
        });
    }

    gavetaAberta(gaveta){
        
        if(gaveta === this.gaveta1){
            this.pedacoFoto2 = new itens(this, 400, 270, 'fotoPeq2', 'fotoPeq2');
            this.pedacoFoto2.angle = 130;
            this.pedacoFoto2.setDepth(1);
            if(this.gameState.itensColetados[this.pedacoFoto2.id])
                this.pedacoFoto2.disableBody(true,true);

        } else {
            this.pedacoFoto3 = new itens(this, 380, 390, 'fotoPeq3', 'fotoPeq3');
            this.pedacoFoto3.setDepth(1);
            if(this.gameState.itensColetados[this.pedacoFoto3.id])
                this.pedacoFoto3.disableBody(true,true);

        }
        
    }

    update(){}
}