import { updateIventario} from "./funcoesAuxiliares.js";

export default class itens extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, posicaoX, posicaoY, nome, nomeColetavel){
        super(scene, posicaoX, posicaoY, nome);
        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.nome = nome;
        this.id = nome;
        this.nomeColetavel = nomeColetavel;
        this.setInteractive();

        this.on('pointerdown', ()=>{
            this.coletarItem();
        });      
    
    }

    coletarItem(){
        //if(this.scene.inventario.indexOf(this.nomeColetavel) === -1){
            this.scene.inventario.push(this.nomeColetavel);
            this.setVisible(false);
            updateIventario(this.scene);
            this.disableBody(true,true);
            this.scene.gameState.itensColetados[this.nome] = true;
       //}
        
    }


    
}