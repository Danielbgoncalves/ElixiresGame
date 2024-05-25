import itens from "../itens.js";
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
        this.angulacaoG = 0;


        this.ponteiroP = this.add.image(436, 308, 'ponteiroP');
        this.ponteiroP.setInteractive();
        this.ponteiroP.setOrigin(0.5, 0.9);
        this.ponteiroP.angle = 90;
        this.angulacaoP = 90;

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
        this.portaSecreta = this.add.image(228, 262, 'portaSecretaRlg');
        this.portaSecreta.setVisible(false);
  

        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);
        this.acertouSenha1 = false;


        chamaCena(this.seta, this, 'CenaRelogio');
    }

    verificaCorretude(){

        // Senha 1: 
        if(this.angulacaoP > 175 && this.angulacaoP < 185 && this.angulacaoG > 265 && this.angulacaoG < 275){
            this.mostraChaveQuadrada();
            this.acertouSenha1 = true;
            this.portaSecreta.setVisible(true);
        } else {
            
        }
    }

    mostraChaveQuadrada(){
        if(!this.acertouSenha1){
            this.chaveQuadrada = new itens(this, 265, 270, 'chaveQuadrada', 'chaveQuadrada');
                if(this.gameState.itensColetados[this.chaveQuadrada.id])
                    this.chaveQuadrada.disableBody(true,true);
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