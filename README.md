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


