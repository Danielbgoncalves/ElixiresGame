import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";

export default class CenaPorta extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPorta'
        });
        this.primeiraVez = true;
        this.gameState = {
            itensColetados: {},
            mostraSenhaDaVela: false,
            borraPonterios: false,
            borraLivros: false,
            tx2NaCena3: false
        };
       
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

        //this.sys.game.music = this.sound.add('mainTheme');
        //this.sys.game.music.play({ loop: true });

        this.musica = this.sound.add('mainTheme', { volume: 1, loop: true });

        if(!this.musica.isPlaying)
            this.musica.play();


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
        clickAnims(this);

        // Ítem pegável
        this.chaveMesa1 = new itens(this, 400, 150, 'chaveMesa1', 'chaveMesa1');
        if(this.gameState.itensColetados[this.chaveMesa1.id])
            this.chaveMesa1.disableBody(true,true);

        
        // Setas
        chamaCena(this.setaEsq, this ,'CenaRelogio');
        chamaCena(this.setaDir, this  ,'CenaEstante');

        // Gaiola
        chamaCena(this.gaiola, this  ,'CenaGaiola');

        // Planta verde
        chamaCena(this.plantaVerde, this  ,'CenaPlantaVerde');

        //temporario
        

        

        
    }
    
    update(){

        
    }
}