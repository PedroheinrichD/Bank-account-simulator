function deposito() {
    if (confirmacaoValor() === true) {
        const valor = Number(inputValor.value) // pegando valor de input
        usuario.deposito(valor)  // chamando a função dentro da classe para fazer o depósito 
        saldo.innerText = `R$ ${usuario.saldo.toLocaleString('pt-BR')}` // atualizando o valor do saldo no html
        atualizarStatus() // status da conta 'conta zerada'
        usuario.atualizarHistorico() // atualizando o historico de transações , depósito / saque / transferência
        inputValor.value = ''
    }


}

function saque() {
    if (confirmacaoValor() === true) {
        const valor = Number(inputValor.value)// pegando valor de input
        usuario.sacar(valor)// chamando a função dentro da classe para fazer o Saque 
        saldo.innerText = `R$ ${usuario.saldo.toLocaleString('pt-BR')}` // atualizando o valor do saldo no html
        atualizarStatus() // chamando a função para atualizar o html -> 'conta zerada'
        usuario.atualizarHistorico() // atualizando o historico de transações , depósito / saque / transferência
        inputValor.value = '' // limpando o valor do input
    }
}

function atualizarStatus() { // status da conta 'conta zerada'
    if (usuario.saldo <= 0) {
        statusConta.style.display = 'block'
    } else {
        statusConta.style.display = 'none'
    }
}