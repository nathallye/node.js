process.stdout.write("Está tudo bem? "); // escreve no console
process.stdin.on("data", function(data) { // captura entrada do usuário no console, e quando o data for disparado é chamada uma função callback que recebe os dados recebidos e irá mostrar no console qual a entrada do usuário
  process.stdout.write(`Sua resposta foi ${data.toString()}Obrigada!\n`) // escreve no console
  process.exit(); // finaliza o programa 
});