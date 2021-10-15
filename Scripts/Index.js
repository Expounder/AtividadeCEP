const Lista = []

$(document).ready(function () {

    $("#cep").mask("00000-000");
});

$("#cep").keyup(function (e) {

    if ($("#cep").val().length > 8 && $("#cep").val().length < 10) {
        let cep = this.value


        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                response.json()
                    .then(data => showData(data))
            });
    }
    else {
        return;
    }
});

const showData = (result) => {

    var verifica = Lista.find(x => x.cep == result.cep)


    if (verifica == null && !result.erro) {

        Lista.push(result)
        $("#Template #Rua").html('')
        $("#Template #Rua").append("Rua: " + result.logradouro)

        $("#Template #Bairro").html('')
        $("#Template #Bairro").append("Bairro: " + result.bairro)

        $("#Template #Endereco").html('')
        $("#Template #Endereco").append("Endereco: " + result.logradouro + ", " + result.cep)

        $("#Template #Cep").html('')
        $("#Template #Cep").append("Cep: " + result.cep)

        $("#Template #Cidade").html('')
        $("#Template #Cidade").append("Cidade: " + result.localidade)

        $("#Template #Estado").html('')
        $("#Template #Estado").append("Estado: " + result.uf)

        $("#Resultado").append($("#Template").html())

        toastr.success("CEP incluso com sucesso ");
    }
    else {
        if (result.erro)
            toastr.error("CEP Inválido");
        else
            toastr.warning("CEP já pesquisado");
    }

}




