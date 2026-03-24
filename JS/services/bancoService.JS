
// ARRUMAR O BOTAO DE TRANSFERENCIA 

function Transferencia() {
    const valor = Number(input.value) // pegando valor de input
    

    let usuarioSelecionado = select.value // pegando o valor do select que retorna uma string ex: "Maria"
    let usuarioTransferencia = contasDoBanco[usuarioSelecionado] // acessa o objeto correspondente ex: "Maria": usuario2, ou seja, acessa o objeto que tem aquela string


    usuario.transferir(valor, usuarioTransferencia)// transferindo valor digitado para ex: "Maria"(usuario2)
    // usuario2 -> está passando o objeto completo 

    saldo.innerText = `R$ ${usuario.saldo.toLocaleString('pt-BR')}`// atualizando o valor do saldo no html
    atualizarStatus()// chamando a função para atualizar o html -> 'conta zerada'
    usuario.atualizarHistorico() // atualizando o historico de transações , depósito / saque / transferência
    input.value = ''

    console.log(usuario);
    console.log(usuario2);
    console.log(usuario3);
}

buttonProfile.forEach(button => {
    button.addEventListener('click', () => {
        tranferirProfile(button)
    })
})

function tranferirProfile(elemento) {
    const valor = Number(input.value) // pegando valor de input

    if (valor <= 0 || isNaN(valor)) {
        alert("Por favor, insira um valor válido para transferência.");
        return;
    }

    let usuarioSelecionado = elemento.dataset.userId // pegando o valor do select que retorna uma string ex: "Maria"
    let usuarioTransferencia = contasDoBanco[Number(usuarioSelecionado)]

    usuario.transferir(valor, usuarioTransferencia)// transferindo valor digitado para ex: "Maria"(usuario2)
    // usuario2 -> está passando o objeto completo 

    saldo.innerText = `R$ ${usuario.saldo.toLocaleString('pt-BR')}`// atualizando o valor do saldo no html
    atualizarStatus()// chamando a função para atualizar o html -> 'conta zerada'
    usuario.atualizarHistorico() // atualizando o historico de transações , depósito / saque / transferência
    input.value = ''
}


