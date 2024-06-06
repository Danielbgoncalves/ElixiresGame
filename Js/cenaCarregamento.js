export default class CenaCarregamento extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaCarregamento'
        });
    }
    preload(){
        this.load.on('complete', () => {
            this.scene.start('CenaPorta');
        });

        //-------------------- CenaIntro ---------------------------------
        //this.load.image('intro-preto', 'Assets/cenaIntro/intro-preto.png');
        this.load.image('intro-porta', 'Assets/cenaIntro/intro-porta.png');
        this.load.image('intro-fala1', 'Assets/cenaIntro/intro-fala1.png');
        this.load.image('intro-fala2', 'Assets/cenaIntro/intro-fala2.png');
        this.load.image('intro-fala3', 'Assets/cenaIntro/intro-fala3.png');
        this.load.image('intro-fala4', 'Assets/cenaIntro/intro-fala4.png');
        this.load.image('intro-fala5', 'Assets/cenaIntro/intro-fala5.png');
        this.load.image('intro-fala6', 'Assets/cenaIntro/intro-fala6.png');
        this.load.image('intro-fala7', 'Assets/cenaIntro/intro-fala7.png');
        this.load.image('intro-fala8', 'Assets/cenaIntro/intro-fala8.png');
        

        //--------------------- CenaPorta ----------------------------------------
        this.load.image('cena1', 'Assets/cena1c.png');
        this.load.image('vazio', 'Assets/vazio.png');
        this.load.image('seta', 'Assets/seta.png');
        this.load.image('item', 'Assets/item.png');


        this.load.image('fotoPeq1','Assets/fotoPeq1.png');
        this.load.image('fotoPeq2','Assets/fotoPeq2.png');
        this.load.image('fotoPeq3','Assets/fotoPeq3.png');
        this.load.image('fotoPeq4','Assets/fotoPeq4.png');

        this.load.image('gaiola', 'Assets/cenaPorta/gaiola.png');
        this.load.image('plantaVerde', 'Assets/cenaPorta/plantaVerde.png' );
        this.load.spritesheet('click-sprite', 'Assets/cenaPorta/click-sprite.png', {frameWidth: 21, frameHeight: 21});
        

        // CenaGaiola
        this.load.image('cenaGaiola', 'Assets/cenaPorta/cenaGaiola.png');
        this.load.spritesheet('corvo-sprite', 'Assets/cenaPorta/corvo-sprite.png', {frameWidth: 300, frameHeight: 150});
        this.load.image('sprite-corvo', 'Assets/cenaPorta/sprite-corvo.png');
        this.load.image('ovo1', 'Assets/cenaPorta/ovo1.png')

        //cenaPlantaVerde
        this.load.image('cenaPlantaVerde', 'Assets/cenaPorta/cenaPlantaVerde.png')
        this.load.image('galho','Assets/cenaPorta/galho.png');
        this.load.image('galhoPeq','Assets/cenaPorta/galhoPeq.png');

        //--------------------CenaEstante-------------------------------------
        this.load.image('cena2', 'Assets/cena2c.png');
        this.load.image('portaRetrato', 'Assets/retratoClicavel.png');
        this.load.image('mesa1', 'Assets/cenaEstante/mesa1.png');
        this.load.image('caixa1', 'Assets/cenaEstante/caixa1.png');
        this.load.image('livros', 'Assets/cenaEstante/livros.png');
        this.load.image('portinhas','Assets/cenaEstante/portinhas.png');
        

        // CenaMesa1
        this.load.image('cenaMesa1', 'Assets/cenaEstante/cenaMesa1.png');
        this.load.image('cenaMesa1Tx2', 'Assets/cenaEstante/cenaMesa1Tx2.png');
        this.load.image('objetos1', 'Assets/cenaEstante/objetos1.png');
        this.load.image('flor', 'Assets/cenaEstante/flor.png');
        this.load.image('florPeq', 'Assets/cenaEstante/florPeq.png');
        this.load.image('vasoVazio', 'Assets/cenaEstante/vasoVazio.png');
        this.load.image('vasoComAgua', 'Assets/cenaEstante/vasoComAgua.png');
        this.load.image('vasilhaComAgua', 'Assets/cenaEstante/vasilhaComAgua.png');



        // CenaOlho
        this.load.image('cenaOlho', 'Assets/cenaEstante/cenaOlho.png');
        this.load.image('olho', 'Assets/cenaEstante/olho.png');
        this.load.image('olhoPeq', 'Assets/cenaEstante/olhoPeq.png');
        this.load.image('papelGlobo', 'Assets/cenaEstante/papelGlobo.png');


        // CenaPortaRetrato
        this.load.image('fotoGrande1','Assets/fotoGrande1.png');
        this.load.image('fotoGrande2','Assets/fotoGrande2.png');
        this.load.image('fotoGrande3','Assets/fotoGrande3.png');
        this.load.image('fotoGrande4','Assets/fotoGrande4.png');
        this.load.image('fundoPortaRetrato', 'Assets/fundoPortaRetrato.png');
        this.load.image('chaveAmarela', 'Assets/chaveAmarela.png');

        // cenaCaixa1
        this.load.image('cenaCaixa1-fechada', 'Assets/cenaEstante/cenaCaixa1-fechada.png');
        this.load.image('cenaCaixa1-aberta', 'Assets/cenaEstante/cenaCaixa1-aberta.png');
        this.load.image('caixa-simb1', 'Assets/cenaEstante/caixa-simb1.png');
        this.load.image('caixa-simb2', 'Assets/cenaEstante/caixa-simb2.png');
        this.load.image('caixa-simb3', 'Assets/cenaEstante/caixa-simb3.png');
        this.load.image('caixa-simb4', 'Assets/cenaEstante/caixa-simb4.png');

        //cenaLivros
        this.load.image('cenaLivros', 'Assets/cenaEstante/cenaLivros.png');
        this.load.image('livro1','Assets/cenaEstante/livro1.png' );
        this.load.image('livro2','Assets/cenaEstante/livro2.png' );
        this.load.image('livro3','Assets/cenaEstante/livro3.png' );
        this.load.image('livro4','Assets/cenaEstante/livro4.png' );
        this.load.image('livro5','Assets/cenaEstante/livro5.png' );
        this.load.image('oUltElixir-dorso', 'Assets/cenaEstante/oUltElixir-dorso.png');
        this.load.image('oUltElixir-dorsoPeq', 'Assets/cenaEstante/oUltElixir-dorsoPeq.png');

        //CenaFlor
        this.load.image('cenaFlor','Assets/cenaEstante/cenaFlor.png' );


        // CenaPortinhas   
        this.load.image('cenaPortinhas','Assets/cenaEstante/cenaPortinhas.png');
        this.load.image('cenaPortinhasTx2','Assets/cenaEstante/cenaPortinhasTx2.png');
        this.load.image('cenaPortinhasTx3','Assets/cenaEstante/cenaPortinhasTx3.png');
        this.load.image('simb0', 'Assets/cenaEstante/simb0.png');
        this.load.image('simb1', 'Assets/cenaEstante/simb1.png');
        this.load.image('simb2', 'Assets/cenaEstante/simb2.png');
        this.load.image('simb3', 'Assets/cenaEstante/simb3.png');
        this.load.image('simb4', 'Assets/cenaEstante/simb4.png');
        this.load.image('simb5', 'Assets/cenaEstante/simb5.png');
        this.load.image('tesoura', 'Assets/cenaEstante/tesoura.png');
        this.load.image('faca', 'Assets/cenaEstante/faca.png');
        this.load.image('facaPeq', 'Assets/cenaEstante/facaPeq.png');
        this.load.image('elixirDaMente', 'Assets/cenaEstante/elixirDaMente.png');
        this.load.image('elixirDaMentePeq', 'Assets/cenaEstante/elixirDaMentePeq.png');


        // ----------------------CenaEspelho--------------------
        this.load.image('cena3', 'Assets/cena3c.png');
        this.load.image('cena3Tx2', 'Assets/cena3c-2.png');
        this.load.image('mesa2', 'Assets/cenaEspelho/mesa2.png');
        this.load.image('vaso', 'Assets/cenaEspelho/vaso.png');
        this.load.image('globo', 'Assets/cenaEspelho/globo.png');


        // CenaGlobo
        this.load.image('cenaGlobo', 'Assets/cenaEspelho/cenaGlobo.png');
        this.load.image('chaveTriangular', 'Assets/cenaEspelho/chaveTriangular.png');
        this.load.image('chaveTriangularPeq', 'Assets/cenaEspelho/chaveTriangularPeq.png');


        // DesafioFilho
        this.load.image('desafio-fundo', 'Assets/cenaEspelho/desafioFilho/desafio-fundo.png');
        this.load.image('obstaculo', 'Assets/cenaEspelho/desafioFilho/obstaculo.png');
        this.load.image('eldricPalito', 'Assets/cenaEspelho/desafioFilho/eldricPalito.png');
        this.load.image('desafio-seta', 'Assets/cenaEspelho/desafioFilho/desafio-seta.png');
        this.load.image('desafio-filho', 'Assets/cenaEspelho/desafioFilho/desafio-filho.png');
        this.load.image('desafio-fundoTx2', 'Assets/cenaEspelho/desafioFilho/desafio-fundoTx2.png');
        this.load.image('desafio-gaiola', 'Assets/cenaEspelho/desafioFilho/desafio-gaiola.png');
        this.load.image('filhoFala', 'Assets/cenaEspelho/desafioFilho/filhoFala.png');
        this.load.image('desafio-buraco', 'Assets/cenaEspelho/desafioFilho/desafio-buraco.png');
       
        // cenaEspelhoMesmo
        this.load.image('eldric', 'Assets/cenaEspelho/sprite-eldric.png');
        this.load.image('eldric-linha', 'Assets/cenaEspelho/eldric-linha.png');
        this.load.image('eldric-linhaG', 'Assets/cenaEspelho/eldric-linhaG.png');
        this.load.image('eldric-seguraCopo', 'Assets/cenaEspelho/eldric-seguraCopo.png');
        this.load.image('eldric-seguraCha', 'Assets/cenaEspelho/eldric-seguraCha.png');
        this.load.image('eldric-elixirDaMente', 'Assets/cenaEspelho/eldric-elixirDaMente.png');
        this.load.image('eldric-cabecaElixirDaMente', 'Assets/cenaEspelho/eldric-cabecaElixirDaMente.png');
        this.load.image('eldric-faca', 'Assets/cenaEspelho/eldric-faca.png');
        this.load.image('eldric-cerebro', 'Assets/cenaEspelho/eldric-cerebro.png');
        this.load.image('cenaEspelhoMesmo', 'Assets/cenaEspelho/cenaEspelhoMesmo.png');
        this.load.image('espelho', 'Assets/cenaEspelho/espelho.png');
        this.load.image('escondeEldric', 'Assets/cenaEspelho/escondeEldric.png');
        this.load.image('fala1', 'Assets/cenaEspelho/fala1.png');
        this.load.image('fala2', 'Assets/cenaEspelho/fala2.png');
        this.load.image('semente', 'Assets/cenaEspelho/semente.png');
        this.load.image('sementeComLinha', 'Assets/cenaEspelho/sementeComLinha.png');
        this.load.image('sementeEnterrada', 'Assets/cenaEspelho/sementeEnterrada.png');


        // CenaSobreMesa2
        this.load.image('cenaSobreMesa2', 'Assets/cenaEspelho/cenaSobreMesa2.png');
        this.load.image('copo', 'Assets/cenaEspelho/copo.png');
        this.load.image('copoPeq', 'Assets/cenaEspelho/copoPeq.png');
        this.load.image('diario-0', 'Assets/cenaEspelho/diario-0.png');
        this.load.image('diario-1', 'Assets/cenaEspelho/diario-1.png');
        this.load.image('diario-2', 'Assets/cenaEspelho/diario-2.png');
        this.load.image('diario-3', 'Assets/cenaEspelho/diario-3.png');
        this.load.image('diario-4', 'Assets/cenaEspelho/diario-4.png');

        // CenaMesa2
        this.load.image('cenaMesa2', 'Assets/cenaEspelho/cenaMesa2.png');
        this.load.image('gavetaAFechada-cena3', 'Assets/cenaEspelho/gavetaAFechada-cena3.png');
        this.load.image('gavetaCFechada-cena3', 'Assets/cenaEspelho/gavetaCFechada-cena3.png');
        this.load.image('gavetaVFechada-cena3', 'Assets/cenaEspelho/gavetaVFechada-cena3.png');
        this.load.image('gavetaAAberta-cena3', 'Assets/cenaEspelho/gavetaAAberta-cena3.png');
        this.load.image('gavetaCAberta-cena3', 'Assets/cenaEspelho/gavetaCAberta-cena3.png');
        this.load.image('gavetaVAberta-cena3', 'Assets/cenaEspelho/gavetaVAberta-cena3.png');
        this.load.image('carta1Fechada', 'Assets/cenaEspelho/carta1Fechada.png');
        this.load.image('carta1FechadaPeq', 'Assets/cenaEspelho/carta1FechadaPeq.png');
        this.load.image('cinzas', 'Assets/cenaEspelho/cinzas.png');

        // CenaVaso
        this.load.image('cenaVaso', 'Assets/cenaEspelho/cenaVaso.png');
        this.load.image('chaveMesa1', 'Assets/cenaEspelho/chaveMesa1.png');



        // -------------------- CenaRelogio---------------------
        this.load.image('cena4', 'Assets/cena4c.png');
        this.load.image('cena4', 'Assets/cena4c.png');
        this.load.image('pulpito', 'Assets/cenaRelogio/pulpito.png');
        this.load.image('cenaPulpito', 'Assets/cenaRelogio/cenaPulpito.png');
        this.load.image('mesa3', 'Assets/cenaRelogio/mesa3.png' );
        this.load.image('relogio', 'Assets/cenaRelogio/relogio.png')

        // CenaPulpito
        this.load.image('oUltElixir-0', 'Assets/cenaRelogio/oUltElixir-0.png');
        this.load.image('oUltElixir-1', 'Assets/cenaRelogio/oUltElixir-1.png' );
        this.load.image('oUltElixir-2', 'Assets/cenaRelogio/oUltElixir-2.png' );
        this.load.image('oUltElixir-3', 'Assets/cenaRelogio/oUltElixir-3.png' );
        this.load.image('oUltElixir-4', 'Assets/cenaRelogio/oUltElixir-4.png' );
        this.load.image('comida-corvo', 'Assets/cenaRelogio/comida-corvo.png' );
        this.load.image('comida-corvoPeq', 'Assets/cenaRelogio/comida-corvoPeq.png' );
        this.load.image('carta1Aberta', 'Assets/cenaRelogio/carta1Aberta.png' );
        this.load.image('borradoLivros', 'Assets/cenaRelogio/borradoLivros.png' );
        this.load.image('borradoPonteiros', 'Assets/cenaRelogio/borradoPonteiros.png' );

        // CenaVela
        this.load.image('cenaVela', 'Assets/cenaRelogio/cenaVela.png' );
        this.load.image('vela', 'Assets/cenaRelogio/vela.png' );
        this.load.spritesheet('sprite-vela', 'Assets/cenaRelogio/sprite-vela.png', {frameWidth:13, frameHeight: 33});
        this.load.image('chaveCinza', 'Assets/cenaRelogio/chaveCinza.png' );
        this.load.image('chaveCinzaPeq', 'Assets/cenaRelogio/chaveCinzaPeq.png' );
        this.load.spritesheet('explosao', 'Assets/cenaRelogio/explosaoG1.png', {frameWidth:210, frameHeight: 180});
        this.load.spritesheet('fumaca-senha', 'Assets/cenaRelogio/fumaca-senha.png', {frameWidth:220, frameHeight: 35});


        //CenaMesa3
        this.load.image('cenaMesa3', 'Assets/cenaRelogio/cenaMesa3.png' );
        this.load.image('gavetaAberta-cena4', 'Assets/cenaRelogio/gavetaAberta-cena4.png' );
        this.load.image('gavetaFechada-cena4', 'Assets/cenaRelogio/gavetaFechada-cena4.png' );

        //CenaPonteiros
        this.load.image('cenaPonteiros', 'Assets/cenaRelogio/cenaPonteiros.png' );
        this.load.image('ponteiroP', 'Assets/cenaRelogio/ponteiroP.png' );
        this.load.image('ponteiroG', 'Assets/cenaRelogio/ponteiroG.png' );
        this.load.image('botaoRelogio', 'Assets/cenaRelogio/botaoRelogio.png' );
        this.load.image('chaveQuadrada', 'Assets/cenaRelogio/chaveQuadrada.png' );
        this.load.image('portaSecretaRlg', 'Assets/cenaRelogio/portaSecretaRlg.png' );



        // ------------------------- Musica -----------------------
        this.load.audio('mainTheme', 'Assets/mainTheme.mp3');
        this.load.audio('crowIntense', 'Assets/cenaEspelho/desafioFilho/crowIntense.mp3');


    }
}