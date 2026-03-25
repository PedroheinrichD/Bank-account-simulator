
function Transferencia() {
    const destinatario = Number(destinatarioInput.value) // pegando valor de input
    const valor = Number(inputValor.value) // pegando valor de input

    let usuarioSelecionado = destinatario
    let usuarioTransferencia = contasDoBanco[usuarioSelecionado] // acessa o objeto correspondente ex: "Maria": usuario2, ou seja, acessa o objeto que tem aquela string

    usuario.transferir(valor, usuarioTransferencia)// transferindo valor digitado para ex: "Maria"(usuario2)
    // usuario2 -> está passando o objeto completo 

    saldo.innerText = `R$ ${usuario.saldo.toLocaleString('pt-BR')}`// atualizando o valor do saldo no html
    atualizarStatus()// chamando a função para atualizar o html -> 'conta zerada'
    usuario.atualizarHistorico() // atualizando o historico de transações , depósito / saque / transferência
    inputValor.value = ''
    destinatarioInput.value = ''

}
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