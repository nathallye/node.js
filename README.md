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