import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";

export default class CenaPonteiros extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaPonteiros'
        });
    }

    

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    
    preload(){}

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaPonteiros' );

        // Os Ponteiros, estrelas dessa cena
        this.ponteiroG = this.add.image(436, 308, 'ponteiroG');
        this.ponteiroG.setInteractive();
        this.ponteiroG.setOrigin(0.5, 0.9);


        this.ponteiroP = this.add.image(436, 308, 'ponteiroP');
        this.ponteiroP.setInteractive();
        this.ponteiroP.setOrigin(0.5, 0.9);
        this.ponteiroP.angle = 90;

        this.ponteiroP.on('pointerdown', () =>{
            this.draggingP = true;
        });

        this.ponteiroG.on('pointerdown', () =>{
            this.draggingG = true;
        });

        this.input.on('pointerup', () =>{
            this.draggingP = false;
            this.draggingG = false;
            this.verificaCorretude();
        });

        this.add.image(436, 308, 'botaoRelogio');
  

        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;


        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);


        chamaCena(this.seta, this, 'CenaRelogio');
    }

    verificaCorretude(){

        // Senha 1: 
        if(this.angulacaoP > 175 && this.angulacaoP < 185 && this.angulacaoG > 265 && this.angulacaoG< 275){
            console.log('acertou');

            /*
                Agora precisa fazer a recompensa aparecer, talvezz uma tesoura para cortar o galho
                verde. Ou a chave do diario de poemas dele.
            */

        }
    }

    update(){
        if(this.draggingP){
            let pointer = this.input.activePointer;
            let anguloEnRadianos = Phaser.Math.Angle.Between(this.ponteiroP.x, this.ponteiroP.y, pointer.x, pointer.y);
            let anguloEmGraus = Phaser.Math.RadToDeg(anguloEnRadianos);
            this.angulacaoP = 90 + anguloEmGraus;
            this.ponteiroP.angle = this.angulacaoP
        }

        if(this.draggingG){
            let pointerG = this.input.activePointer;
            let anguloEnRadianos = Phaser.Math.Angle.Between(this.ponteiroG.x, this.ponteiroG.y, pointerG.x, pointerG.y);
            let anguloEmGraus = Phaser.Math.RadToDeg(anguloEnRadianos);
            this.angulacaoG = 90 + anguloEmGraus;
            this.ponteiroG.angle =  this.angulacaoG;
        }
    }
}