import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena} from "../funcoesAuxiliares.js";


export default class cenaCaixa1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaCaixa1'
        });
        this.codigoCorreto = false;
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
    preload(){}

    create(){
        this.imagemDeFundo = this.add.image(450, 275, 'cenaCaixa1-fechada');

        this.simb1 = this.add.image(285, 325, 'caixa-simb1');
        this.simb2 = this.add.image(406, 325, 'caixa-simb1');
        this.simb3 = this.add.image(529, 325, 'caixa-simb1');
        
        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);

        //triangulo = 0, somatorio = 3, birculo = 2, fecha = 1,
        this.senha = [0,3,2];
        if(!this.codigoCorreto) this.codigoAtual = [2,0,3];
            else this.codigoAtual = [0,3,2];

        this.listaDoCodigo = ['caixa-simb1','caixa-simb4','caixa-simb3','caixa-simb2'];
        this.mostraCodigo();

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta');
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaMesa1');

        this.input.on('pointerdown', ()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorY = 285;
            let maiorY = 365;
            this.verificaOndeClicou(mouseX, mouseY, menorY, maiorY);
        });
       
    }

    mostraCodigo(){
        if(!this.codigoCorreto){
            this.simb1.setTexture(this.listaDoCodigo[this.codigoAtual[0]]);
            this.simb2.setTexture(this.listaDoCodigo[this.codigoAtual[1]]);
            this.simb3.setTexture(this.listaDoCodigo[this.codigoAtual[2]]);
        } else {
            this.simb1.setTexture('vazio');
            this.simb2.setTexture('vazio');
            this.simb3.setTexture('vazio');
        }
    }

    verificaOndeClicou(mouseX, mouseY, menorY, maiorY){
        if(mouseY > menorY && mouseY < maiorY && !this.codigoCorreto )
            if(mouseX > 240 && mouseX < 328 ) this.codigoAtual[0]++;
            else if (mouseX > 362 && mouseX < 450 ) this.codigoAtual[1]++;
            else if (mouseX > 485 && mouseX < 573 ) this.codigoAtual[2]++;
        
        for(let i = 0; i < 4; i++)
            if(this.codigoAtual[i] == 4) this.codigoAtual[i] = 0; 

        this.mostraCodigo();
        this.verificaCodigo();
    }

    verificaCodigo(){
        if(this.senha.every((value, index) => value === this.codigoAtual[index])){
            this.codigoCorreto = true;
            this.caixaAberta();
        }
    }

    caixaAberta(){
        this.imagemDeFundo.setTexture('cenaCaixa1-aberta');
        this.pedacoFoto1 = new itens(this, 450, 300, 'fotoPeq1', 'fotoPeq1');
        if(this.gameState.itensColetados[this.pedacoFoto1.id])
            this.pedacoFoto1.disableBody(true,true);
        this.mostraCodigo();
    }

    update(){

    }

}