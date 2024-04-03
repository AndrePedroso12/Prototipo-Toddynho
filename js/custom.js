// Funções e eventos customizados do projeto.
$(function(){

    // Reseto a imagem do campo de Upload de arquivo
        $('#btn-limpar-upload-cupom').on('click', function(e) {
            e.preventDefault();
            $('#UploadCupom').val('');
            $('#UploadCupom').trigger('change');
            $('#UploadCupom-error').remove();
        });
    
    // Itens produto
        $('.itens-produto .item').on('click', function(e) {

            $('.itens-produto .item').removeClass('active');
            $(this).addClass('active');
        });

    // Exibir o voucher corretamente na página "Saiba como utilizar"
        var queryVoucher = getUrlVars()['voucher'];

        if(queryVoucher == 'americanas'){
            $('.voucher-promo').addClass('hide');
            $('#voucher-americanas').removeClass('hide');
        }
        // else if(queryVoucher == 'ifood'){
        //     $('.voucher-promo').addClass('hide');
        //     $('#voucher-ifood').removeClass('hide');
        // }
        else{
            $('.voucher-promo').addClass('hide');
        }

    // Atalhos Especiais
        $('input[type=text]').keydown(function(e){
            // Insere um CPF para teste = CTRL + SHIFT + SPACE
            if(e.ctrlKey  && e.shiftKey && e.keyCode == 32){
                $(this).val('280.654.730-08');
            }        
            // Insere um CNPJ para teste = CTRL + ALT + SPACE
            if(e.ctrlKey && e.altKey && e.keyCode == 32){
                $(this).val('79.377.182/0001-74');
            } 

            // Insere uma DATA para teste = CTRL + ALT + D
            if(e.ctrlKey && e.altKey && e.keyCode == 68){
                $(this).val('07/01/2003');
            }
        });

    // Categoria Premios Instantaneos
        $('.titulo-categoria').on('click', function(e) {
            e.preventDefault();

            var target = $(this).data('target');

            if($(target).is(':visible')){
                $(target).slideUp();
                $(this).removeClass('active');
            } else{
                $(this).removeClass('active');
                // $('.section#premios-instantaneos .categoria').addClass('hide');
                $(target).hide();
                $(target).removeClass('hide');
                $(target).slideDown();
                $(this).addClass('active');
            }
        });

    // Redireciona para o cadastro pincode
        var pincode = getUrlVars()['pincode'];
        if(pincode == 'true' || pincode == true){

            var idBloco = $('.section#home .pincode:visible').attr('id');

            scrollToSection('#home','animate',' #'+idBloco);

            $('.mascara-pincode').css({'display':'inherit'});
            $('.mascara-pincode').addClass('exibir');
            $('.pincode').addClass('pulsar');

            setTimeout(function(){
                $('.mascara-pincode').removeClass('exibir');
                $('.pincode').removeClass('pulsar');
                setTimeout(function(){
                    $('.mascara-pincode').css({'display':'none'});
                }, 50);
            }, 1500);
        }

    // Botão cadastrar código
        $('.btn-cadastrar-codigo').on('click', function(e) {
            e.preventDefault();
            closePopup();
            scrollToSection('#home','animate',' .pincode');

            $('.mascara-pincode').css({'display':'inherit'});
            $('.mascara-pincode').addClass('exibir');
            $('.pincode').addClass('pulsar');

            setTimeout(function(){
                $('.mascara-pincode').removeClass('exibir');
                $('.pincode').removeClass('pulsar');
                setTimeout(function(){
                    $('.mascara-pincode').css({'display':'none'});
                }, 50);
            }, 1500);
        });

    // Aceite do cookies
        $('#btn-aceitar-cookies').on('click', function(e) {
            e.preventDefault();
            $('.cookies').hide();
        });

    // Abre o popup de resgate de cada parceiro
        $('.categoria .parceiros .logo').on('click', function(e) {
            e.preventDefault();

            var logo = $(this).find('img').attr('src');
            var nome = $(this).find('span').text();
            var titulo = $(this).closest('.logo-parceiro').next('.voucher').find('.titulo').html();
            var descricao = $(this).closest('.logo-parceiro').next('.voucher').find('.descricao').html();

            $('#titulo-voucher').html(titulo);
            $('#descricao-voucher').html(descricao);

            if(logo == null || logo == ''){
                $('#imagem-voucher').hide();
                $('#nome-voucher').show();
                $('#nome-voucher').text(nome);
            } else{
                $('#nome-voucher').hide();
                $('#imagem-voucher').show();
                $('#imagem-voucher').attr('src',logo);
            }            

            openPopup('#voucher');
        });

    // Escolha da categoria de resgate

        $('input[name=CategoriaResgate]').click(function(e) {

            var id = $(this).attr('id');
            var queryResgate = getUrlVars()['resgate'];

            if(id == 'RbSabor'){
                $('#Leveza').addClass('hide');
                $('#Sabor').addClass('hide');

                $('#Sabor').hide();
                $('#Sabor').removeClass('hide');
                $('#Sabor').fadeIn();
            } 

            if(id == 'RbLeveza'){
                $('#Sabor').addClass('hide');
                $('#Leveza').addClass('hide');
                
                $('#Leveza').hide();
                $('#Leveza').removeClass('hide');
                $('#Leveza').fadeIn();
            }

            $('.categoria .premio').addClass('hide');

            if(queryResgate == '30'){
                $('.categoria .premio.premio-30').removeClass('hide');
            } else if(queryResgate == '50'){
                $('.categoria .premio.premio-50').removeClass('hide');
            } else if(queryResgate == '100'){
                $('.categoria .premio.premio-100').removeClass('hide');
            } else{
                alert('Não foi possível carregar os vouchers de resgate. Verifique a URL.');
            }
        });

    // Botão "+" para expandir as dúvidas
        $('.btn-collapse-faq a').click(function(e) {
            e.preventDefault();               

            var heightFaq = $('.section#duvidas #faq-perguntas').height();

            if( $('.btn-collapse-faq .plus').hasClass('hide') ){

                $('.section#duvidas #faq-geral').addClass('close-content');            

                $('.btn-collapse-faq .minus').addClass('hide') 
                $('.btn-collapse-faq .plus').removeClass('hide') 

            } else{

                $('.section#duvidas #faq-geral').animate({ height : heightFaq }, 1000, "easeInOutBack");

                $('.btn-collapse-faq .plus').addClass('hide') 
                $('.btn-collapse-faq .minus').removeClass('hide') 
                $('.section#duvidas #faq-geral').removeClass('close-content');
            }
        }); 

    // Calendário no Campo DataDaCompra
        try {
            $.datetimepicker.setLocale('pt-BR');
            $('#DataDaCompra').datetimepicker({
                // Bloqueia os domingos
                // beforeShowDay: function(date) {
                //     var day = date.getDay();
                //     return [(day != 0), ''];
                // },
                // Desabilita o horário
                timepicker:false,
                // Formata a data
                format:'d/m/Y',
                
            });
        } catch (ex) { }

    // Reseto a imagem do campo de Upload de arquivo
        $('#btn-limpar-cupom').on('click', function(e) {
            e.preventDefault();
            $('#Upload').val('');
            $('#Upload').trigger('change');
            $('#Upload-error').remove();
        });

    // Completa com "0" o campo CPF quanto tiver menos caracteres. Exemplo o documento CIC.
        $('[data-cpf-auto-fill]').on('focusout', function(){

            var digits = 11;
            var valueField = $(this).val();
                valueField = valueField.replace( /([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "" );
            var sizeString = digits;

            function zeroEsquerda(numero, comprimento) {
                numero = numero.toString();
                while (numero.length < comprimento)
                    numero = '0' + numero;
                return numero;
            }

            var valueFormated = zeroEsquerda(valueField,sizeString)
                valueFormated = valueFormated.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4'); // Máscara de CPF para o número formatado

            $(this).val(valueFormated);
        });

    // Inicializa os ícones e os steps do formulário CIRCLE
        var startStep = $('[data-form-step="#FormCadastroSteps"]').data('start-step');
        if($('.section.circle-steps .form-steps').length){
            configureStepCircle(startStep); 
        }       

        $(window).resize(function(){

            // Atualizado o CIRCLE progress no redimensionamento
                if($("#FormCadastroSteps").length){
                    var atualStep = $("#FormCadastroSteps").steps("getCurrentIndex");
                    if(atualStep != startStep){
                        configureStepCircle(atualStep); 
                    } else{
                        configureStepCircle(startStep);
                    }   
                }                        
        });

    // Quando o botão REMOVER da tabela de cupom é clicado.
        $(document).on('click', '.btn-remover-produto', function(e) {

            if($('#tabela-de-produtos tbody').children().length == 1){

                if(larguraTotal() > 999){
                    $('#tabela-de-produtos thead').hide();
                }

                resetTabelaProdutos();

                // Valida campo oculto sobre a quantidade de produtos da tabela.
                $('#ValidaProduto').val('');
                $('#ValidaProduto').show();
                $('#FormCupom').validate().element("#ValidaProduto");

                // Oculta e Zera o campo Total.
                valorAtual = 0;
                $('#valor-total-produtos span').html('-');
                $('#valor-total-produtos').hide();      


            } else{
                $('#tabela-de-produtos tbody tr.linha-nenhum-produto').remove();
                $(this).closest('tr').remove();   
                $('#valor-total-produtos span').html('R$ '+valorTabelaProdutos());         
            }

            if(quantidadeTabelaProdutos() >= 10){
                $('#nome-do-bebe-cupom').hide();
                $('#nome-do-bebe-cupom').removeClass('hide');
                $('#nome-do-bebe-cupom').fadeIn();
            } else{
                $('#nome-do-bebe-cupom').addClass('hide');
            }
        });

    // Quando o botão ADICIONAR do formulário de cupom é clicado.
        $('#btn-adicionar-produto').on('click', function(e) {

            // Variável do limite de itens permitidos por cupom.
                var limiteItens = 50;

            // Recebe os valores dos campos.
                var codigo = '';
                var nomeProduto = '';
                var imagem = $('#Produto option:selected').data('imagem');

                if($('#Codigo').is(':visible')){
                    nomeProduto = '';
                    codigo = $('#Codigo').val();
                }

                if($('#Produto').is(':visible')){
                    nomeProduto = $('#Produto').val();
                    codigo = $('#Produto option:selected').data('codigo');
                }

            // Recebe os valores dos campos.
                var quantidade = parseInt($('#Quantidade').val());
                var valor = $('#Valor').val();
                // var valorTotal = valorTotalProduto(valor, quantidade);
                
            // Se o campo VALOR não existir, configuramos o valor para zero '0'.
                if($('#Valor').length == 0){
                    valor = '0';
                }

            // Verifica se a quantidade está sem valor e altera para '0'.
                quantidade = quantidade || '0';

            // Verifica se os outros campos campos foram preenchidos
                if(codigo == null || codigo == '' || valor == null || valor == ''){
                    
                    // Popup: ALERT
                        openAlert('Ops!','É necessário informar todos os campos do produto antes de adicionar.','alert');

                } 

                else{

                    // Verifica se quantidade é '0' e exibe a mensagem de erro.
                        if(quantidade == '0'){
                            // Popup: ALERT
                            openAlert('Atenção','Você deve inserir a quantidade do produto antes de continuar.','alert');
                        
                        }
                    // Verifica se quantidade informada for maior que '0' e adiciona o item.
                        else{
                        
                        // Oculta o cabeçalho da tabela caso o acesso seja por computador.
                            if(larguraTotal() > 999){
                                $('#tabela-de-produtos thead').show();
                            }

                        // Remove a linha "Nenhum produto adicionado".
                            if($('#tabela-de-produtos tbody tr').hasClass('linha-nenhum-produto')){
                                $('#tabela-de-produtos tbody tr.linha-nenhum-produto').remove();
                            } 

                        // Valida campo oculto sobre a quantidade de produtos da tabela.
                            $('#ValidaProduto').val(' ');
                            $('#ValidaProduto').hide();
                            $('#FormCupom').validate().element("#ValidaProduto");

                            // if(nomeProduto != '_default'){ }
                        
                        // Seleciona a linha do item caso esteja na tabela.
                            var linhaProdutoExistente = $('#tabela-de-produtos tbody tr#codigo-'+codigo);

                        // Calcula a quantidade de itens cadastrados.
                            var quantidadeDeProdutos = ($('#tabela-de-produtos tbody tr').length)+1;            

                        // Verifica se o item já está na tabela.
                            if(linhaProdutoExistente.length){
                                $('#tabela-de-produtos tbody tr#codigo-'+codigo+' td.quantidade span').html(quantidade);
                                // $('#tabela-de-produtos tbody tr#codigo-'+codigo+' td.valor span').html(valor);
                                // $('#tabela-de-produtos tbody tr#codigo-'+codigo+' td.valor-total span').html(valorTotal);
                            }
                        // Insere o item na tabela.
                            else{

                            // Verifica se a quantidade de items está dentro do limite e insere na tabela.
                                if(quantidadeDeProdutos <= limiteItens){

                                    if($('#Valor').length == 0){

                                        // Verifico se o nome do produto está em branco
                                        if(nomeProduto == ''){
                                            var linhaProduto = '<tr id="codigo-'+codigo+'">' +
                                                                // '<td><div class="title-table-mobile">Imagem:</div><br class="mobile" /> <i class="icon-barcode2 icon-2x"></i> </td>' +
                                                                // '<td><div class="title-table-mobile">Imagem:</div><br class="mobile" /> <img src="'+imagem+'" class="img-produto" /> </td>' +
                                                                '<td><div class="title-table-mobile">Nome do produto:</div><br class="mobile" />'+nomeProduto+'</td>' +
                                                                '<td class="quantidade"><div class="title-table-mobile">Quantidade:</div><br class="mobile" /><span>'+quantidade+'</span></td>' +
                                                                '<td align="center">' +
                                                                    '<button type="button" class="btn btn-beegles btn-remover-produto">Excluir produto</button>' +
                                                                '</td>' +
                                                            '</tr>';   
                                        }
                                        // Verifico se o nome do produto está preenchido
                                        else{
                                            var linhaProduto = '<tr id="codigo-'+codigo+'">' +
                                                                // '<td><div class="title-table-mobile">Imagem:</div><br class="mobile" /> <i class="icon-barcode2 icon-2x"></i> </td>' +
                                                                // '<td><div class="title-table-mobile">Imagem:</div><br class="mobile" /> <img src="'+imagem+'" class="img-produto" /> </td>' +
                                                                '<td><div class="title-table-mobile">Código de barras do produto:</div><br class="mobile" />'+nomeProduto+' - '+codigo+'</td>' +
                                                                '<td class="quantidade"><div class="title-table-mobile">Quantidade:</div><br class="mobile" /><span>'+quantidade+'</span></td>' +
                                                                '<td align="center">' +
                                                                    '<button type="button" class="btn btn-beegles btn-remover-produto">Excluir produto</button>' +
                                                                '</td>' +
                                                            '</tr>'; 
                                        }

                                    } else{

                                        // Verifico se o nome do produto está em branco
                                        if(nomeProduto == ''){
                                            var linhaProduto = '<tr id="codigo-'+codigo+'">' +
                                                                // '<td><div class="title-table-mobile">Imagem:</div><br class="mobile" /> <i class="icon-barcode2 icon-2x"></i> </td>' +
                                                                // '<td><div class="title-table-mobile">Imagem:</div><br class="mobile" /> <img src="'+imagem+'" class="img-produto" /> </td>' +
                                                                '<td><div class="title-table-mobile">Nome do produto:</div><br class="mobile" />'+nomeProduto+'</td>' +
                                                                '<td class="quantidade"><div class="title-table-mobile">Quantidade:</div><br class="mobile" /><span>'+quantidade+'</span></td>' +
                                                                // '<td class="valor"><div class="title-table-mobile">Valor unitário:</div><br class="mobile" />R$ <span>'+valor+'</span></td>' +
                                                                // '<td class="valor-total"><div class="title-table-mobile">Valor total do item:</div><br class="mobile" />R$ <span>'+valorTotal+'</span></td>' +
                                                                '<td align="center">' +
                                                                    '<button type="button" class="btn btn-beegles btn-remover-produto">Remover</button>' +
                                                                '</td>' +
                                                            '</tr>';
                                        }
                                        // Verifico se o nome do produto está preenchido
                                        else{
                                            var linhaProduto = '<tr id="codigo-'+codigo+'">' +
                                                                // '<td><div class="title-table-mobile">Imagem:</div><br class="mobile" /> <i class="icon-barcode2 icon-2x"></i> </td>' +
                                                                // '<td><div class="title-table-mobile">Imagem:</div><br class="mobile" /> <img src="'+imagem+'" class="img-produto" /> </td>' +
                                                                '<td><div class="title-table-mobile">Nome do produto:</div><br class="mobile" />'+nomeProduto+'</td>' +
                                                                '<td class="quantidade"><div class="title-table-mobile">Quantidade:</div><br class="mobile" /><span>'+quantidade+'</span></td>' +
                                                                // '<td class="valor"><div class="title-table-mobile">Valor unitário:</div><br class="mobile" />R$ <span>'+valor+'</span></td>' +
                                                                // '<td class="valor-total"><div class="title-table-mobile">Valor total do item:</div><br class="mobile" />R$ <span>'+valorTotal+'</span></td>' +
                                                                '<td align="center">' +
                                                                    '<button type="button" class="btn btn-beegles btn-remover-produto">Remover</button>' +
                                                                '</td>' +
                                                            '</tr>';
                                        }
                                        
                                    }

                                    $('#tabela-de-produtos tbody').append(linhaProduto); 

                                    // $('#valor-total-produtos').fadeIn();

                                    if(larguraTotal() < 992){
                                        scrollToElement('#tabela-de-produtos');
                                    }

                                }
                            // Exibe o alerta porque a quantidade de itens na tabela já atingiu o limite.
                                else{
                                    // Popup: ALERT
                                        openAlert('Ops!','Você atingiu o número máximo de '+limiteItens+' itens adicionais conforme o regulamento.','alert');
                                }

                            }

                            // Atualiza o valor total na tela.
                                $('#valor-total-produtos span').html('R$ '+valorTabelaProdutos());

                            // Limpa os campos de adicionar produto
                                $('#Codigo, #Produto, #Quantidade, #Valor').val('');
                                $('#Codigo, #Produto').trigger('change');
                                $('.float-label label.float[for=Quantidade]').removeClass('show');
                                $('.float-label label.float[for=Valor]').removeClass('show');

                                if(quantidadeTabelaProdutos() >= 10){
                                    $('#nome-do-bebe-cupom').hide();
                                    $('#nome-do-bebe-cupom').removeClass('hide');
                                    $('#nome-do-bebe-cupom').fadeIn();
                                } else{
                                    $('#nome-do-bebe-cupom').addClass('hide');
                                }
                        }
                }
        });
});