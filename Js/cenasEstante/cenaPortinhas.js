import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, clickAnims, verificaCliqueNoInventario, retiraDoInventario} from "../funcoesAuxiliares.js";

export default class CenaPortinhas extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPortinhas'
        });
        this.texturaDacena = 'cenaPortinhas';
    }

    

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    preload(){}

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.fundo = this.add.image(450, 275, this.texturaDacena );

        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        this.desenhaSimbolos();

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);


        chamaCena(this.seta, this, 'CenaEstante');

        this.input.on('pointerdown', () =>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            //console.log('x: ', mouseX, 'y: ', mouseY);
            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
             
        });

        
        this.clicouNoSimb(this.um);
        this.clicouNoSimb(this.dois);
        this.clicouNoSimb(this.tres);
        this.clicouNoSimb(this.qua);
        
    }

    verificaOndeClicou(mouseX, mouseY,menorX,maiorX){

        verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX);

         if(mouseX > 398 && mouseY > 103 && mouseX < 616 && mouseY < 410 ) {
            console.log('entrou no primeiro if')

            if(this.itemClicado === 'chaveQuadrada'){ // Muda o fundo dessa cena
                retiraDoInventario(this, 'chaveQuadrada');
                this.texturaDacena = 'cenaPortinhasTx2';
                this.fundo.setTexture(this.texturaDacena);
                this.iniciaPuzzle2();

            } 
        } else if(mouseX > 167 && mouseY > 103 && mouseX < 375 && mouseY < 410 ){
            console.log('entrou no seg if')

            if (this.itemClicado === 'chaveTriangularPeq'){
                console.log('desenhou os itens')
                this.itemClicado = 0;
                retiraDoInventario(this, 'chaveTriangularPeq');
                this.texturaDacena = 'cenaPortinhasTx3';
                this.fundo.setTexture(this.texturaDacena);
                this.mostraElixir();
                this.mostraFaca();
            }
        }
    }

    desenhaSimbolos(){
            this.um = this.add.image(449, 255, 'simb0');
            this.um.setInteractive();
            this.um.id = 0;
            this.um.setVisible(false);
            this.dois = this.add.image(490, 254, 'simb0');
            this.dois.setInteractive();
            this.dois.id = 0;
            this.dois.setVisible(false);
            this.tres = this.add.image(531, 255, 'simb0');
            this.tres.setInteractive();
            this.tres.id = 0;
            this.tres.setVisible(false);
            this.qua = this.add.image(572, 255, 'simb0');
            this.qua.setInteractive();
            this.qua.id = 0;
            this.qua.setVisible(false);
        }

    iniciaPuzzle2(){
        this.vecDeImagens = [];
        for(let i = 0; i < 6; i++){        
            this.vecDeImagens.push('simb' + i);
        }            

        this.um.setVisible(true);
        this.dois.setVisible(true);
        this.tres.setVisible(true);
        this.qua.setVisible(true);

        //console.log(this.vecDeImagens);
    }

        
    clicouNoSimb(simb){
        simb.on('pointerdown', () =>{
            simb.id++;
            if(simb.id === 6) simb.id = 0;

            simb.setTexture(this.vecDeImagens[simb.id]);
            this.verificaCorretude();
        });
    }
    
    verificaCorretude(){
        //console.log(this.um.id, this.dois.id, this.tres.id, this.qua.id);
        if(this.um.id === 0 && this.dois.id === 0 && this.tres.id === 0 && this.qua.id === 1){
            // Mostra o item a ser coletado 
            this.tesoura = new itens(this, 485, 345, 'tesoura', 'tesoura');
                if(this.gameState.itensColetados[this.tesoura.id])
                    this.tesoura.disableBody(true,true);

            this.gameState.mostraSenhaDaVela = false;
        }
    }

    mostraElixir(){
        this.elixirDaMente = new itens(this, 250, 345, 'elixirDaMente', 'elixirDaMentePeq');
        if(this.gameState.itensColetados[this.elixirDaMente.id])
            this.elixirDaMente.disableBody(true,true);
    }

    mostraFaca(){
        this.faca = new itens(this, 280, 345, 'faca', 'facaPeq');
        if(this.gameState.itensColetados[this.faca.id])
            this.faca.disableBody(true,true);
    }

    update(){}
}