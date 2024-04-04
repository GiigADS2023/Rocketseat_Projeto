/* Objeto JavaScript
const participante = {
    nome: "Diego Shell Fernandes",
    email: "diego.shell.f@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 10)
} */

// Array
let participantes = [
    {
        nome: "Diego Shell Fernandes",
        email: "diego.shell.f@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 10)
    },
    {
        nome: "Maria Silva",
        email: "maria.silva@example.com",
        dataInscricao: new Date(2024, 3, 1, 10, 30),
        dataCheckIn: new Date(2024, 3, 2, 15, 45)
    },
    {
        nome: "João Souza",
        email: "joao.souza@example.com",
        dataInscricao: new Date(2024, 3, 5, 14, 0),
        dataCheckIn: new Date(2024, 3, 6, 9, 20)
    },
    {
        nome: "Ana Oliveira",
        email: "ana.oliveira@example.com",
        dataInscricao: new Date(2024, 3, 10, 8, 45),
        dataCheckIn: new Date(2024, 3, 11, 12, 30)
    },
    {
        nome: "Pedro Santos",
        email: "pedro.santos@example.com",
        dataInscricao: new Date(2024, 3, 15, 17, 15),
        dataCheckIn: new Date(2024, 3, 16, 10, 5)
    },
    {
        nome: "Juliana Costa",
        email: "juliana.costa@example.com",
        dataInscricao: new Date(2024, 3, 20, 11, 30),
        dataCheckIn: new Date(2024, 3, 21, 14, 20)
    },
    {
        nome: "Lucas Pereira",
        email: "lucas.pereira@example.com",
        dataInscricao: new Date(2024, 3, 25, 9, 0),
        dataCheckIn: new Date(2024, 3, 26, 16, 10)
    },
    {
        nome: "Carla Martins",
        email: "carla.martins@example.com",
        dataInscricao: new Date(2024, 3, 30, 13, 45),
        dataCheckIn: new Date(2024, 4, 1, 8, 30)
    },
    {
        nome: "Fernando Oliveira",
        email: "fernando.oliveira@example.com",
        dataInscricao: new Date(2024, 4, 5, 18, 20),
        dataCheckIn: new Date(2024, 4, 6, 11, 15)
    },
    {
        nome: "Camila Lima",
        email: "camila.lima@example.com",
        dataInscricao: new Date(2024, 4, 10, 10, 10),
        dataCheckIn: new Date(2024, 4, 11, 14, 40)
    }
];

const criarNovoParticipante = (participante) => {
    /*Essa linha de código usa a biblioteca day.js para mostrar há 
    quanto tempo ocorreu o check-in em relação ao momento atual. */
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    //Estrutura condicional
    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <!--Informação de quem é esse usuário que está fazendo check-in. Data = dado-->
            <button 
                data-email="${participante.email}"
                onclick="fazerCheckIn(event)"
            >
                Confirmar check-in
            </button>
        `
    }

    return `<tr> 
                <td>
                    <strong>${participante.nome}</strong>
                    <br>
                    <small>${participante.email}</small>
                </td> 
                <td>${dataInscricao}</td>
                <td>${dataCheckIn}</td>
            </tr>`;
}

//arrow function
const atualizarLista = (participantes) => {
    let output = ""
    //Estrutura de repetição - loop
    for (let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    // Substituir informação do HTML
    //querySelector - pesquisa por seletor, seletor através do nome da tag
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault() //Não enviar o formulário
    const dadosFormulario = new FormData(event.target)

    const participante = {
        nome: dadosFormulario.get('nome'),
        email: dadosFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    //Verificar se o participante existe
    const participanteExiste = participantes.find(
        (p) => {
            return p.email == participante.email
        }
    )

    if(participanteExiste) {
        alert("E-mail já cadastrado!")
        return
    }
                                   //... - Espalhar, ou seja, pegar os demais participantes
    participantes = [participante, ...participantes]
    atualizarLista(participantes)    

    // Limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    // Do formulário, pesquise no seletor o nome do edit email e esvaziar ele
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    // Confirmar se realmente quer o check-in
    const mensagemConfirmacao = confirm("Tem certeza que deseja fazer o check-in?")
    // alert(mensagemConfirmacao)  True ou False - Boolean
    if (confirm(mensagemConfirmacao) == false) {
        return 
    }
    // Encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    // Atualizar o check-in do participante
    participante.dataCheckIn = new Date()
    // Atualizar a lista de participante
    atualizarLista(participantes)
}