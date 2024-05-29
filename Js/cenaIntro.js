export default class CenaIntro extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaIntro'
        });
        this.vecPensamentos = [];
    }

    async create(){

        for(let i = 1; i < 9; i++ ){
            this.pensamento = this.add.image(450, 275, 'intro-fala' + i);
            this.pensamento.setVisible(false);
            this.vecPensamentos.push(this.pensamento);
        }

        this.background = this.add.image(450, 275, 'intro-porta');
        this.background.setVisible(false);

        /*this.fala1 = this.physics.add.image(450, 275, 'intro-fala1');
        this.fala2 = this.add.image(450, 275, 'intro-fala2');
        this.fala1.setVisible(false);
        this.fala2.setVisible(false);*/


        await this.delayCall(1000); // Aparrece a porta pela primeira vez
        this.background.setVisible(true);        


        await this.delayCall(500); // Porta some e ele pensa 
        this.background.setVisible(false);
        this.vecPensamentos[0].setVisible(true);


        await this.esperaClicar(); // pensamento 2
        this.vecPensamentos[1].setVisible(true);

        await this.esperaClicar(); // pensamento 3
        this.vecPensamentos[2].setVisible(true);

        await this.esperaClicar(); // pensamento 4
        this.vecPensamentos[3].setVisible(true);


        await this.esperaClicar(); // Aparece porta
        this.background.setVisible(true);
        for(let i = 0; i < 4; i++)
            this.vecPensamentos[i].setVisible(false);

        await this.delayCall(500)
        this.background.setVisible(false);
        this.vecPensamentos[4].setVisible(true);


        await this.esperaClicar(); // pensamento 6
        this.vecPensamentos[5].setVisible(true);

        await this.esperaClicar(); // pensamento 7
        this.vecPensamentos[6].setVisible(true);

        await this.esperaClicar(); // pensamento 8
        this.vecPensamentos[7].setVisible(true);

        await this.esperaClicar(); // inicia Jogo
        this.scene.start('CenaPorta');





        /*console.log('background:  vai ser preto');         

            this.cameras.main.fadeOut(200, 0, 0, 0, (progress) =>{
                if(progress > 0.9){
                    console.log('background: passou 90% do faeOut');         
                    this.background.setVisible(false);
                    this.fala1.setVisible(true).setDepth(1);
                }
            });
            console.log('background: preto');         
            this.cameras.main.fadeIn(200, 0, 0, 0);*/
            

        
        /*await this.delayCall(2000);
            this.cameras.main.fadeOut(200, 0, 0, 0);
            this.cameras.main.fadeIn(200, 0, 0, 0);
            this.background.setTexture('intro-porta');
            this.fala1.setVisible(false);*/

      
    }

    delayCall(time){
        return new Promise( resolve => {
            this.time.delayedCall(time, resolve, [], this);
        });
    }

    esperaClicar(){
        return new Promise (resolve =>{
            this.input.on('pointerdown', () =>{
                resolve();
            });
        });
    }
}