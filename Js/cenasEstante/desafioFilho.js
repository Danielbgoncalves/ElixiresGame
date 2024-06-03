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
        this.add.image(450, 275, 'desafio-fundo');

        this.faseAtual = 0;

        this.eldricPal = this.physics.add.image(55, 350, 'eldricPalito');
        this.filho = this.physics.add.staticGroup();
        this.filho.create(750, 283, 'desafio-filho')


        this.grupo = this.physics.add.staticGroup();        
        
        this.physics.add.collider(this.eldricPal, this.grupo, this.reinicia, null, this);
        this.physics.add.collider(this.eldricPal, this.filho, this.novaFase, null, this);


        this.setaDir = this.add.image(850, 450, 'desafio-seta').setInteractive();
        this.setaCima = this.add.image(800, 400, 'desafio-seta').setInteractive();;
        this.setaBaixo = this.add.image(800, 500, 'desafio-seta').setInteractive();;

        this.setaDir.on('pointerdown', () => {this.movePlayer(50, 0)});
        this.setaCima.on('pointerdown', () => {this.movePlayer(0, -50)});
        this.setaBaixo.on('pointerdown', () => {this.movePlayer(0, 50)});

        this.setaCima.angle = 270;
        this.setaBaixo.angle = 90;

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

    /*verificaOndeEsta(){
        if(this.eldricPal.x > 720 && this.eldricPal.y > 250 && this.eldricPal.x < 775 && this.eldricPal.y < 300){
            this.novaFase();
        } else {
            console.log('deu mau irmao');
        }

    }*/

    reinicia(){
        this.eldricPal.setPosition(55, 350);
    }

    novaFase(){
        console.log('a fase atual é ', this.faseAtual)
        this.faseAtual ++;
        this.eldricPal.x = 55;
        this.eldricPal.y = 350
        //this.filho.setPosition(750, 283);

        if(this.faseAtual === 1){
            this.grupo.create(450, 300, 'obstaculo');
            this.grupo.create(200, 230, 'obstaculo');
            this.grupo.create(400, 410, 'obstaculo');
            this.grupo.create(310, 120, 'obstaculo');
            console.log('fase1');

        } else if(this.faseAtual === 2){
            this.grupo.create(20, 230, 'obstaculo');
            this.grupo.create(600, 110, 'obstaculo');
            this.grupo.create(352, 300, 'obstaculo');
            console.log('fase2');

        } else if(this.faseAtual === 3){
            this.grupo.create(450, 200, 'obstaculo');
            this.grupo.create(500, 5000, 'obstaculo');
            this.grupo.create(480, 30, 'obstaculo');
            console.log('fase3');

        } else if(this.faseAtual === 4){
            this.grupo.create(671, 279, 'obstaculo');
            this.grupo.create(567, 505, 'obstaculo');
            this.grupo.create(137, 429, 'obstaculo');
            console.log('fase3');

        } else if(this.faseAtual === 5){
            this.grupo.create(671, 279, 'obstaculo');
            this.grupo.create(351, 169, 'obstaculo');
            this.grupo.create(567, 505, 'obstaculo');
            this.grupo.create(137, 429, 'obstaculo');
            console.log('fase3');
        }

        console.log('nova fase');

    }

    upload(){}
}