import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";

export default class cenaEstante extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaEstante'
        });
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    preload(){}
    
    create(){
        //this.inventario.push('alavanca');
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cena2' );

        //setas
        this.setaEsq = this.add.image(20, 275, 'seta');
        this.setaEsq.setInteractive();
        this.setaDir = this.add.image(790, 275, 'seta');
        this.setaDir.setInteractive();
        this.setaDir.angle = 180;

        // Retrato
        this.portaRetrato = this.add.image(610,260, 'portaRetrato');
        this.portaRetrato.setInteractive();

        // Livros
        this.livros = this.add.image(569, 317, 'livros');
        this.livros.setInteractive();

        // Vaso de Flor
        this.vasoDeFlor = this.add.image(555, 372, 'vasoVazio');
        this.vasoDeFlor.setInteractive();
        this.vasoDeFlor.setScale(0.22);
        

        // Mesinha 
        this.mesa = this.add.image(195,393, 'mesa1');
        this.mesa.setInteractive();

        // Portinhas
        this.portinhas = this.add.image(580,440, 'portinhas');
        this.portinhas.setInteractive();
        
        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        

        // Clique nas setas
        chamaCena(this.setaEsq, this, 'CenaPorta');

        chamaCena(this.setaDir, this, 'CenaEspelho');

        // Clique no porta retrato
        chamaCena(this.portaRetrato, this,'CenaRetrato');

        // Clique na mesinha
        chamaCena(this.mesa, this,'CenaMesa1');

        // Clique nos livros
        chamaCena(this.livros, this,'CenaLivros');

        // Clique no vaso
        chamaCena(this.vasoDeFlor, this, 'CenaFlor');

        // Clique nas portinhas
        chamaCena(this.portinhas, this,'CenaPortinhas');

        

    }

    update(){

    }
}