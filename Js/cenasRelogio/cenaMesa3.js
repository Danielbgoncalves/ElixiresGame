import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, verificaCliqueNoInventario, clickAnims} from "../funcoesAuxiliares.js";

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

         this.criarGavetas();
     
         this.spritesInventario = [];
         inicializaIventarios(this);
         updateIventario(this);
         clickAnims(this);

         // Seta pra sair da cena
         this.seta = this.add.image(450, 520, 'seta');
         this.seta.setInteractive();
         this.seta.angle = 270;

         chamaCena(this.seta, this, 'CenaRelogio');

         this.cliqueNaGaveta(this.gaveta1F);
         this.cliqueNaGaveta(this.gaveta1A);
         this.cliqueNaGaveta(this.gaveta2F);
         this.cliqueNaGaveta(this.gaveta2A);


    }

    criarGavetas(){
        this.gaveta1F = this.add.image(387, 270, 'gavetaFechada-cena4');
         this.gaveta1F.setInteractive();

         this.gaveta1A = this.add.image(387, 255, 'gavetaAberta-cena4');
         this.gaveta1A.n = 1;
         this.gaveta1A.setInteractive();  
         this.gaveta1A.setDepth(0.2);       
         this.gaveta1A.setVisible(false);
        
         this.gaveta2F = this.add.image(387, 379, 'gavetaFechada-cena4');
         this.gaveta2F.setInteractive();

         this.gaveta2A = this.add.image(387, 363, 'gavetaAberta-cena4');
         this.gaveta2A.n = 1;
         this.gaveta2A.setInteractive();
         this.gaveta2A.setDepth(0.1);
         this.gaveta2A.setVisible(false);
    }

    cliqueNaGaveta(gaveta){
        gaveta.on('pointerdown', () =>{
            if(gaveta === this.gaveta1F)
                this.gavetaAbre(1);
            else if(gaveta === this.gaveta1A)
                this.gavetaFecha(1);
            else if(gaveta === this.gaveta2F)
                this.gavetaAbre(2);
            else if(gaveta === this.gaveta2A)
                this.gavetaFecha(2);
        });

    }

    gavetaAbre(id){
        if(id === 1){
            this.gaveta1F.setVisible(false);
            this.gaveta1A.setVisible(true);

            this.pedacoDeFoto2 = new itens(this, 390, 264, 'fotoPeq2', 'fotoPeq2');
            this.pedacoDeFoto2.setDepth(0.2);
            this.pedacoDeFoto2.angle = 90;
            if(this.gameState.itensColetados[this.pedacoDeFoto2.id])
                this.pedacoDeFoto2.disableBody(true,true);

        } else if( id === 2){
            this.gaveta2F.setVisible(false);
            this.gaveta2A.setVisible(true);

            this.pedacoDeFoto3 = new itens(this, 405, 370, 'fotoPeq3', 'fotoPeq3');
            this.pedacoDeFoto3.setDepth(0.1);
            this.pedacoDeFoto3.angle = 90;
            if(this.gameState.itensColetados[this.pedacoDeFoto3.id])
                this.pedacoDeFoto3.disableBody(true,true);
        }
    }

    gavetaFecha(id){
        if(id === 1){
            this.gaveta1A.setVisible(false);
            this.gaveta1F.setVisible(true);
            this.pedacoDeFoto2.disableBody(true,true);

        } else if(id === 2){
            this.gaveta2A.setVisible(false);
            this.gaveta2F.setVisible(true);
            this.pedacoDeFoto3.disableBody(true,true);
        }

    }
    

    update(){}
}