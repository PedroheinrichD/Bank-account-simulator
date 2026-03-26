let inputValor = document.querySelector('#valor')
let destinatarioInput = document.querySelector('#destinatario')
let statusConta = document.querySelector('#status')
let depositarButton = document.querySelector('#depositar')
let sacarButton = document.querySelector('#sacar')
let saldo = document.querySelector("#saldo")
let sectionConfirm = document.querySelector("#sectionConfirm")

const usuario = new ContaBancaria('Pedro', 0); // instancia da classe , criando um OBJETO
let listaDeNomes = [
    "Maria",
    "Joao",
    "Lucas",
    "Cristiane",
    "Dândara",
    "David",
    "Eclésia",
    "Edjane",
    "Caio",
    "Eduardo",
    "Kaira",
    "Farah",
    "Elionax",
    "Dayse"
]
let contasDoBanco = {}
for (let i = 0; i < listaDeNomes.length; i++) {
    const element = listaDeNomes[i];
    const id = i + 2
    const usuario = new ContaBancaria(element, 0);

    // objeto[chave] = valor
    contasDoBanco[id] = usuario
}


depositarButton.addEventListener('click', deposito)
sacarButton.addEventListener('click', saque)