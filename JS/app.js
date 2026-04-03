let inputValor = document.querySelector('#valor')
let destinatarioInput = document.querySelector('#destinatario')
let statusConta = document.querySelector('#status')
let depositarButton = document.querySelector('#depositar')
let sacarButton = document.querySelector('#sacar')
let saldo = document.querySelector("#saldo")
let sectionConfirm = document.querySelector("#sectionConfirm")
let msgConfirm = document.querySelector("#msgConfirm")
let errorRegister = document.querySelector(".errorRegister")
let errorLogin = document.querySelector(".errorLogin")


// container principal Conta bancaria
let containerbank = document.querySelector(".container")

// seleção modal login/register
let btnOpenRegister = document.querySelector(".btn-for-register")// desaparece o login
let btnOpenLogin = document.querySelector(".btn-for-login") // desaparece register
let cardLogin = document.querySelector(".cardLogin")
let cardRegister = document.querySelector(".cardRegister")

//inputs do modal de login e register
let formRegister = document.querySelector("#formRegister")// formulario register
let formLogin = document.querySelector("#formLogin")// formulario login

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

let usuarioStorage = {
    
}

depositarButton.addEventListener('click', deposito)
sacarButton.addEventListener('click', saque)
btnOpenRegister.addEventListener('click', openModalRegister)
btnOpenLogin.addEventListener('click', openModallogin)