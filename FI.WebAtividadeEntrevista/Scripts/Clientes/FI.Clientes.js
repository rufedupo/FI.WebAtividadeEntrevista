$(document).ready(function () {
    $("#CPF").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });
    $("#CEP").inputmask("mask", { "mask": "99.999-999" }, { reverse: true });
    $("#Telefone").inputmask("mask", { "mask": "(99) 9 9999-9999" }, { reverse: true });

    $("#CPFBeneficiario").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });

    $("#incluirBeneficiario").click(function (e) {
        var CPFBeneficiario = Unmask($("#CPFBeneficiario").val());
        var NomeBeneficiario = $("#NomeBeneficiario").val();
        urlBeneficiario = "/Beneficiario/AddBeneficiario";
        
        $.ajax({
            url: urlBeneficiario,
            method: "POST",
            data: {
                "NOME": NomeBeneficiario,
                "CPF": CPFBeneficiario
            },
            error:
                function (r) {
                    if (r.status == 400) {
                        var res = r.responseJSON.replace("\r\n", " | ");
                        ModalDialog("Ocorreu um erro", res);
                    } else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r);
                    $("#beneficiariosModal").modal('hide');
                },
        });
    });

    $('#formCadastro').submit(function (e) {
        var cpfStr = Unmask($(this).find("#CPF").val());
        var cepStr = Unmask($(this).find("#CEP").val());
        var telefoneStr = Unmask($(this).find("#Telefone").val());

        e.preventDefault();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CPF": cpfStr,
                "CEP": cepStr,
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": telefoneStr
            },
            error:
                function (r) {
                    if (r.status == 400) {
                        var res = r.responseJSON.replace("\r\n", " | ");
                        ModalDialog("Ocorreu um erro", res);
                    } else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                }
        });
    })
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function Unmask(str) {
    str = str.replace("(", "").replace(")", "").replace(" ", "").replace("-", "").replace(".", "").replace(".", "");
    return str;
}