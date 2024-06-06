
import CenaCarregamento from './cenaCarregamento.js';
import CenaIntro from        './cenaIntro.js';

import CenaPorta from        './cenasPorta/cenaPorta.js';
import CenaGaiola from       './cenasPorta/cenaGaiola.js'
import CenaPlantaVerde from  './cenasPorta/cenaPlantaVerde.js'

import CenaEstante from      './cenasEstante/cenaEstante.js';
import CenaLivros from       './cenasEstante/cenaLivros.js';
import cenaFlor from         './cenasEstante/cenaFlor.js';
import CenaMesa1 from        './cenasEstante/cenaMesa1.js';
import cenaOlho from         './cenasEstante/cenaOlho.js';
import CenaCaixa1 from       './cenasEstante/cenaCaixa1.js';
import CenaRetrato from      './cenasEstante/cenaRetrato.js';
import CenaPortinhas from    './cenasEstante/cenaPortinhas.js';


import CenaEspelho from      './cenasEspelho/cenaEspelho.js';
import cenaGlobo from        './cenasEspelho/cenaGlobo.js';
import cenaDesafioFilho from './cenasEspelho/desafioFilho.js';
import CenaEspelhoMesmo from './cenasEspelho/cenaEspelhoMesmo.js';
import CenaMesa2 from        './cenasEspelho/cenaMesa2.js';
import CenaSobreMesa2 from   './cenasEspelho/cenaSobreMesa2.js';
import CenaVaso from         './cenasEspelho/cenaVaso.js';


import CenaRelogio from      './cenasRelogio/cenaRelogio.js';
import CenaPulpito from      './cenasRelogio/cenaPulpito.js';
import CenaVela from         './cenasRelogio/cenaVela.js';
import CenaMesa3 from        './cenasRelogio/cenaMesa3.js';
import CenaPonteiros from    './cenasRelogio/cenaPonteiros.js'


const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 550,
    parent: 'canvas',
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: [
        CenaCarregamento,
        CenaIntro,
        CenaPorta,
        CenaGaiola,
        CenaPlantaVerde,
        CenaEstante,
        CenaLivros,
        cenaFlor,
        CenaMesa1,
        cenaOlho,
        cenaDesafioFilho,
        CenaCaixa1,
        CenaRetrato,
        CenaPortinhas,
        CenaEspelho,
        cenaGlobo,
        CenaEspelhoMesmo,
        CenaMesa2,
        CenaSobreMesa2,
        CenaVaso,
        CenaRelogio,
        CenaPulpito,
        CenaVela,
        CenaMesa3,
        CenaPonteiros
    ]
}

const jogo = new Phaser.Game(config);