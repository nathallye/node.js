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