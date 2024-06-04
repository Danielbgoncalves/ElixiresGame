
export default class cenaDesafioFilho extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaDesafioFilho'
        });
    }

    init(data) {
        this.inventario = data.inventario;
        this.gameState = data.gameState;
    }

    preload(){}

    create(){
        this.desafioFundo = this.add.image(450, 275, 'desafio-fundo');
        this.faseAtual = 0;

        // Cria personagens
        this.eldricPal = this.physics.add.image(55, 350, 'eldricPalito');
        this.eldricPal.setDepth(0.1);
        this.filho = this.physics.add.staticGroup();
        this.filho.setDepth(0.1);
        this.filho.create(750, 283, 'desafio-filho');

        // buraco de saida 
        this.buraco = this.add.image(800, 400, 'desafio-burado');
        this.buraco.setInteractive();
        this.buraco.setVisible(false);
        //chamaCena(this.buraco, this, 'CenaGlobo'); /* Boiei aqui kkkk era pra ser
                                                  // quando o boneco entrasse nele nao quando clicasse */
        

        // Cria o grupo de corpos que colidem
        this.grupo = this.physics.add.staticGroup();        
        
        // Adiciona as colisões
        this.physics.add.collider(this.eldricPal, this.grupo, this.reinicia, null, this);
        this.physics.add.collider(this.eldricPal, this.filho, this.novaFase, null, this);

        // Setas pra movimentação 
        this.setaDir = this.add.image(850, 450, 'desafio-seta').setInteractive();
        this.setaEsq = this.add.image(750, 450, 'desafio-seta').setInteractive();
        this.setaCima = this.add.image(800, 400, 'desafio-seta').setInteractive();;
        this.setaBaixo = this.add.image(800, 500, 'desafio-seta').setInteractive();;

        this.setaDir.on('pointerdown', () => {this.movePlayer(50, 0)});
        this.setaEsq.on('pointerdown', () => {this.movePlayer(-50, 0)});
        this.setaCima.on('pointerdown', () => {this.movePlayer(0, -50)});
        this.setaBaixo.on('pointerdown', () => {this.movePlayer(0, 50)});

        this.setaEsq.angle   = 180;
        this.setaCima.angle  = 270;
        this.setaBaixo.angle =  90;

        // Detecta cliques na tela;
        this.input.on('pointerdown', () =>{
            let mouseX = this.input.activePointer.x;
            let mouseY = this.input.activePointer.y;
            console.log('x :', mouseX, 'y: ', mouseY);
        })

    }

    movePlayer(deltaX, deltaY) {
        this.eldricPal.setVelocity(deltaX * 10, deltaY * 10);
    
        this.time.delayedCall(100, () => {
            this.eldricPal.setVelocity(0, 0);
        });
    }

    
    reinicia(){
        this.eldricPal.setPosition(55, 350);
    }

    novaFase(){
        if(this.faseAtual === 7) this.faseFinal();
        this.faseAtual ++;
        this.eldricPal.x = 55;
        this.eldricPal.y = 350

        if(this.faseAtual === 1){
            this.grupo.create(450, 300, 'obstaculo');
            this.grupo.create(200, 230, 'obstaculo');
            this.grupo.create(400, 410, 'obstaculo');
            this.grupo.create(310, 120, 'obstaculo');

        } else if(this.faseAtual === 2){
            this.grupo.create(20, 230, 'obstaculo');
            this.grupo.create(600, 110, 'obstaculo');
            this.grupo.create(352, 300, 'obstaculo');

        } else if(this.faseAtual === 3){
            this.grupo.create(450, 200, 'obstaculo');
            this.grupo.create(500, 5000, 'obstaculo');
            this.grupo.create(480, 30, 'obstaculo');

        } else if(this.faseAtual === 4){
            this.grupo.create(671, 279, 'obstaculo');
            this.grupo.create(567, 505, 'obstaculo');
            this.grupo.create(137, 429, 'obstaculo');

        } else if(this.faseAtual === 5){
            this.grupo.create(671, 279, 'obstaculo');
            this.grupo.create(351, 169, 'obstaculo');
            this.grupo.create(567, 505, 'obstaculo');
            this.grupo.create(137, 429, 'obstaculo');

        } else if(this.faseAtual === 6){
            this.grupo.create(245, 42,  'obstaculo');
            this.grupo.create(483, 443, 'obstaculo');            
        } else if(this.faseAtual === 7){
            this.desafioFundo.setTexture('desafio-fundoTx2').setDepth(0.1);
            this.add.image(750, 283, 'desafio-gaiola').setDepth(0.1);
        }
    }

    faseFinal(){
        this.add.image(750, 210, 'filhoFala');

        this.time.delayedCall(1000, () => {
            this.buraco.setVisible(true);
        });
    
    }

    upload(){}
}