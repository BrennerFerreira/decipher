var form = document.querySelector("#formulario");
var mensagem = document.querySelector("#mensagem");
var cifra = document.querySelector("#cifraSelection");
var chaveCesarDiv = document.querySelector("#inputChaveCesar");
var chaveCesar = document.querySelector("#chaveCesar");
var codificar = document.querySelector("#codificar");
var decodificar = document.querySelector("#decodificar");
var botaoSubmit = document.querySelector("#botaoSubmit");

cifra.addEventListener("change", function (event) {
  var valorSelecionado = event.target.value;

  if (valorSelecionado == "base64") {
    chaveCesarDiv.style.display = "none";
  } else {
    chaveCesarDiv.style.display = "block";
  }
});

codificar.addEventListener("click", function () {
  botaoSubmit.innerText = "Codificar mensagem";
});

decodificar.addEventListener("click", function () {
  botaoSubmit.innerText = "Decodificar mensagem";
});

function cifraDeCesar(texto, chave) {
  if (chave < 0) {
    return caesarShift(texto, chave + 26);
  }

  var output = "";

  for (var i = 0; i < texto.length; i++) {
    var caracter = texto[i];

    var codigo = texto.charCodeAt(i);

    if (codigo >= 65 && codigo <= 90) {
      var casasParaMudar = ((codigo + chave - 65) % 26) + 65;
      caracter = String.fromCharCode(casasParaMudar);
    } else if (codigo >= 97 && codigo <= 122) {
      var casasParaMudar = ((codigo + chave - 97) % 26) + 97;
      caracter = String.fromCharCode(casasParaMudar);
    }

    output += caracter;
  }

  return output;
}

function submit(event) {
  event.preventDefault();

  if (cifra.value == "cesar") {
    var chave = +chaveCesar.value || 0;
    var textoCifrado;

    if (codificar.checked) {
      textoCifrado = cifraDeCesar(mensagem.value, chave);
    } else {
      textoCifrado = cifraDeCesar(mensagem.value, -chave);
    }

    var novoParagrafo = document.createElement("p");
    var divResposta = document.querySelector("#resposta");
    novoParagrafo.textContent = textoCifrado;
    divResposta.append(novoParagrafo);
  }
  console.log(`mensagem: ${mensagem.value}`);
  console.log(`cifra: ${cifra.value}`);
  console.log(`chave cesar: ${chaveCesar.value}`);
  console.log(`codificar: ${codificar.checked}`);
  console.log(`decodificar: ${decodificar.checked}`);
}

form.addEventListener("submit", submit);
