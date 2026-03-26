let valorNumInput
let valorNumDestinatarioInput
let usuarioTransferencia

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


// botões de confirmação para a transferencia 
let transferirButton = document.querySelector('#Transferir').addEventListener('click', () => {
    // se a função de confirmação for , o sistema abre o modal
    if (confirmacaoModal() === true) {
        sectionConfirm.style.display = 'flex'
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