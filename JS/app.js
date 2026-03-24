let input = document.querySelector('input')
let statusConta = document.querySelector('#status')
let depositarButton = document.querySelector('#depositar')
let sacarButton = document.querySelector('#sacar')
let transferirButton = document.querySelector('#Transferir')
let saldo = document.querySelector("#saldo")
let buttonProfile = document.querySelectorAll(".contact-item")

const usuario = new ContaBancaria('Pedro', 0); // instancia da classe , criando um OBJETO
const usuario2 = new ContaBancaria('Maria', 0);// instancia da classe , criando um OBJETO
const usuario3 = new ContaBancaria('Joao', 0);// instancia da classe , criando um OBJETO
const usuario4 = new ContaBancaria('Lucas', 0);// instancia da classe , criando um OBJETO

let contasDoBanco = {
    2: usuario2,
    3: usuario3,
    4: usuario4
}




depositarButton.addEventListener('click', deposito)
sacarButton.addEventListener('click', saque)
transferirButton.addEventListener('click', Transferencia)