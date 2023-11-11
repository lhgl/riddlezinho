
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const footerpasscode = fs.readFileSync('views/footerpasscode.ejs', 'utf8');
const footerback = fs.readFileSync('views/footerback.ejs', 'utf8');
const port = process.env.PORT || 5000;

// Define EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Render the appropriate page for each route
app.get('/jogar', (req, res) => {res.render('jogar')});

//Render TIPS
app.get('/01', (req, res) => {res.render('01', { footerback: footerback, includefooterback : true });});
app.get('/03', (req, res) => {res.render('03', { footerback: footerback, includefooterback : true });});
app.get('/05', (req, res) => {res.render('05', { footerback: footerback, includefooterback : true });});
app.get('/08', (req, res) => {res.render('08', { footerback: footerback, includefooterback : true });});
app.get('/8', (req, res) => {res.render('8', { footerback: footerback, includefooterback : true });});
app.get('/18', (req, res) => {res.render('18', { footerback: footerback, includefooterback : true });});
app.get('/19denovembro', (req, res) => {res.render('19denovembro', { footerback: footerback, includefooterback : true });});
app.get('/27', (req, res) => {res.render('27', { footerback: footerback, includefooterback : true });});
app.get('/100', (req, res) => {res.render('100', { footerback: footerback, includefooterback : true });});
app.get('/166', (req, res) => {res.render('166', { footerback: footerback, includefooterback : true });});
app.get('/01100001', (req, res) => {res.render('01100001', { footerback: footerback, includefooterback : true });});
app.get('/5151402', (req, res) => {res.render('5151402', { footerback: footerback, includefooterback : true });});
app.get('/a', (req, res) => {res.render('a', { footerback: footerback, includefooterback : true });});
app.get('/absinto', (req, res) => {res.render('absinto', { footerback: footerback, includefooterback : true });});
app.get('/acrilex', (req, res) => {res.render('acrilex', { footerback: footerback, includefooterback : true });});
app.get('/adaoeeva', (req, res) => {res.render('adaoeeva', { footerback: footerback, includefooterback : true });});
app.get('/agitada', (req, res) => {res.render('agitada', { footerback: footerback, includefooterback : true });});
app.get('/ajitada', (req, res) => {res.render('ajitada', { footerback: footerback, includefooterback : true });});
app.get('/alberti', (req, res) => {res.render('alberti', { footerback: footerback, includefooterback : true });});
app.get('/albrechtdurer', (req, res) => {res.render('albrechtdurer', { footerback: footerback, includefooterback : true });});
app.get('/alfa', (req, res) => {res.render('alfa', { footerback: footerback, includefooterback : true });});
app.get('/amazonas', (req, res) => {res.render('amazonas', { footerback: footerback, includefooterback : true });});
app.get('/amortedemarat', (req, res) => {res.render('amortedemarat', { footerback: footerback, includefooterback : true });});
app.get('/anagrama', (req, res) => {res.render('anagrama', { footerback: footerback, includefooterback : true });});
app.get('/andorra', (req, res) => {res.render('andorra', { footerback: footerback, includefooterback : true });});
app.get('/angelica', (req, res) => {res.render('angelica', { footerback: footerback, includefooterback : true });});
app.get('/antares', (req, res) => {res.render('antares', { footerback: footerback, includefooterback : true });});
app.get('/antiares', (req, res) => {res.render('antiares', { footerback: footerback, includefooterback : true });});
app.get('/antonio', (req, res) => {res.render('antonio', { footerback: footerback, includefooterback : true });});
app.get('/ares', (req, res) => {res.render('ares', { footerback: footerback, includefooterback : true });});
app.get('/artemis', (req, res) => {res.render('artemis', { footerback: footerback, includefooterback : true });});
app.get('/assischateaubriand', (req, res) => {res.render('assischateaubriand', { footerback: footerback, includefooterback : true });});
app.get('/asterix', (req, res) => {res.render('asterix', { footerback: footerback, includefooterback : true });});
app.get('/atencao', (req, res) => {res.render('atencao', { footerback: footerback, includefooterback : true });});
app.get('/avestruz', (req, res) => {res.render('avestruz', { footerback: footerback, includefooterback : true });});
app.get('/baudelaire', (req, res) => {res.render('baudelaire', { footerback: footerback, includefooterback : true });});
app.get('/bispo', (req, res) => {res.render('bispo', { footerback: footerback, includefooterback : true });});
app.get('/boxer', (req, res) => {res.render('boxer', { footerback: footerback, includefooterback : true });});
app.get('/brutus', (req, res) => {res.render('brutus', { footerback: footerback, includefooterback : true });});
app.get('/burj', (req, res) => {res.render('burj', { footerback: footerback, includefooterback : true });});
app.get('/carokahn', (req, res) => {res.render('carokahn', { footerback: footerback, includefooterback : true });});
app.get('/caro-kahn', (req, res) => {res.render('caro-kahn', { footerback: footerback, includefooterback : true });});
app.get('/caro-kann', (req, res) => {res.render('caro-kann', { footerback: footerback, includefooterback : true });});
app.get('/cascavel', (req, res) => {res.render('cascavel', { footerback: footerback, includefooterback : true });});
app.get('/cateto', (req, res) => {res.render('cateto', { footerback: footerback, includefooterback : true });});
app.get('/celula', (req, res) => {res.render('celula', { footerback: footerback, includefooterback : true });});
app.get('/cep', (req, res) => {res.render('cep', { footerback: footerback, includefooterback : true });});
app.get('/charlesbaudelaire', (req, res) => {res.render('charlesbaudelaire', { footerback: footerback, includefooterback : true });});
app.get('/cliquemagico', (req, res) => {res.render('cliquemagico', { footerback: footerback, includefooterback : true });});
app.get('/codigobinario', (req, res) => {res.render('codigobinario', { footerback: footerback, includefooterback : true });});
app.get('/coparoca', (req, res) => {res.render('coparoca', { footerback: footerback, includefooterback : true });});
app.get('/cor', (req, res) => {res.render('cor', { footerback: footerback, includefooterback : true });});
app.get('/cores', (req, res) => {res.render('cores', { footerback: footerback, includefooterback : true });});
app.get('/cristo', (req, res) => {res.render('cristo', { footerback: footerback, includefooterback : true });});
app.get('/cristoredentor', (req, res) => {res.render('cristoredentor', { footerback: footerback, includefooterback : true });});
app.get('/curitiba', (req, res) => {res.render('curitiba', { footerback: footerback, includefooterback : true });});
app.get('/daltonismo', (req, res) => {res.render('daltonismo', { footerback: footerback, includefooterback : true });});
app.get('/dante', (req, res) => {res.render('dante', { footerback: footerback, includefooterback : true });});
app.get('/davi', (req, res) => {res.render('davi', { footerback: footerback, includefooterback : true });});
app.get('/david', (req, res) => {res.render('david', { footerback: footerback, includefooterback : true });});
app.get('/deepblue', (req, res) => {res.render('deepblue', { footerback: footerback, includefooterback : true });});
app.get('/desloc3', (req, res) => {res.render('desloc3', { footerback: footerback, includefooterback : true });});
app.get('/diana', (req, res) => {res.render('diana', { footerback: footerback, includefooterback : true });});
app.get('/dinossauro', (req, res) => {res.render('dinossauro', { footerback: footerback, includefooterback : true });});
app.get('/distante', (req, res) => {res.render('distante', { footerback: footerback, includefooterback : true });});
app.get('/divinacomedia', (req, res) => {res.render('divinacomedia', { footerback: footerback, includefooterback : true });});
app.get('/dna', (req, res) => {res.render('dna', { footerback: footerback, includefooterback : true });});
app.get('/drummond', (req, res) => {res.render('drummond', { footerback: footerback, includefooterback : true });});
app.get('/esponja', (req, res) => {res.render('esponja', { footerback: footerback, includefooterback : true });});
app.get('/esponjadomar', (req, res) => {res.render('esponjadomar', { footerback: footerback, includefooterback : true });});
app.get('/everest', (req, res) => {res.render('everest', { footerback: footerback, includefooterback : true });});
app.get('/fatigadas', (req, res) => {res.render('fatigadas', { footerback: footerback, includefooterback : true });});
app.get('/figuradelinguagem', (req, res) => {res.render('figuradelinguagem', { footerback: footerback, includefooterback : true });});
app.get('/floresdomal', (req, res) => {res.render('floresdomal', { footerback: footerback, includefooterback : true });});
app.get('/gatopreto', (req, res) => {res.render('gatopreto', { footerback: footerback, includefooterback : true });});
app.get('/golmil', (req, res) => {res.render('golmil', { footerback: footerback, includefooterback : true });});
app.get('/googleearth', (req, res) => {res.render('googleearth', { footerback: footerback, includefooterback : true });});
app.get('/guerradosboxers', (req, res) => {res.render('guerradosboxers', { footerback: footerback, includefooterback : true });});
app.get('/hanoi', (req, res) => {res.render('hanoi', { footerback: footerback, includefooterback : true });});
app.get('/hermetopascoal', (req, res) => {res.render('hermetopascoal', { footerback: footerback, includefooterback : true });});
app.get('/hieroglifo', (req, res) => {res.render('hieroglifo', { footerback: footerback, includefooterback : true });});
app.get('/hipocondriaco', (req, res) => {res.render('hipocondriaco', { footerback: footerback, includefooterback : true });});
app.get('/hipocondriacos', (req, res) => {res.render('hipocondriacos', { footerback: footerback, includefooterback : true });});
app.get('/holandes', (req, res) => {res.render('holandes', { footerback: footerback, includefooterback : true });});
app.get('/huno', (req, res) => {res.render('huno', { footerback: footerback, includefooterback : true });});
app.get('/ilha', (req, res) => {res.render('ilha', { footerback: footerback, includefooterback : true });});
app.get('/ilhadepascoa', (req, res) => {res.render('ilhadepascoa', { footerback: footerback, includefooterback : true });});
app.get('/ilhas', (req, res) => {res.render('ilhas', { footerback: footerback, includefooterback : true });});
app.get('/inferno', (req, res) => {res.render('inferno', { footerback: footerback, includefooterback : true });});
app.get('/infernodedante', (req, res) => {res.render('infernodedante', { footerback: footerback, includefooterback : true });});
app.get('/iracema', (req, res) => {res.render('iracema', { footerback: footerback, includefooterback : true });});
app.get('/jacqueslouisdavid', (req, res) => {res.render('jacqueslouisdavid', { footerback: footerback, includefooterback : true });});
app.get('/jesuscristo', (req, res) => {res.render('jesuscristo', { footerback: footerback, includefooterback : true });});
app.get('/kasparov', (req, res) => {res.render('kasparov', { footerback: footerback, includefooterback : true });});
app.get('/lagoaazul', (req, res) => {res.render('lagoaazul', { footerback: footerback, includefooterback : true });});
app.get('/lagoadacanoa', (req, res) => {res.render('lagoadacanoa', { footerback: footerback, includefooterback : true });});
app.get('/laio', (req, res) => {res.render('laio', { footerback: footerback, includefooterback : true });});
app.get('/laranjamecanica', (req, res) => {res.render('laranjamecanica', { footerback: footerback, includefooterback : true });});
app.get('/lasvegas', (req, res) => {res.render('lasvegas', { footerback: footerback, includefooterback : true });});
app.get('/leonidasdasilva', (req, res) => {res.render('leonidasdasilva', { footerback: footerback, includefooterback : true });});
app.get('/levantedosboxers', (req, res) => {res.render('levantedosboxers', { footerback: footerback, includefooterback : true });});
app.get('/lourosdecesar', (req, res) => {res.render('lourosdecesar', { footerback: footerback, includefooterback : true });});
app.get('/luadeesmeralda', (req, res) => {res.render('luadeesmeralda', { footerback: footerback, includefooterback : true });});
app.get('/luz', (req, res) => {res.render('luz', { footerback: footerback, includefooterback : true });});
app.get('/maisumapista', (req, res) => {res.render('maisumapista', { footerback: footerback, includefooterback : true });});
app.get('/marat', (req, res) => {res.render('marat', { footerback: footerback, includefooterback : true });});
app.get('/maria', (req, res) => {res.render('maria', { footerback: footerback, includefooterback : true });});
app.get('/merces', (req, res) => {res.render('merces', { footerback: footerback, includefooterback : true });});
app.get('/michelangelo', (req, res) => {res.render('michelangelo', { footerback: footerback, includefooterback : true });});
app.get('/narrado', (req, res) => {res.render('narrado', { footerback: footerback, includefooterback : true });});
app.get('/nietzsche', (req, res) => {res.render('nietzsche', { footerback: footerback, includefooterback : true });});
app.get('/nintendo', (req, res) => {res.render('nintendo', { footerback: footerback, includefooterback : true });});
app.get('/nintendowii', (req, res) => {res.render('nintendowii', { footerback: footerback, includefooterback : true });});
app.get('/nivel2', (req, res) => {res.render('nivel2', { footerback: footerback, includefooterback : true });});
app.get('/nivel3', (req, res) => {res.render('nivel3', { footerback: footerback, includefooterback : true });});
app.get('/nomeiodocaminho', (req, res) => {res.render('nomeiodocaminho', { footerback: footerback, includefooterback : true });});
app.get('/obelisco', (req, res) => {res.render('obelisco', { footerback: footerback, includefooterback : true });});
app.get('/obelix', (req, res) => {res.render('obelix', { footerback: footerback, includefooterback : true });});
app.get('/onomatopeia', (req, res) => {res.render('onomatopeia', { footerback: footerback, includefooterback : true });});
app.get('/operacaoluaverde', (req, res) => {res.render('operacaoluaverde', { footerback: footerback, includefooterback : true });});
app.get('/orelhacortada', (req, res) => {res.render('orelhacortada', { footerback: footerback, includefooterback : true });});
app.get('/osincriveis', (req, res) => {res.render('osincriveis', { footerback: footerback, includefooterback : true });});
app.get('/oslourosdecesar', (req, res) => {res.render('oslourosdecesar', { footerback: footerback, includefooterback : true });});
app.get('/ovo', (req, res) => {res.render('ovo', { footerback: footerback, includefooterback : true });});
app.get('/palindromo', (req, res) => {res.render('palindromo', { footerback: footerback, includefooterback : true });});
app.get('/pecadocapital', (req, res) => {res.render('pecadocapital', { footerback: footerback, includefooterback : true });});
app.get('/pedranocaminho', (req, res) => {res.render('pedranocaminho', { footerback: footerback, includefooterback : true });});
app.get('/pele', (req, res) => {res.render('pele', { footerback: footerback, includefooterback : true });});
app.get('/pistafalsa', (req, res) => {res.render('pistafalsa', { footerback: footerback, includefooterback : true });});
app.get('/pollaiolo', (req, res) => {res.render('pollaiolo', { footerback: footerback, includefooterback : true });});
app.get('/quadradomagico', (req, res) => {res.render('quadradomagico', { footerback: footerback, includefooterback : true });});
app.get('/ratatouille', (req, res) => {res.render('ratatouille', { footerback: footerback, includefooterback : true });});
app.get('/riobranco', (req, res) => {res.render('riobranco', { footerback: footerback, includefooterback : true });});
app.get('/rionegro', (req, res) => {res.render('rionegro', { footerback: footerback, includefooterback : true });});
app.get('/riovermelho', (req, res) => {res.render('riovermelho', { footerback: footerback, includefooterback : true });});
app.get('/robertodinamite', (req, res) => {res.render('robertodinamite', { footerback: footerback, includefooterback : true });});
app.get('/robertomarinho', (req, res) => {res.render('robertomarinho', { footerback: footerback, includefooterback : true });});
app.get('/roseta', (req, res) => {res.render('roseta', { footerback: footerback, includefooterback : true });});
app.get('/salmo34', (req, res) => {res.render('salmo34', { footerback: footerback, includefooterback : true });});
app.get('/santalucia', (req, res) => {res.render('santalucia', { footerback: footerback, includefooterback : true });});
app.get('/santaluzia', (req, res) => {res.render('santaluzia', { footerback: footerback, includefooterback : true });});
app.get('/sentidocontrario', (req, res) => {res.render('sentidocontrario', { footerback: footerback, includefooterback : true });});
app.get('/sherlockholmes', (req, res) => {res.render('sherlockholmes', { footerback: footerback, includefooterback : true });});
app.get('/shiva', (req, res) => {res.render('shiva', { footerback: footerback, includefooterback : true });});
app.get('/sistemabinario', (req, res) => {res.render('sistemabinario', { footerback: footerback, includefooterback : true });});
app.get('/sistemasolar', (req, res) => {res.render('sistemasolar', { footerback: footerback, includefooterback : true });});
app.get('/soulwax', (req, res) => {res.render('soulwax', { footerback: footerback, includefooterback : true });});
app.get('/spvnm', (req, res) => {res.render('spvnm', { footerback: footerback, includefooterback : true });});
app.get('/stephenhawking', (req, res) => {res.render('stephenhawking', { footerback: footerback, includefooterback : true });});
app.get('/taipe', (req, res) => {res.render('taipe', { footerback: footerback, includefooterback : true });});
app.get('/taipei', (req, res) => {res.render('taipei', { footerback: footerback, includefooterback : true });});
app.get('/taipei101', (req, res) => {res.render('taipei101', { footerback: footerback, includefooterback : true });});
app.get('/tangerina', (req, res) => {res.render('tangerina', { footerback: footerback, includefooterback : true });});
app.get('/tanjerina', (req, res) => {res.render('tanjerina', { footerback: footerback, includefooterback : true });});
app.get('/tanjerinaajitada', (req, res) => {res.render('tanjerinaajitada', { footerback: footerback, includefooterback : true });});
app.get('/tayassutajacu', (req, res) => {res.render('tayassutajacu', { footerback: footerback, includefooterback : true });});
app.get('/tinta', (req, res) => {res.render('tinta', { footerback: footerback, includefooterback : true });});
app.get('/tintaacrilica', (req, res) => {res.render('tintaacrilica', { footerback: footerback, includefooterback : true });});
app.get('/torredehanoi', (req, res) => {res.render('torredehanoi', { footerback: footerback, includefooterback : true });});
app.get('/torreeiffel', (req, res) => {res.render('torreeiffel', { footerback: footerback, includefooterback : true });});
app.get('/trilogiadascores', (req, res) => {res.render('trilogiadascores', { footerback: footerback, includefooterback : true });});
app.get('/twinsen', (req, res) => {res.render('twinsen', { footerback: footerback, includefooterback : true });});
app.get('/vandyck', (req, res) => {res.render('vandyck', { footerback: footerback, includefooterback : true });});
app.get('/velocidadedaluz', (req, res) => {res.render('velocidadedaluz', { footerback: footerback, includefooterback : true });});
app.get('/vermelho', (req, res) => {res.render('vermelho', { footerback: footerback, includefooterback : true });});
app.get('/vietna', (req, res) => {res.render('vietna', { footerback: footerback, includefooterback : true });});
app.get('/virgilio', (req, res) => {res.render('virgilio', { footerback: footerback, includefooterback : true });});
app.get('/voldemort', (req, res) => {res.render('voldemort', { footerback: footerback, includefooterback : true });});
app.get('/zecolmeia', (req, res) => {res.render('zecolmeia', { footerback: footerback, includefooterback : true });});

//FASES
app.get('/fasezero', function(req, res) {res.render('fasezero', { footerpasscode: footerpasscode, includepasscode : true });});
//1
app.get('/coracao', (req, res) => {res.render('coracao', { footerpasscode: footerpasscode, includepasscode : true });});
//2
app.get('/14bis', (req, res) => {res.render('14bis', { footerpasscode: footerpasscode, includepasscode : true });});
//3
app.get('/bobesponja', (req, res) => {res.render('bobesponja', { footerpasscode: footerpasscode, includepasscode : true });});
//4
app.get('/jesus', (req, res) => {res.render('jesus', { footerpasscode: footerpasscode, includepasscode : true });});
//5
app.get('/incriveis', (req, res) => {res.render('incriveis', { footerpasscode: footerpasscode, includepasscode : true });});
//6
app.get('/atila', (req, res) => {res.render('atila', { footerpasscode: footerpasscode, includepasscode : true });});
//============================= TO DO =============================
//7 
app.get('/xadrez',(req,res)=>{res.render('xadrez',{footerpasscode:footerpasscode,includepasscode:true});});
//8
app.get('/io',(req,res)=>{res.render('io',{footerpasscode:footerpasscode,includepasscode:true});});
//9
app.get('/hipocondria',(req,res)=>{res.render('hipocondria',{footerpasscode:footerpasscode,includepasscode:true});});
//10
app.get('/vangogh',(req,res)=>{res.render('vangogh',{footerpasscode:footerpasscode,includepasscode:true});});
//11
app.get('/burjdubai',(req,res)=>{res.render('burjdubai',{footerpasscode:footerpasscode,includepasscode:true});});
//12
app.get('/celular',(req,res)=>{res.render('celular',{footerpasscode:footerpasscode,includepasscode:true});});
//13
app.get('/pedraderoseta',(req,res)=>{res.render('pedraderoseta',{footerpasscode:footerpasscode,includepasscode:true});});
//14
app.get('/holanda',(req,res)=>{res.render('holanda',{footerpasscode:footerpasscode,includepasscode:true});});
//15
app.get('/catacrese',(req,res)=>{res.render('catacrese',{footerpasscode:footerpasscode,includepasscode:true});});
//16
app.get('/hipogrifo',(req,res)=>{res.render('hipogrifo',{footerpasscode:footerpasscode,includepasscode:true});});
//17
app.get('/franca',(req,res)=>{res.render('franca',{footerpasscode:footerpasscode,includepasscode:true});});
//18
app.get('/01000001',(req,res)=>{res.render('01000001',{footerpasscode:footerpasscode,includepasscode:true});});
//19
app.get('/carokann',(req,res)=>{res.render('carokann',{footerpasscode:footerpasscode,includepasscode:true});});
//20
app.get('/edipo',(req,res)=>{res.render('edipo',{footerpasscode:footerpasscode,includepasscode:true});});
//21
app.get('/caribe',(req,res)=>{res.render('caribe',{footerpasscode:footerpasscode,includepasscode:true});});
//22
app.get('/fadaverde',(req,res)=>{res.render('fadaverde',{footerpasscode:footerpasscode,includepasscode:true});});
//23
app.get('/milan',(req,res)=>{res.render('milan',{footerpasscode:footerpasscode,includepasscode:true});});
//24
app.get('/celeritas',(req,res)=>{res.render('celeritas',{footerpasscode:footerpasscode,includepasscode:true});});
//25
app.get('/rondara',(req,res)=>{res.render('rondara',{footerpasscode:footerpasscode,includepasscode:true});});
//26
app.get('/operacaoverde',(req,res)=>{res.render('operacaoverde',{footerpasscode:footerpasscode,includepasscode:true});});
//27
app.get('/ferpeitamente',(req,res)=>{res.render('ferpeitamente',{footerpasscode:footerpasscode,includepasscode:true});});
//28
app.get('/4851',(req,res)=>{res.render('4851',{footerpasscode:footerpasscode,includepasscode:true});});
//29
app.get('/255',(req,res)=>{res.render('255',{footerpasscode:footerpasscode,includepasscode:true});});
//30
app.get('/04151401',(req,res)=>{res.render('04151401',{footerpasscode:footerpasscode,includepasscode:true});});
//31
app.get('/650',(req,res)=>{res.render('650',{footerpasscode:footerpasscode,includepasscode:true});});
//32
app.get('/terceirocirculo',(req,res)=>{res.render('terceirocirculo',{footerpasscode:footerpasscode,includepasscode:true});});
//33
app.get('/mortedemarat',(req,res)=>{res.render('mortedemarat',{footerpasscode:footerpasscode,includepasscode:true});});
//34 - Fim do nível 1
app.get('/05151402',(req,res)=>{res.render('05151402',{footerpasscode:footerpasscode,includepasscode:true});});
/*
Pass 1 para nível 2: antonio
Pass 2 para nível 2: pollaiolo
*/
//35
app.get('/antoniopollaiolo',(req,res)=>{res.render('antoniopollaiolo',{footerpasscode:footerpasscode,includepasscode:true});});
//36 = fado
app.get('/fado',(req,res)=>{res.render('fado',{footerpasscode:footerpasscode,includepasscode:true});});
//37 = 
app.get('/tomriddle',(req,res)=>{res.render('tomriddle',{footerpasscode:footerpasscode,includepasscode:true});});
//============================= EXTRAS =============================
//68
app.get('/corcel', (req, res) => {res.render('corcel', { footerpasscode: footerpasscode, includepasscode : true });});
//71
app.get('/pneumoultramicroscopicossilicovulcanoconiotico', (req, res) => {res.render('pneumoultramicroscopicossilicovulcanoconiotico', { footerpasscode: footerpasscode, includepasscode : true });});
//72
app.get('/araraarara', (req, res) => {res.render('araraarara', { footerpasscode: footerpasscode, includepasscode : true });});
//75
app.get('/acronimo', (req, res) => {res.render('acronimo', { footerpasscode: footerpasscode, includepasscode : true });});
//84
app.get('/arar', (req, res) => {res.render('arar', { footerpasscode: footerpasscode, includepasscode : true });});

// Handles any requests that don't match the ones above
app.get('/', (req,res) =>{ res.render('index');});
app.get('*', (req,res) =>{ res.status(404).render('error', { footerback: footerback, includefooterback : true });});

app.listen(port, () => {console.log(`Server is running on port ${port}`);});