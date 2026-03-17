let input = document.querySelector('input')
let statusConta = document.querySelector('#status')
let depositarButton = document.querySelector('#depositar')
let sacarButton = document.querySelector('#sacar')
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



    deposito(valor) {
        if (typeof valor !== 'number' || valor <= 0) {
            return
        }
        this._saldo += valor
        this._historico.push(
            {
                tipo: 'Deposito',
                valor: valor,
                data: new Date()
            })

    }


    sacar(valor) {
        if (typeof valor !== 'number' || valor <= 0) {
            return
        }

        if (valor > this._saldo) {
            alert('saldo insuficiente')
            return
        }
        this._saldo -= valor
        this._historico.push(
            {
                tipo: 'Saque',
                valor: valor,
                data: new Date()
            })

    }


    atualizarTela() {
        let ul = document.querySelector('ul')
        ul.innerHTML = ''
        for (let i = 0; i < this._historico.length; i++) {
            const element = this._historico[i];
            let newLi = document.createElement("li")
            newLi.innerText = `${element.tipo} R$${element.valor} - horário: ${element.data.toLocaleTimeString('pt-BR')}`
            ul.append(newLi)
        }
    }




}

const usuario = new ContaBancaria('Pedro', 0);


function deposito() {
    const valor = Number(input.value)
    usuario.deposito(valor)
    saldo.innerText = `R$ ${usuario.saldo}`
    atualizarStatus()
    usuario.atualizarTela()
    input.value = ''
}


function saque() {
    const valor = Number(input.value)
    usuario.sacar(valor)
    saldo.innerText = `R$ ${usuario.saldo}`
    atualizarStatus()
    usuario.atualizarTela()
    input.value = ''
}

function atualizarStatus() {
    if (usuario.saldo <= 0) {
        statusConta.style.display = 'block'
    } else {
        statusConta.style.display = 'none'
    }



}



depositarButton.addEventListener('click', deposito)
sacarButton.addEventListener('click', saque)