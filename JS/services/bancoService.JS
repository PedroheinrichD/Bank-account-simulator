let valorNumInput
let valorNumDestinatarioInput
let usuarioTransferencia
let usuario


function confirmacaoModal() {
    const valor = inputValor.value // pegando valor de input
    const destinatario = destinatarioInput.value // pegando valor de input


    if (valor === '' || destinatario === '') {
        alert(`Ops! Por favor, preencha o valor e o destinatário.`)
        return false
    }

    valorNumInput = Number(valor)
    if (valorNumInput > usuario.saldo || valorNumInput <= 0) {
        alert(`Saldo insuficiente...`)
        return false
    }

    valorNumDestinatarioInput = Number(destinatario)
    usuarioTransferencia = contasDoBanco[valorNumDestinatarioInput] // acessa o objeto correspondente ex: "Maria": usuario2, ou seja, acessa o objeto que tem aquela string
    if (usuarioTransferencia === undefined) {
        alert(`Destinatário inválido`)
        return false
    }

    return true
}

function confirmacaoValor() {
    const valor = inputValor.value // pegando valor de input

    if (valor === '') {
        alert(`Ops! Por favor, preencha o valor para fazer o depósito ou Saque.`)
        return false
    }
    return true
}



// botões de confirmação para a transferencia 
let transferirButton = document.querySelector('#Transferir').addEventListener('click', () => {
    // se a função de confirmação for , o sistema abre o modal
    if (confirmacaoModal() === true) {
        sectionConfirm.style.display = 'flex'
        msgConfirm.innerHTML = `Deseja enviar <span class = 'valor'>R$ ${valorNumInput.toLocaleString('pt-BR')}</span> para <span class = 'destino'>${usuarioTransferencia.usuario}</span>`

    }
})
let ButtonCancelar = document.querySelector("#nao").addEventListener('click', () => {
    sectionConfirm.style.display = 'none'
})


let ButtonConfirmar = document.querySelector("#sim").addEventListener('click', () => {

    usuario.transferir(valorNumInput, usuarioTransferencia)// transferindo valor digitado para ex: "Maria"(usuario2)
    // usuario2 -> está passando o objeto completo 

    saldo.innerText = `R$ ${usuario.saldo.toLocaleString('pt-BR')}`// atualizando o valor do saldo no html
    atualizarStatus()// chamando a função para atualizar o html -> 'conta zerada'
    usuario.atualizarHistorico() // atualizando o historico de transações , depósito / saque / transferência
    inputValor.value = ''
    destinatarioInput.value = ''
    sectionConfirm.style.display = 'none'
})


// pegando ID no button ao ser clicado
let buttonProfile = document.querySelectorAll(".contact-item")
function tranferirProfile(elemento) {

    let usuarioSelecionado = elemento.dataset.userId
    destinatarioInput.value = usuarioSelecionado
}


buttonProfile.forEach(button => {
    button.addEventListener('click', () => {
        tranferirProfile(button)
    })
})


// MODAL LOGIN

let userLogin

function openModalRegister() {
    cardLogin.style.display = 'none'
    cardRegister.style.display = 'block'
}

function openModallogin() {
    cardLogin.style.display = 'block'
    cardRegister.style.display = 'none'
}

// criando VAR global
let registerUser
let registerPass
let registerPassConfirmation

function confirmacaoRegister() {
    let usuario = document.querySelector("#registerUser").value // register user
    let senha = document.querySelector("#registerPass").value// register password
    let confirmacao = document.querySelector("#registerPassConfirmation").value// register password

    // Validar campos vazios
    if (usuario === '') {
        errorRegister.innerHTML = `Ops! Por favor, preencha o nome de usuário corretamente`
        return false
    }

    if (senha === '' || confirmacao === '') {
        errorRegister.innerHTML = `Ops! Por favor, preencha o campo de Senha e Confirmar Senha`
        return false
    }

    // Validar tamanho da senha
    if (senha.length < 8 || confirmacao.length < 8) {
        errorRegister.innerHTML = `só podem 8 caracteres ou mais para a senha!`
        return false
    }

    if (confirmacao !== senha) {
        errorRegister.innerHTML = `Senhas não combinam`
        return false
    }

    // Verificar se o usuário já existe no localStorage !!
    let VerificarCadastro = localStorage.getItem(usuario)
    if (VerificarCadastro !== null) {
        alert(`Conta existente!`)
        return false
    }

    // Se não existir: salvar no localStorage
    // usuarios cadastrados terao nome, senha, historico e saldo
    usuarioStorage = {
        usuarioCadastro: {
            name: usuario,
            senha: senha,
            saldo: 0,
            historico: [],
        }
    }
    //                      "key" usuario -> value Input                   VALUE
    localStorage.setItem(usuario, JSON.stringify(usuarioStorage))
    
    
    // EXIBIR um aviso de conta criada! 

    
    
    return true
}



function confirmacaoLogin() {
    let usuario = document.querySelector("#logUser").value // register user
    let senha = document.querySelector("#logpass").value // register user
    // Validar campos vazios
    if (usuario === '') {
        errorLogin.innerText = `Ops! Por favor, preencha o campo de usuário`
        return false
    }

    if (senha === '') {
        errorLogin.innerText = `Ops! Por favor, preencha o campo de Senha`
        return false
    }

    // Validar tamanho da senha
    if (senha.length < 8) {
        errorLogin.innerText = `só podem 8 caracteres ou mais para a senha!`
        return false
    }

    // acessando o Cadastro do usuario
    let getUsuario = localStorage.getItem(usuario)
    if (getUsuario === null) {
        errorLogin.innerText = `Conta inexistente...`
        return false
    }

    // conversao 
    userLogin = JSON.parse(getUsuario)
    if (userLogin.usuarioCadastro.senha !== senha || userLogin.usuarioCadastro.name !== usuario) {
        errorLogin.innerText = `Senha ou usuario incorretos`
        return false
    }
    return true
}


//event preventDefault()
formRegister.addEventListener('submit', (event) => {
    event.preventDefault()

    // codigo register

    // mostrar aviso de conta criada!
    if (confirmacaoRegister() === true) {
        let registroCard =  document.querySelector('.registroCard')
        let removerModalSucesso =  document.querySelector('.removerModalSucesso')
        registroCard.style.display = 'flex'
        

        removerModalSucesso.addEventListener('click', () => {
            registroCard.style.display = 'none'
            cardRegister.style.display = 'none'
            cardLogin.style.display = 'block'
        })
    }
})


formLogin.addEventListener('submit', (event) => {
    event.preventDefault()

    // codigo login
    if (confirmacaoLogin() === true) {
        usuario = new ContaBancaria(userLogin.usuarioCadastro.name, userLogin.usuarioCadastro.saldo); // instancia da classe , criando um OBJETO


        // REMOVER O MODAL DE LOGIN APÓS ENTRAR NA CONTA...
        cardLogin.style.display = 'none'
        containerbank.style.display = 'block'
        saldo.innerText = `R$ ${userLogin.usuarioCadastro.saldo.toLocaleString('pt-BR')}` // atualizando o valor do saldo no html
    }
})