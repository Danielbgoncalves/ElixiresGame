import itens from "../itens.js";
import {inicializaIventarios, updateIventario, chamaCena, verificaCliqueNoInventario, clickAnims, retiraDoInventario} from "../funcoesAuxiliares.js";

export default class CenaEspelhoMesmo extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaEspelhoMesmo'
        });
        this.oQueEldricSegura = 'nada'
        this.jaBebeu = false;
        this.cabeçaAberta = false;
    }


    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    create(){
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(450, 275, 'cenaEspelhoMesmo');
        this.add.image(450, 275, 'espelho').setDepth(0.2);
        this.add.image(359, 475, 'escondeEldric').setDepth(0.3);

        // Pedaço das fotos
        this.pedacoFoto4 = new itens(this, 76, 80, 'fotoPeq4', 'fotoPeq4');
        if(this.gameState.itensColetados[this.pedacoFoto4.id])
            this.pedacoFoto4.disableBody(true,true);



        // Fala do Eldric
        this.fala = this.add.image(350, 30, 'vazio');
        this.fala.setVisible(false);

        let textura; // textura do Eldric
        if(this.oQueEldricSegura === 'nada')
            textura = 'eldric';
        else if (this.oQueEldricSegura === 'copo')
            textura = 'eldric-seguraCopo';
        else if (this.oQueEldricSegura === 'cha')
            textura = 'eldric-seguraCha';
        else if (this.oQueEldricSegura === 'linha')
            textura = 'eldric-linha';
        else if (this.oQueEldricSegura === 'linhaG')
            textura = 'eldric-linhaG';

        this.eldric = this.add.image(360, 350, textura);

       //this.eldric = this.add.image(360, 350, !this.seguraCopo ? 'eldric' :  'eldric-seguraCopo');
        
        this.spritesInventario = [];
        inicializaIventarios(this);
        updateIventario(this);
        clickAnims(this);

        // Logica da seta
        this.seta = this.add.image(450, 520, 'seta').setDepth(0.3);
        this.seta.setInteractive();
        this.seta.angle = 270;

        chamaCena(this.seta, this, 'CenaEspelho');

        this.input.on('pointerdown',()=>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            let menorX = 809;
            let maiorX = 877;

            //console.log('x: ', mouseX, 'y: ', mouseY);            
            this.verificaOndeClicou(mouseX, mouseY,menorX,maiorX);
        });

    }

    verificaOndeClicou(mouseX, mouseY,menorX,maiorX){

        verificaCliqueNoInventario(this, mouseX, mouseY, menorX, maiorX);

         if(mouseX > 79 && mouseY > 87 && mouseX < 640 && mouseY < 400 ) {
            if(this.cabeçaAberta){
                if(this.itemClicado === 'elixirDaMente')
                    this.mudaSprite(8);

            } else{
                if(this.itemClicado === 'copoPeq')
                    this.mudaSprite(1);
                else if(this.itemClicado === 'galhoPeq')
                    this.mudaSprite(2);
                else if( this.itemClicado === 0 && this.oQueEldricSegura === 'cha')
                    this.mudaSprite(3);
                else if( this.oQueEldricSegura === 'linha')
                    this.mudaSprite(4);
                else if( this.oQueEldricSegura === 'linhaG'){
                    this.mudaSprite(0);
                    this.mostraSemente();
                } else if(this.itemClicado === 'elixirDaMentePeq')
                    this.mudaSprite(5);
                else if (this.itemClicado === 'facaPeq')
                    this.mudaSprite(6);
                else if (this.itemClicado === 0 && this.oQueEldricSegura === 'faca')
                    this.mudaSprite(7);
                else this.eldricFala();
            }
        }
    }

    eldricFala(){
        
        this.sobre = true;
        this.desce = false;

        if(this.oQueEldricSegura === 'nada' && !this.jaBebeu){
            this.fala.setTexture('fala1');

        } else if (this.oQueEldricSegura === 'copo'){
            this.fala.setTexture('fala2');
        }

        this.fala.setVisible(true);
        this.podeFala = true;
        
        this.time.delayedCall(3000, () =>{
            this.podeFala = false;
            this.fala.setVisible(false);
        });
    }

    mudaSprite(id){
        if(id === 0){ // muda para o normal, sem segurar nada
            this.eldric.setTexture('eldric');
            this.oQueEldricSegura = 'nada'; 
            this.itemClicado = 0;

        } else if(id === 1){ // muda para sprite segura agua
            retiraDoInventario(this, 'copoPeq');

            this.eldric.setTexture('eldric-seguraCopo');
            this.oQueEldricSegura = 'copo'; 
            this.itemClicado = 0;

        } else if( id === 2 && this.oQueEldricSegura === 'copo'){ // muda para sprite segura cha 
            retiraDoInventario(this, 'galhoPeq');

            this.eldric.setTexture('eldric-seguraCha');
            this.oQueEldricSegura = 'cha'; 
            this.itemClicado = 0;

        } else if(id === 3){
            this.eldric.setTexture('eldric-linha');
            this.oQueEldricSegura = 'linha';
            this.jaBebeu = true; 
            this.itemClicado = 0;

        } else if(id === 4){
            this.eldric.setTexture('eldric-linhaG');
            this.oQueEldricSegura = 'linhaG'; 
            this.itemClicado = 0;

        } else if(id === 5){
            this.eldric.setTexture('eldric-elixirDaMente');
            this.oQueEldricSegura = 'elixirDaMente'; 
            this.itemClicado = 0;

        } else if(id === 6){
            this.eldric.setTexture('eldric-faca');
            this.oQueEldricSegura = 'faca'; 
            this.itemClicado = 0;
        } else if(id === 7){
            retiraDoInventario(this, 'facaPeq');
            this.efeito();
            this.seta.setVisible(false);

            this.eldric.setTexture('eldric-cerebro');
            this.cabeçaAberta = true;
            this.itemClicado = 0;
        } else if(id === 8){
            this.eldric.setTexture('eldric-cabecaElixirDaMente');eldric-cabegaElixirDaMente
            this.itemClicado = 0;
        }
        
    }

    mostraSemente(){
        this.semente = new itens(this, 408, 250, 'sementeComLinha', 'semente');
        if(this.gameState.itensColetados[this.semente.id])
            this.semente.disableBody(true,true)
    }

    efeito(){
        let glow = this.add.graphics({ fillStyle: { color: 0xffffff } });
        glow.setDepth(1);
        glow.fillRect(0, 0, 790, this.game.config.height);
        glow.alpha = 0;

        this.tweens.add({
            targets: glow,
            alpha: { from: 0, to: 0.5 },
            yoyo: true,
            duration: 500
        });

        /*
        
            Ao tomar o novo elixir o cenario deve ganhar mais coisas talvez mudar de cores e aproximar 
            do fim do jogo

        */
    }

    update(){
        if(this.eldric.y > 280)
            this.eldric.y -= 1.5;

        if(this.podeFala){

            if(this.sobre) this.fala.y -= 0.1;
            if(this.desce) this.fala.y += 0.1;

            if(this.fala.y < 28){
                this.sobre = false;
                this.desce = true;
            } else if(this.fala.y > 32){
                this.sobre = true;
                this.desce = false;
            }
          
        }
    }
}