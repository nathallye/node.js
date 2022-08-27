# Node.js

Node é um ambiente de execução focado no lado do servidor que executa JavaScript.

## Executando o primeiro arquivo JS no servidor node

- Vamos criar um arquivo chamado `ex01.js` e nele iremos inserir o seguinte trecho de código:

``` JS
const hello = () => console.log("Olá Node.js!!");
setInterval(hello, 1000); // esse método vai chamar a função informada no intervalo de tempo informada, nesse caso em 1000 milisegundos ou seja, de um em 1 em 1 segundo
```

- E para executar esse arquivo no terminal(no diretório do arquivo) vamos rodar o comando seguinte:

```
node ex01.js
     [name_file]
```

## Sistema de Módulos

- O node trabalha com o sistema de módulos(o que foi declado em um arquivo pode ser acessado em outro). 
Para entendermos melhor como funciona esse sistema vamos criar um arquivo chamado `ex02_utils.js` e nele vamos criar uma função chamada `upper` a qual receber um `text` e irá retornar esse `text` chamando o método `toUpperCase` para transformar esse texto recebido em letras maiúsculas:

``` JS
function upper(text) {
  return text.toUpperCase();
}
```

- Só que até o momento essa função `upper` pertence apenas a esse módulo/arquivo `ex02_utils.js`, se quisermos tornar essa função pública/acessível para outros arquivos podemos chamar a `module.exports` o qual irá receber o que queremos exportar/expor. Podemos retornar diretamente a função desejada ou um objeto que contém essa função:

``` JS
function upper(text) {
  return text.toUpperCase();
}

module.exports = upper;

// or

function upper(text) {
  return text.toUpperCase();
}

module.exports = { upper };
```

- Agora, podemos usar essa função exportada a partir de outro módulo.
Para isso, iremos criar um arquivo chamado `ex02_test.js` e nele iremos importar o módulo/arquivo que queremos acessar seus dados usando o `require` e essa importação iremos receber dentro da const `utils`:


``` JS
const utils = require("./ex02_utils"); // forma que o node importa outro arquivo, a partir do método require
```

- Lembrando que essa constante `utils` irá receber tudo que está sendo retornado no módulo `ex02_utils.js`, então nesse caso é um objeto que contém dentro a função `upper`. E para acessar/chamar essa função de dentro da constante `utils` vamos usar a notação de ponto:

``` JS
const utils = require("./ex02_utils");

console.log(utils.upper("show de bola!")); // chamada da função passando o texto como parâmetro para text

// retorno =>
// > SHOW DE BOLA!
```

## Singleton

- Quando importamos um determinado módulo, ou seja, chamamos a função `require` e pegamos esse módulo e atribuimos a uma variável, por padrão o que é retornado é um `singleton` é um objeto que tem uma única instância e esse objeto é compartilhado com todos que requisitarem esse mesmo módulo. Então devemos ter cuidado na hora de guardar estado nos módulos para que não pensarmos que está sendo retornando um objeto, na verdade, é um `singleton` que está sendo devolvido e todos os módulos que estão requisitando este módulo em questão estão usando esse mesmo objeto.

- E para entendermos melhor como isso acontece, vamos criar um arquivo chamado `ex03_singleton.js`;

- E dentro desse arquivo vamos criar uma variável chamada `number` e ela vai receber o valor 1; e em seguida vamos criar uma função chamada exibirProximo/`showNext` a qual irá exibir um console da variável `number` incrementando `+ 1`(number++); por fim, iremos exportar essa função/function criada para que ela fique acessível para outros módulos:

``` JS
let number = 1;

function showNext() {
  console.log(number++);
}

module.exports = { showNext };
```

- Em seguida, vamos criar um novo arquivo chamado `ex03_test.js` e nele iremos fazer a importação do módulo `ex03_singleton.js` através do `require` e armazenando em uma variável chamada `s1`:

``` JS
const s1 = require("./ex03_singleton");
```

- E vamos requisitar o mesmo módulo e armazenar em outra variável chamada `s2`:

``` JS
const s1 = require("./ex03_singleton");
const s2 = require("./ex03_singleton");
```

- Agora, vamos chamar a função `showNext` de dentro de `s1` e `s2`:

``` JS
const s1 = require("./ex03_singleton");
const s2 = require("./ex03_singleton");

s1.showNext();
s2.showNext();
s1.showNext();
s2.showNext();
```

- E vamos executar esse módulo `ex03_test.js` no servidor node e podemos notar o seguinte retorno:

```
1
2
3
4
```

- Podemos notar que `s1` e `s2` não são duas instâncias diferentes e sim apontam para a mesma instância do módulo requirido, portanto, toda vez que a função `showNext` é chamada seja sem `s1` ou `s2` os valores acessados os mesmos, ou seja, se fossem duas instânias diferentes o retorno seria `1 2 1 2`.

## Objeto Global
 
- Quando trabalhamos com o JS no lado do front-end temos um objeto que exerce um papel importante que é o objeto Window, que é justamente o objeto global, existe até uma boa prática que é fugir desse escopo global, evitando declarar variáveis e funções diretamente no Window, ou seja, no Escopo Global.
O Node também tem esse escopo global, mas devemos usá-lo de uma forma bem pensada, para evitarmos cair em erros e bugs.

- Para entendermos melhor o Escopo Global do Node vamos criar um novo arquivo chamado `ex04_global.js` e dentro dele iremos criar uma constante chamada `PI` que irá receber o valor 3.14, em seguida vamos exibir um console de `global.PI`:

``` JS
const PI = 3.14;

console.log(global.PI);
```

- Em seguida, vamos executar o módulo/arquivo `ex04_global.js` no node e podemos notar que o retorno é `undefined`, isso ocorre porque quando declaramos uma `const` dentro de um módulo ela não vai ficar armazenada dentro do escopo global do node, o sistema de módulos do node garante que tudo que escrevemos dentro de um arquivo, ou seja, dentro de módulo é visível apenas dentro desse módulo e ele não é exposto diretamente no ecscopo global, evitando erros e bugs causados pelo uso do escopo global.

## This

- Em JS o nem sempre o conceito do this, quem representa o this em determinado momento é tão claro, porque existe um this que é mais associado ao lugar onde foi definido dentro do código, por exemplo, o this que é implementado dentro da função arrow, só que o this em uma função tradicional do JS é sensível a forma como essa função é chamada, ou seja, nem sempre o this representada a mesma coisa se chamarmos a função de formas diferentes.

- Mas dentro de um módulo do node o this aponta para quem? E para entendermos esse assunto vamos criar um novo módulo chamado `ex05_module.js` e dentro desse módulo vamos criar algumas comparações para visualizarmos para qual objeto o `this` aponta em um módulo node:

``` JS
const { global } = require("styled-jsx/css");

console.log(this === global); // this é igual a global?, ou seja, this aponta para global?
// retorno =>
// false
console.log(this === module); // this é igual a module?, ou seja, this aponta para module?
// retorno =>
// false
console.log(this === module.exports); // this é igual a module.exports?, ou seja, this aponta para module.exports?
// retorno =>
// true
```

- Podemos notar que o `this` dentro de um módulo node aponta para o objeto `module.exports`, que é justamente o objeto que será exposto para os outros módulos, inicialmente ele é um objeto vazio e apartir do momentos que atribuimos um novo objeto para o `module.exports`(module.exports = {}) esse objeto é exportado para quem requerer(fizer o require) o módulo em questão.

- Portanto, podemos inserir uma funcionalidade diretamente no `this` e ela será exportada para fora do módulo, substituindo a atribução dessa funcionalidade dentro de um objeto o qual `module.exports` recebe.
Para entendermos melhor como isso acontece, vamos atribuir a `this.talkHello` uma função a qual irá exibir um console:

``` JS
const { global } = require("styled-jsx/css");

console.log(this === global); 
console.log(this === module); 
console.log(this === module.exports);

this.talkHello = function() { // this substitui module.exports
  console.log("Hello!!!!!")
}
```

- Em seguida, vamos criar um novo arquivo chamado `ex05_test.js` e nele iremos fazer a importação do módulo `ex05_module.js` através do `require` e armazenando em uma variável chamada `m`; feito isso, podemos chamar a função `talkHello` criada dentro do módulo `ex05_module.js`:

``` JS
const m = require("./ex05_module");

m.talkHello();
```

## Módulo Externo(Lodash)

- Biblioteca JS que funcionada no browser mas conseguimos usá-la normalmente no node também.
Para entendermos melhor sobre essa biblioteca vamos criar um arquivo chamado `ex06_lodash.js`. E diferente quando fazemos uma importação de um módulo da própria aplicação que precisamos colocar o caminho relativo, para importar um módulo externo simplesmente colocamos o nome do arquivo do node sem se preocupar com o caminho relativo:

``` JS
const _ = require("lodash");
```

- Apesar de termos requirido o `lodash`, não temos acesso a ele por padrão ele não é um modulo do core do node, portanto, precisamos instalar esse módulo. No terminal vamos rodar o comando seguinte:

```
npm install lodash

or

npm i lodash
```

**npm:** Gerenciador de módulos do node.

- Fazendo isso temos o `lodash` disponível para ser usada na nossa aplicação.
E para isso, dentro de `ex06_lodash.js` vamos criar um array de objetos de alunos:

``` JS
const _ = require("lodash");

const students = [
  {
    name: "João",
    score: 7.6
  },
  {
    name: "Maria",
    score: 8.6
  },
  {
    name: "Pedro",
    score: 8.1
  }
]
```

- Agora, vamos supor que precisamos percorrer esses objetos, extraindo a nota de cada um deles e somar essas notas e calcular a média. Para isso, vamos usar o `lodash` para fazer esse trabalho:

``` JS
const _ = require("lodash");

const students = [
  {
    name: "João",
    score: 7.6
  },
  {
    name: "Maria",
    score: 8.6
  },
  {
    name: "Pedro",
    score: 8.1
  }
]

const average = _.sumBy(students, "score") / students.length; // o método sumBy recebe o array e o atributo que queremos "pegar" e pegando o atributo nota/score ele vai somar todas as notas e por fim dividir pelo tamanho do array de alunos/students;

console.log(average); // vamos exibir no console o valor da média das notas armazenado na const average
```

- Pulamos a etapa de criar o arquivo descritor do node `package.json` que armazena a declaração das dependências do projeto que evita a instalação novamente de todas as dependências/módulos manualmente se por ventura trocarmos de máquina ou enviarmos esse projeto para outra pessoa, podendo serem instaladas através desse arquivo usando o comando `npm install`. E para criarmos esse arquivo vamos rodar o comando seguinte no terminal:

```
npm init -y
```

**Obs.:** 
`-y` - É para responder todas as perguntas dessa inicialização de forma padrão.

- Depois disso se dentro do arquivo `package.json` ainda não contenha a referência do `lodash`, podemos solucionar rodando o comando seguinte no terminal:

```
npm install lodash --save

or

npm i lodash --save
```

**Obs.:** 
`--save` - Para salvar no arquivo `package.json`.

## Passagem de Parâmetros

- A partir dos exemplos que já construimos até aqui, vimos como a partir de um módulo conseguimos expor funcionalidades, dados, objetos, funções para um outro módulo via `module.exports` ou pelo próprio `this`;

- No entanto, ainda não vimos como passar um dado/parâmetro para dentro de um módulo. Para entendermos como isso funciona vamos criar um arquivo chamado `ex07_param`, nesse arquivo vamos exportar diretamente uma função(anônima, sem nome) para o `module.exports` que recebe como parâmetro o `param` e essa função vai exibir um console com uma frase interpolada com o `param` informado:

``` JS
module.exports = function(param) { // module.exports deixa de ser um objeto vazio e se torna a função que está recebendo
  console.log(`O param informado foi ${param}`);
}
```

- Em seguida, iremos criar um nov arquivo chamado `ex07_test.js` e nele iremos fazer a importação do módulo `ex07_param.js` através do `require` e armazenando em uma variável chamada `moduleWithParam`:

``` JS
const moduleWithParam = require("./ex07_param");
```

- Feito isso, conseguimos chamar a função passando para `param` como atributo o `param1`:

``` JS
const moduleWithParam = require("./ex07_param");

moduleWithParam("param1");
```

## process.argv

- A propriedade `process.argv` é uma interface de programação de aplicativo embutida do módulo de processo que é usada para obter os argumentos passados ​​para o processo node.js quando executado na linha de comando.

- Para entendermos melhor como essa propriedade funciona vamos criar o arquivo `ex08_process.js` e nele iremos exibir um console de `process.argv`:

``` JS
console.log(process.argv);
```

- Em seguida, vamos chamar esse módulo para ser executado no node passando alguns parâmetros:

``` JS
node ex08_process.js test param
```

- No terminal, podemos notar que esta propriedade retorna uma array contendo os argumentos passados ​​ao processo ao executá-lo na linha de comando. O primeiro elemento é o caminho de execução do processo e o segundo elemento é o caminho para o arquivo js/módulo chamado:

``` JS
[
  '/usr/local/bin/node',
  '/home/nathallye/dev/cursos/nodejs/ex08_process.js',
  'test',
  'param'
]
```

- Com isso, podemos fazer uma função para verificar se um parâmetro foi passado ou não na lista dos argumentos da chamada do módulo/arquivo js.
O nome da função será `haveParam` e ela irá receber um parâmetro de entrada e dentro dela vamos retornar uma verificação(se dentro de `process.argv` o `indexOf`/index de `param` for diferente de `-1` significa que esse parâmetro existe dentro dos parâmetros passados para esse módulo) que irá retornar um valor booleano(tru ou false):

``` JS
function haveParam(param) {
  return process.argv.indexOf(param) !== -1;
}
```

- Em seguida, podemos usar o valor booleano retornado e exibir e fazer um retorno condicional:

``` JS
function haveParam(param) {
  return process.argv.indexOf(param) !== -1;
}

if (haveParam("test")) { // se o param "test" foi passado, ou seja, o retorno da função foi true
  console.log("Atenção total!")
} else { // senão foi passado, ou seja, o retorno da função foi false
  console.log("De boa!")
}
```

- Agora, podemos visualizar as chamadas feitas a esse módulo com e sem parâmetros e os retornos:

``` 
node ex08_process.js test param
> Atenção total!

node ex08_process.js param
> De boa!
```

## process.stdout e process.stdin 

- Com o `process` também conseguimos escrever/imprimir e capturar entradas/inputs do usuário no console:

``` JS
process.stdout.write("Está tudo bem? "); // escreve no console
process.stdin.on("data", function(data) { // captura entrada do usuário no console, e quando o data for disparado é chamada uma função callback que recebe os dados recebidos e irá mostrar no console qual a entrada do usuário
  process.stdout.write(`Sua resposta foi ${data.toString()}Obrigada!\n`) // escreve no console
  process.exit(); // finaliza o programa 
});
```

## Módulo FS

- Um dos módulos que já vem por padrão no node(ou seja, podemos usá-lo sem precisarmos installar o pacote). Serve para acessarmos dados no arquivo, ler e modificar arquivos, listar pastas...

- Para entendermos melhor como esse módulo funciona vamos criar o arquivo `ex10_fs.js` e nele iremos importar o módulo `fs` o qual iremos acessar seus dados usando o `require` e essa importação iremos receber dentro da const `fs`:

``` JS
const fs = require("fs");
```

- E para listarmos todos os arquivos que estão nessa pasta do nosso projeto(nodejs), primeiramente iremos criar uma const chamada `files` que irá receber a lista de arquivos através do método `fs.readdirSync` que irá ler o diretório especificado(`__dirname`: constante que o node tem por padrão que aponta para o diretório atual) de forma síncrona:

``` JS
const fs = require("fs");

const files = fs.readdirSync(__dirname);
```

- Em seguida, iremos aplicar um `forEach` "em cima" da lista de arquivos(`files`) que irá percorrer cada file/`f`(arquivo) e exibir no console: 

``` JS
const fs = require("fs");

const files = fs.readdirSync(__dirname);

files.forEach(f => console.log(f));
```

- Ao executarmos no console node com o comando `node ex10_fs.js` o retorno será o seguinte:

```
.git
.gitignore
README.md
ex01.js
ex02_test.js
ex02_utils.js
ex03_singleton.js
ex03_test.js
ex04_global.js
ex05_module.js
ex05_test.js
ex06_lodash.js
ex07_param.js
ex07_test.js
ex08_process.js
ex09_process.js
ex10_fs.js
node_modules
package-lock.json
package.json
```