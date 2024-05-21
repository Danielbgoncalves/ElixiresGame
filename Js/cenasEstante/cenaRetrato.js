import itens from "../itens.js";
export default class CenaRetrato extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaRetrato'
        });
        this.sceneState = [0,0,0,0,0]; // 4 primeiros das fotos e o 5 de coletada a recompensa
    }
   
    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    preload(){                               
        this.load.image('cenaPortaRetrato', 'Assets/cenaRetrato-vazia.png'); // carregar o inventário
    }

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(447, 335, 'fundoPortaRetrato');
        this.ft1 = this.add.image(450, 337, 'fotoGrande1');
        this.ft2 = this.add.image(450, 337, 'fotoGrande2');
        this.ft3 = this.add.image(450, 337, 'fotoGrande3');
        this.ft4 = this.add.image(450, 337, 'fotoGrande4');

        this.verificaSceneState();

        this.add.image(450, 275, 'cenaPortaRetrato');
        this.spritesInventario = [];
        this.itemClicado; 
        
        this.inicializaIventarios();
        this.updateIventario();

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        this.seta.on('pointerdown',()=>{
            this.cameras.main.fadeOut(200, 0, 0, 0, (camera, progress)=> {
                if (progress > 0.9) {
                    this.scene.start('CenaEstante', {inventario: this.inventario, gameState: this.gameState});
                }
            }, this);
        });

        // Detecta o clique e a região
        this.input.on('pointerdown',()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
            this.mostraChave();  
        });

        // Coleta a chave               
        this.chaveAmarela = new itens(this, 250, 475, 'chaveAmarela', 'chaveAmarela');
        this.chaveAmarela.angle = 90;
        this.chaveAmarela.setVisible(false);
        //this.chaveAmarela.coletavel = false;
        if(this.gameState.itensColetados[this.chaveAmarela.id])
            this.chaveAmarela.disableBody(true,true);

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

    verificaOndeClicou(mouseX, mouseY,menorX,maiorX){
        if(mouseX > menorX && mouseX < maiorX){
            if( mouseY > 48 && mouseY < 116)
                this.itemClicado = this.inventario[0];
            else if (mouseY > 48 + 76*1 && mouseY < 116 + 76*1)
                this.itemClicado = this.inventario[1];
            else if (mouseY > 48 + 76*2 && mouseY < 116 + 76*2)
                this.itemClicado = this.inventario[2];
            else if (mouseY > 48 + 76*3 && mouseY < 116 + 76*3)
                this.itemClicado = this.inventario[3];
            else if (mouseY > 48 + 76*4 && mouseY < 116 + 76*4)
                this.itemClicado = this.inventario[4];
            else if (mouseY > 48 + 76*5 && mouseY < 116 + 76*5)
                this.itemClicado = this.inventario[5];
            else this.itemClicado = 0;
        } else if(mouseX > 294 && mouseY > 174 && mouseX < 601 && mouseY < 486){
                this.index = this.inventario.indexOf(this.itemClicado);
                if(this.index != -1)
                    if (this.itemClicado == 'fotoPeq1'){
                        this.ft1.setVisible(true);
                        this.inventario.splice(this.index, 1);
                        this.sceneState[0] = 1;
                    } else if (this.itemClicado == 'fotoPeq2'){
                        this.ft2.setVisible(true);
                        this.inventario.splice(this.index, 1);
                        this.sceneState[1] = 1;
                    } else if (this.itemClicado == 'fotoPeq3'){
                        this.ft3.setVisible(true);
                        this.inventario.splice(this.index, 1);
                        this.sceneState[2] = 1;
                    } else if (this.itemClicado == 'fotoPeq4'){
                        this.ft4.setVisible(true);
                        this.inventario.splice(this.index, 1);
                        this.sceneState[3] = 1;
                    } 
                this.updateIventario();
                this.itemClicado = 0;
                
        }
    }

    verificaSceneState(){
        if(this.sceneState[0] == 0) this.ft1.setVisible(false);
        if(this.sceneState[1] == 0) this.ft2.setVisible(false);
        if(this.sceneState[2] == 0) this.ft3.setVisible(false);
        if(this.sceneState[3] == 0) this.ft4.setVisible(false);
        //if(this.sceneState[4] == 0) this..setVisible(false); //mostrar a recompensa;
    }

    mostraChave(){
        let cont = 0;
        for(let i = 0; i < this.sceneState.length; i++)
            cont += this.sceneState[i];

        if(cont == 4 && this.sceneState[4] == 0){
            this.chaveAmarela.setVisible(true);
            this.sceneState[4] = 1;
            //this.chaveAmarela.coletavel = true;
        }
            

    }

    update(){
        /*for(let i = 0; i < this.inventario.length; i ++)
            if(this.inventario[i] == 'chaveAmarela'){
                this.chaveAmarela.setVisible(false);
                console.loh('era pra ta invisivel');
            }*/
                

    }
}