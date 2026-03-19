let input = document.querySelector('input')
let statusConta = document.querySelector('#status')
let depositarButton = document.querySelector('#depositar')
let sacarButton = document.querySelector('#sacar')
let transferirButton = document.querySelector('#Transferir')
let saldo = document.querySelector("#saldo")






class ContaBancaria {
    _saldo = 0
    _historico = []


    // estado inicial
    constructor(usuario, saldoInicial) {
        this.usuario = usuario
        this._saldo = saldoInicial
    }

    get saldo() {
        return this._saldo;
    }



    deposito(valor) { // função para depositar na contabancaria
        if (isNaN(valor) || valor <= 0) return
        if (typeof valor !== 'number' || valor <= 0) {
            return
        }

        this._saldo += valor

        // limitando as informações para não ser infinito 
        if (this._historico.length >= 4) {
            this._historico.shift()
        }
        this._historico.push( // adicionando historico de depósito
            {
                tipo: 'Deposito',
                valor: valor,
                data: new Date()
            })

    }


    sacar(valor) {
        if (isNaN(valor) || valor <= 0) return
        if (typeof valor !== 'number' || valor <= 0) {
            return
        }

        // verificação onde o valor não pode ser MAIOR que o saldo disponível 
        if (valor > this._saldo) {
            alert('saldo insuficiente')
            return
        }
        this._saldo -= valor // tira o valor(saque) do saldo 

        // limitando as informações para não ser infinito 
        if (this._historico.length >= 4) {
            this._historico.shift()
        }
        this._historico.push(
            {
                tipo: 'Saque',
                valor: valor,
                data: new Date()
            })
    }


    atualizarHistorico() {
        let ul = document.querySelector('ul')
        ul.innerHTML = ''

        // percorrendo o objeto dentro do array 
        for (let i = 0; i < this._historico.length; i++) {
            const element = this._historico[i];
            let newLi = document.createElement("li")
            newLi.innerText = `${element.tipo} de R$${element.valor} - horário: ${element.data.toLocaleTimeString('pt-BR')}`
            ul.append(newLi) // adicionando dentro da lista 
        }
    }


    transferir(valor, destino) {
        if (isNaN(valor) || valor <= 0) return

        // verificando se o destino foi criado a partir da classe ContaBancaria
        if (!(destino instanceof ContaBancaria)) {
            alert(`Destino inválido`)
            return
        }

        if (typeof valor !== 'number' || valor > this._saldo) {
            alert('saldo insuficiente')
            return
        }

        destino.deposito(valor) // chamando o método da classe / depositando valor do input para Destinatário -> Maria(usuario2)
        this._saldo -= valor // tirando o valor do saldo que foi feito a transferencia 


        // limitando as informações para não ser infinito 
        if (this._historico.length >= 4) {
            this._historico.shift()
        }

        this._historico.push({
            tipo: 'Transferência Enviada',
            destinatario: destino.usuario,
            valor: valor,
            data: new Date()
        })

        // historico de quem está recebendo 
        destino._historico.push({
            tipo: 'Transferência recebida',
            de: this.usuario,
            valor: valor,
            data: new Date()
        })
    }




}

const usuario = new ContaBancaria('Pedro', 0); // instancia da classe , criando um OBJETO
const usuario2 = new ContaBancaria('Maria', 0);// instancia da classe , criando um OBJETO
const usuario3 = new ContaBancaria('Joao', 0);// instancia da classe , criando um OBJETO

let contasDoBanco = {
    "Maria": usuario2,
    "Joao": usuario3
}


function deposito() {
    const valor = Number(input.value) // pegando valor de input
    usuario.deposito(valor)  // chamando a função dentro da classe para fazer o depósito 
    saldo.innerText = `R$ ${usuario.saldo.toLocaleString('pt-BR')}` // atualizando o valor do saldo no html
    atualizarStatus() // status da conta 'conta zerada'
    usuario.atualizarHistorico() // atualizando o historico de transações , depósito / saque / transferência
    input.value = ''
}

function saque() {
    const valor = Number(input.value)// pegando valor de input
    usuario.sacar(valor)// chamando a função dentro da classe para fazer o Saque 
    saldo.innerText = `R$ ${usuario.saldo.toLocaleString('pt-BR')}` // atualizando o valor do saldo no html
    atualizarStatus() // chamando a função para atualizar o html -> 'conta zerada'
    usuario.atualizarHistorico() // atualizando o historico de transações , depósito / saque / transferência
    input.value = '' // limpando o valor do input
}

function atualizarStatus() { // status da conta 'conta zerada'
    if (usuario.saldo <= 0) {
        statusConta.style.display = 'block'
    } else {
        statusConta.style.display = 'none'
    }
}



function Transferencia() {
    const valor = Number(input.value) // pegando valor de input
    const select = document.querySelector('#select') // pegando valor do select

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




depositarButton.addEventListener('click', deposito)
sacarButton.addEventListener('click', saque)
transferirButton.addEventListener('click', Transferencia)
