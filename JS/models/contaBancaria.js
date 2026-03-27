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
        if (isNaN(valor) || valor <= 0) {
            alert("Valor inválido. Digite um valor positivo.")
            return
        }
        if (typeof valor !== 'number') {
            return
        }

        this._saldo += valor

        // limitando as informações para não ser infinito 
        if (this._historico.length >= 3) {
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
        if (isNaN(valor) || valor <= 0) {
            alert("Valor inválido. Digite um valor positivo.")
            return
        }
        if (typeof valor !== 'number') {
            return
        }

        // verificação onde o valor não pode ser MAIOR que o saldo disponível 
        if (valor > this._saldo) {
            alert(`Saldo insuficiente...`)
            return
        }
        this._saldo -= valor // tira o valor(saque) do saldo 

        // limitando as informações para não ser infinito 
        if (this._historico.length >= 3) {
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
        let ul = document.querySelector('ul'); // Certifique-se que o seletor está correto
        if (!ul) return;
        ul.innerHTML = '';

        // Se não houver transações exibe a mensagem
        if (this._historico.length === 0) {
            ul.innerHTML = '<li style="color: #888; text-align: center; padding: 20px;">Nenhuma movimentação ainda.</li>';
            return;
        }

        // Percorrendo o histórico
        this._historico.forEach(element => {
            let newLi = document.createElement("li");
            newLi.style.display = "flex";
            newLi.style.justifyContent = "space-between";
            newLi.style.alignItems = "center";
            newLi.style.padding = "10px";
            newLi.style.borderBottom = "1px solid #eee";

            // Formatação de valores e cores
            const valorFormatado = element.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const isPositivo = element.tipo === 'Deposito' || element.tipo === 'Transferência recebida';
            const corValor = isPositivo ? '#28a745' : '#dc3545';
            const sinal = isPositivo ? '+' : '-';

            // Descrição 
            let descricao = element.tipo;
            if (element.tipo === 'Transferência Enviada') descricao = `Enviado para ${element.destinatario}`;
            if (element.tipo === 'Transferência recebida') descricao = `Recebido de ${element.de}`;

            const horario = element.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            newLi.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <span style="font-weight: bold; color: #505050;">${descricao}</span>
                <span style="font-size: 0.85em; color: #888;">${horario}</span>
            </div>
            <span style="font-weight: bold; color: ${corValor};">
                ${sinal} ${valorFormatado}
            </span>
        `;
            ul.append(newLi); // adicionando 
        });
    }

    transferir(valor, destino) {
        if (isNaN(valor) || valor <= 0) return
       

        // verificando se o destino foi criado a partir da classe ContaBancaria
        if (!(destino instanceof ContaBancaria)) {
            alert(`Destino inválido`)
            return
        }

        if (typeof valor !== 'number' || valor > this._saldo) {
            alert(`Saldo insuficiente...`)
            return
        }

        destino.deposito(valor) // chamando o método da classe / depositando valor do input para Destinatário -> Maria(usuario2)
        this._saldo -= valor // tirando o valor do saldo que foi feito a transferencia 


        // limitando as informações para não ser infinito 
        if (this._historico.length >= 3) {
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



