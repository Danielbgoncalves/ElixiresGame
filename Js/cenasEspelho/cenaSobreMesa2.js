import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, clickAnims} from "../funcoesAuxiliares.js";

export default class CenaSobreMesa2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaSobreMesa2'
        });
        this.paginas = [];
    }


    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }
 
    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaSobreMesa2');

        this.setaEsq = this.add.image(250, 275, 'seta');
        this.setaEsq.setInteractive();
        this.setaDir = this.add.image(640, 275, 'seta');
        this.setaDir.setInteractive();
        this.setaDir.angle = 180;

        this.index = 0;
        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Logica das setas
        this.seta = this.add.image(450, 520, 'seta').setDepth(0.3);
        this.seta.setInteractive();
        this.seta.angle = 270;
        chamaCena(this.seta, this, 'CenaEspelho');

        this.mudaPagina(this.setaDir, 1);
        this.mudaPagina(this.setaEsq, -1);
                

        // Copo d'agua coletável
        this.copo = new itens(this, 100, 410, 'copo', 'copoPeq');
        if(this.gameState.itensColetados[this.copo.id])
            this.copo.disableBody(true,true);

        // Páginas do diário
        for(let i = 0; i < 5; i++)
            this.paginas.push('diario-' + i);

       

        this.paginaAtual = this.add.image(450,300, 'diario-0');

      
                
    }

    mudaPagina(objeto, valor){
        objeto.on('pointerdown',()=>{
            this.mostraPaginasDoLivro(valor);
        });
    }

    mostraPaginasDoLivro(sum){
        this.index += sum;
        if(this.index < 0) this.index = 4;
        if(this.index == 5) this.index = 0;
        console.log('a');
        this.paginaAtual.setTexture(this.paginas[this.index]);
    }

    update(){}
}