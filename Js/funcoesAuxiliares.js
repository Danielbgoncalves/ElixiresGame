export function chamaCena(objeto, cenaOrigem, cenaDestino){
    objeto.on('pointerdown',()=>{
        cenaOrigem.cameras.main.fadeOut(200, 0, 0, 0, (camera, progress)=> {
            if (progress > 0.9) {
                cenaOrigem.scene.start(cenaDestino, {inventario: cenaOrigem.inventario, gameState: cenaOrigem.gameState});
            }
        }, cenaOrigem);
        
    });
}

export function inicializaIventarios(cena) {
    for (let i = 0; i < 6; i++) {
        let sprite = cena.physics.add.image(840, 80 + (i * 75), 'vazio').setDepth(1);
        cena.spritesInventario[i] = sprite;
    }
}

export function updateIventario(cena) {
    for (let i = 0; i < 6; i++) {
        if (cena.inventario[i])
            cena.spritesInventario[i].setTexture(cena.inventario[i]);
        else 
            cena.spritesInventario[i].setTexture('vazio');
    }
}

export function setasLaterais(cena){
    cena.setaEsq = cena.add.image(100, 275, 'seta');
    cena.setaEsq.setInteractive();
    cena.setaEsq.setVisible(false);
    cena.setaDir = cena.add.image(710, 275, 'seta');
    cena.setaDir.setInteractive();
    cena.setaDir.setVisible(false);
    cena.setaDir.angle = 180;
}

export function verificaCliqueNoInventario(cena, mouseX, mouseY, menorX, maiorX){
    if(mouseX > menorX && mouseX < maiorX){
        if( mouseY > 48 && mouseY < 116)
            cena.itemClicado = cena.inventario[0];
        else if (mouseY > 48 + 76*1 && mouseY < 116 + 76*1)
            cena.itemClicado = cena.inventario[1];
        else if (mouseY > 48 + 76*2 && mouseY < 116 + 76*2)
            cena.itemClicado = cena.inventario[2];
        else if (mouseY > 48 + 76*3 && mouseY < 116 + 76*3)
            cena.itemClicado = cena.inventario[3];
        else if (mouseY > 48 + 76*4 && mouseY < 116 + 76*4)
            cena.itemClicado = cena.inventario[4];
        else if (mouseY > 48 + 76*5 && mouseY < 116 + 76*5)
            cena.itemClicado = cena.inventario[5];
        else cena.itemClicado = 0;
        
        destaca(cena);
    }

    
}

export function clickAnims(cena){
    cena.anims.create({
        key: 'clicar',
        frames: cena.anims.generateFrameNumbers('click-sprite', { start: 0, end: 4}),
        frameRate: 21,
        repeat: 0
    });   
    
    cena.input.on('pointerdown', function (pointer) {
       let clickAnimation = cena.add.sprite(pointer.x, pointer.y, 'seta');
       clickAnimation.setDepth(1);

        clickAnimation.play('clicar');

        clickAnimation.on('animationcomplete', function () {
                clickAnimation.destroy();
        }, cena);
    }, cena);
}

export function retiraDoInventario(cena, item){
    let index = cena.inventario.indexOf(item);
        if(index !== -1)
            cena.inventario.splice(index, 1);
        updateIventario(cena);
}

export function destaca(cena){
    if(cena.itemClicado === 0) return;
    
    let index = cena.inventario.indexOf(cena.itemClicado);
    if(index !== -1){
        let glow = cena.add.graphics({ fillStyle: { color: 0x5f694f} });
        glow.setDepth(1);
        glow.fillRect(810, 50 + (index * 76), 68, 68);
        glow.alpha = 0;

        cena.tweens.add({
            targets: glow,
            alpha: { from: 0, to: 0.5 },
            yoyo: true,
            duration: 500,
        });
    }
    
}