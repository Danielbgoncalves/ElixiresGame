import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";


export default class CenaLivros extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaLivros'
        });
        //this.livros = [];
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    preload(){}

    create(){
        this.add.image(450, 275, 'cenaLivros');

        this.livros = [];
        this.defineLivros();

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        this.input.on('drag', (pointer,gameObject,dragX,dragY)=>{
            gameObject.setDepth(1);
        });

        this.input.on('drag', (pointer,gameObject,dragX,dragY)=>{
                gameObject.x = dragX;
        });

        this.input.on('dragend', (pointer, gameObject)=> {
            this.reordenarLivros();
            gameObject.setDepth(0);
            this.verificaCorretude();
        });

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        // Se clica na seta
        chamaCena(this.seta, this, 'CenaEstante');

    }
    
    defineLivros(){ 
        
        this.livro1 = this.add.image(85, 295, 'livro1').setInteractive();
        this.livro2 = this.add.image(174, 295, 'livro2').setInteractive();
        this.livro3 = this.add.image(263, 295, 'livro3').setInteractive();
        this.livro4 = this.add.image(352, 295, 'livro4').setInteractive();
        this.livro5 = this.add.image(441, 295, 'livro5').setInteractive();

        this.input.setDraggable(this.livro1);
        this.input.setDraggable(this.livro2);
        this.input.setDraggable(this.livro3);
        this.input.setDraggable(this.livro4);
        this.input.setDraggable(this.livro5);

        this.livro1.id = 1;
        this.livro2.id = 2;
        this.livro3.id = 3;
        this.livro4.id = 4;
        this.livro5.id = 5;

        this.livros.push(this.livro1);
        this.livros.push(this.livro2);
        this.livros.push(this.livro3);
        this.livros.push(this.livro4);
        this.livros.push(this.livro5);

        this.reordenarLivros();
        
    }

    reordenarLivros() {
        // Ordena o array de livros pela posição x
        this.livros.sort(function(a, b) {
            return a.x - b.x;
        });
    
        // Ajusta a posição dos livros
        for (var i = 0; i < this.livros.length; i++) {
            this.livros[i].x = 85 + i * 89; 
        }

    }

    verificaCorretude(){
        this.senha = [4,1,5,2,3];
        this.deAcordo = true;
        for( let i = 0; i < 5; i++)
            if(this.livros[i].id != this.senha[i])
              this.deAcordo = false; 
            
        if(this.deAcordo) this.mostraLivro();
    }

    mostraLivro(){
        this.gameState.borraLivros = true;
        this.pedacoFoto1 = new itens(this, 570, 295, 'oUltElixir-dorso', 'oUltElixir-dorsoPeq');
        if(this.gameState.itensColetados[this.pedacoFoto1.id])
            this.pedacoFoto1.disableBody(true,true);
    }

    

    update(){

    }

}    