import readline from "node:readline"

const rl = readline.createInterface({ // cria uma interface com entrada e saída de dados.
    input: process.stdin,
    output: process.stdout
})

function realizarOperacao(operacao, valor1, valor2) {
    switch(operacao) {
        case '1':
            return valor1 + valor2;
        case '2':
            return valor1 - valor2;
        case '3':
            return valor1 * valor2;
        case '4':
            return valor1 / valor2;
        default:
            return "Escolha inválida.";
    }
}

rl.question("Escolha uma operação:\n\n1. Adição (+)\n2. Subtração (-)\n3. Multiplicação (*)\n4. Divisão (/)\n", (operacao) => {
    rl.question("Digite o primeiro valor: ", (valor1) => {
        rl.question("Digite o segundo valor: ", (valor2) => {
            const resultado = realizarOperacao(operacao, parseFloat(valor1), parseFloat(valor2))
            console.log(`Resultado da operação: ${resultado}`)
            rl.close();
        })
    })
});