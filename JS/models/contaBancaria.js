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

        // MELHORAR O style do HISTÓRICO !! 

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



