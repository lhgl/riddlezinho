# 🧩 Lacunas de Conteúdo (Content Gaps)

Este documento lista o **conteúdo de jogo que ainda precisa ser fornecido** para que o
RiddleZinho fique 100% completo. A engine, as rotas, a autenticação, o placar e todas as
fases já renderizam corretamente — o que falta são **imagens-pista originais** (que não
foram migradas do blog original) e o **enigma de 18 fases** que hoje são marcadas como
"em construção".

> **Importante:** o código está pronto para publicação. Nenhuma das lacunas abaixo quebra
> a aplicação — imagens ausentes são ocultadas automaticamente (veja
> [Degradação graciosa](#-degradação-graciosa)) e as fases em construção exibem uma página
> limpa com o campo de senha. Preencher as lacunas é **opcional** e apenas restaura a
> experiência completa do jogo original.

---

## 🖼️ 1. Imagens-pista ausentes

O jogo original (riddlezinho.blogspot.com) usava uma imagem como pista em várias fases.
Durante a migração para esta arquitetura, **61 imagens não foram copiadas** para o
repositório. Cada fase abaixo espera um arquivo com o **nome exato** indicado.

### Como restaurar

1. Recupere a imagem original correspondente (do blog, backup ou arquivo pessoal).
2. Salve-a em `public/images/fases/` usando **exatamente** o nome de arquivo esperado
   (respeitando maiúsculas/minúsculas e extensão).
3. Pronto — a imagem passa a aparecer automaticamente na fase; nenhum código precisa mudar.

> As views legadas referenciam a imagem pelo nome simples (ex.: `src="rosa.jpg"`). O
> servidor Express serve `public/` na raiz, então o caminho efetivo é
> `public/images/fases/<arquivo>`. Para novas fases, prefira o caminho absoluto
> `/images/fases/<arquivo>`.

| Fase | ID | Arquivo(s) de imagem esperado(s) |
|-----:|----|----------------------------------|
| 6 | `atila` | `hun.jpg` |
| 7 | `xadrez` | `ioio.jpg` |
| 8 | `io` | `muitas_pilulas.jpg` |
| 9 | `hipocondria` | `van.jpg` |
| 11 | `burjdubai` | `maior_do_mundo.jpg` |
| 12 | `celular` | `rosa.jpg` |
| 14 | `holanda` | `cabeca_de_alfinete.jpg` |
| 16 | `hipogrifo` | `capital_natureza.jpg` |
| 17 | `franca` | `alfa_romeo.bmp` |
| 18 | `01000001` | `segundo_match.jpg` |
| 19 | `carokann` | `que_tragedia.jpg` |
| 20 | `edipo` | `barba_antiga.jpg` |
| 21 | `caribe` | `lady_di.jpg` |
| 22 | `fadaverde` | `otico.jpg` |
| 23 | `milan` | `em_einstein.jpg` |
| 24 | `celeritas` | `da_trilogia_indianista.gif` |
| 25 | `rondara` | `lba2.jpg` |
| 26 | `operacaoverde` | `de_cesar.jpg` |
| 27 | `ferpeitamente` | `GE.jpg` |
| 28 | `4851` | `imagem1.png` |
| 29 | `255` | `pequenos_leoes.jpg` |
| 30 | `04151401` | `complete.jpg` |
| 31 | `650` | `descontrole.jpg` |
| 32 | `terceirocirculo` | `nome_da_obra.jpg` |
| 34 | `05151402` | `fogos.jpg` |
| 35 | `antoniopollaiolo` | `cla.jpg`, `ves.jpg` |
| 36 | `fado` | `nascido_em_1928.jpg` |
| 37 | `tomriddle` | `banheira.jpg` |
| 38 | `soccer` | `cao_de_raca.jpg` |
| 39 | `yijetuan` | `cara_chato.jpg` |
| 40 | `chateaubriand` | `com_charme.jpg` |
| 41 | `cigarro` | `notebook.jpg` |
| 42 | `cemdolares` | `misterio_desvendado.jpg` |
| 44 | `timesnewroman` | `para_jogadores.jpg` |
| 46 | `keeptalking` | `pontos.jpg` |
| 47 | `trevorjackson` | `apenas_um_homem.jpg` |
| 49 | `rrd` | `terra_a_vista.jpg` |
| 51 | `mastimnapolitano` | `em_3_dias.jpg` |
| 52 | `bombaatomica` | `ary_barroso_descaracterizado.jpg` |
| 54 | `volkswagen` | `culinaria_riddle.jpg` |
| 55 | `impostoderenda` | `pierre.jpg` |
| 56 | `seispoemas` | `olho_vivo.jpg` |
| 58 | `miltonnascimento` | `desenho_animado.jpg` |
| 59 | `pauloleminski` | `cifra.jpg` |
| 60 | `yfotmydfelx` | `road.jpg` |
| 62 | `saomartinho` | `mantenha_a_classe.jpg` |
| 64 | `fase64` | `coriolis_demonstrado.jpg` |
| 65 | `amparo` | `iniciais.jpg` |
| 67 | `mariademedici` | `fu.jpg`, `sao.jpg` |
| 70 | `corfix` | `nao_respire.jpg` |
| 76 | `sonhodemagia` | `linha_11.bmp` |
| 78 | `tayassu` | `vadiagem_canina.jpg` |
| 79 | `hulkabilly` | `lapis.jpg` |
| 80 | `defatigatis` | `detonar_o_cobertor.jpg` |
| 81 | `escanhoarieis` | `rivalidade_antiga.jpg` |
| 82 | `fonda` | `um_jantar_diferente.jpg` |
| 83 | `bisposardinha` | `etimologia.jpg` |
| 85 | `tubarao` | `em_dolares.jpg` |
| 92 | `80000` | `escada_inspirada.jpg` |
| 96 | `deuteranopia` | `image001.gif`, `deuteranopia.jpg` |
| 99 | `taxonomia` | `taxonomia.jpg` |

---

## 🚧 2. Fases em construção (enigma pendente)

As 18 fases abaixo existem na jornada (Nível 2) mas ainda **não têm enigma**. Elas foram
recuperadas de arquivos corrompidos e agora exibem uma página limpa e válida ("fase em
construção") com o campo de senha — de modo que quem já conhece a resposta consegue seguir.

Para transformá-las em fases reais, edite o arquivo `views/<id>.ejs` correspondente
adicionando o texto/imagem do enigma. A **senha** de cada uma já é definida pelo `id` da
**fase seguinte** em `src/config/phases.ts`.

| Fase | ID (arquivo `views/<id>.ejs`) | Nível |
|-----:|-------------------------------|-------|
| 45 | `fase45` | Nível 2 |
| 48 | `fase48` | Nível 2 |
| 50 | `fase50` | Nível 2 |
| 53 | `fase53` | Nível 2 |
| 57 | `fase57` | Nível 2 |
| 61 | `fase61` | Nível 2 |
| 63 | `fase63` | Nível 2 |
| 69 | `fase69` | Nível 2 |
| 73 | `fase73` | Nível 2 |
| 74 | `fase74` | Nível 2 |
| 77 | `fase77` | Nível 2 |
| 86 | `fase86` | Nível 2 |
| 87 | `fase87` | Nível 2 |
| 88 | `fase88` | Nível 2 |
| 89 | `fase89` | Nível 2 |
| 90 | `fase90` | Nível 2 |
| 91 | `fase91` | Nível 2 |
| 93 | `fase93` | Nível 2 |

---

## ✨ Degradação graciosa

Enquanto as imagens não são restauradas, o script `public/scripts/fases.js` **oculta
automaticamente** qualquer `<img>` que não conseguir carregar, evitando o ícone de
"imagem quebrada". Assim que o arquivo correto é adicionado a `public/images/fases/`, a
imagem volta a aparecer sem nenhuma outra alteração.

## 🗂️ Assets órfãos

- `public/images/fases/prisao.jpg` existe no repositório mas não é referenciado por
  nenhuma fase. Pode ser aproveitado por uma fase futura ou removido.
