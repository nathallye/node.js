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