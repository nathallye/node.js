// console.log(process.argv);

function haveParam(param) {
  return process.argv.indexOf(param) !== -1;
}

if (haveParam("test")) { // se o param "test" foi passado, ou seja, o retorno da função foi true
  console.log("Atenção total!")
} else { // senão foi passado, ou seja, o retorno da função foi false
  console.log("De boa!")
}