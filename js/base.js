var ehRecarregar = false;
var popupAberto = [];

////// INÍCIO - Configurações //////
    $(function($){

        // Bloqueando copiar e colar no campo
            $('.block-paste').bind('copy paste cut',function(e) { 
                e.preventDefault(); //disable cut,copy,paste
            });

        // Permitir cookies
            $('.permitir-cookies').on('click', function(e){
                e.preventDefault();
                $('.cookies').addClass('ocultar');
            });

        // Troca de aba com pesquisa nas perguntas correspondentes
            $('.nav-link[data-search-target]').on('click', function(e){
                e.preventDefault();

                var target = $(this).data('search-target');
                var inputSearch = $(this).data('search-input');
                var jsonFile = $(target).data('load-faq');

                $(inputSearch).data('search-target', target);
                $(inputSearch).data('search-json', jsonFile);
                $(inputSearch).val('');
                $(inputSearch+'[data-search-target="'+target+'"]').trigger('keyup');

                $(target).animate({
                    scrollTop: 0
                }, 500);

                $(target+' .accordion-button').removeClass('on');
                $(target+' .accordion-content').slideUp(500);
            });

        // Campo de busca na parte de Dúvidas / FAQ
            $('[data-search-json]').on('keyup', delay(function (e) {
                var jsonFile = $(this).data('search-json');
                var target = $(this).data('search-target');
                var search = $(this).val();
                var expression = new RegExp(search, 'i');
                var loadingMessage = '<div class="loading">' +
                                        '<i class="icon-spinner9"></i> Pesquisando perguntas...' +
                                    '</div>';
                
                $(target).empty();
                $(target).append(loadingMessage);
                                
                $.getJSON(jsonFile, function(data) {
                    $.each(data, function(index, item){

                        var numero = item.numero;
                        var titulo = item.titulo;
                        var resposta = item.resposta;
                        var template =  '<div class="item-accordion">' +
                                            '<div class="accordion-button">' +
                                                // '<span>'+ numero +'</span> '+ titulo +
                                                titulo +
                                            '</div>' +
                                            '<div class="accordion-content">'+ resposta +'</div>' +
                                            '<div class="accordion-clear"></div>' +
                                        '</div>'

                        if (numero.search(expression) != -1 || titulo.search(expression) != -1 || resposta.search(expression) != -1){
                            $(target).append(template);
                        }
                    });   

                }).done(function() {
                    if($(target+' .loading').length){
                        $(target+' .loading').delay(500).fadeOut();    
                    }

                    if(!$(target+' .item-accordion').length){
                        setTimeout(function(){
                            $(target).append('<div class="no-results hide">Nenhum resultado encontrado.</div>');
                            $(target+" .no-results").hide();
                            $(target+" .no-results").removeClass('hide');
                            $(target+" .no-results").fadeIn(1000);
                        }, 500);
                    }

                    // Carregamento completo
                    loadAccordion(target);
                });
            }, 500));

        
        // Abre o menu MOBILE quando clica no botão "Menu".

            $('#btn-menu').on('click', function(e){
                e.preventDefault();
                
                var sidebar = $('#sidebar');
                
                if(sidebar.length > 0){
                    if(sidebar.hasClass('toggled')){
                        $('#sidebar, .main').removeClass('toggled');
                        $(this).addClass('is-active');
                    } else{
                        $('#sidebar, .main').addClass('toggled');
                        $(this).removeClass('is-active');
                    }
                } else{
                    if($('#menu').is(':visible')){
                        $(this).removeClass('is-active');
                    } else{
                        $(this).addClass('is-active');

                        if($('.header').hasClass('fixo')){
                            alturaHeader();
                        }
                    }
                }
            });

        // Clicando no corpo da página fecha o menu MOBILE se estiver aberto.
            $('.main, .footer, #login-float .conectado').click(function(){
                if($('#btn-menu').hasClass('is-active')){
                    $('#btn-menu').trigger('click');
                } else{
                    closeLogin();
                }
            });

        // Fechando o menu quando um link é clicado.
            $('#menu .nav-item a').on('click', function(e){

                if(larguraTotal() < 992){
                    if($('#btn-menu').is(':visible')){
                        $('#btn-menu').trigger('click');
                    }        
                }
            });

        // Essa função cancela o comportamento padrão do navegador de validação PATTERN nos inputs. 
            if ($('input').length > 0){
                document.querySelector('input').oninvalid = function(e){          
                    e.preventDefault();
                }; 
            };

        // Corrige o comando "includes()" no Internet Explorer
            String.prototype.includes = function (str) {
                var returnValue = false;

                if (this.indexOf(str) !== -1) {
                    returnValue = true;
                }

                return returnValue;
            }
            
        // Exibe ou oculta o login através de querystring.
            var queryLogin = getUrlVars()['login'];

            if(typeof queryLogin == 'undefined' || queryLogin == null || queryLogin == ''){
                queryLogin = 'off';
            }

            if(queryLogin.indexOf('conectado') > -1){
                logon();
            } else{
                var urlLinkAtual = getLinkPageName();
                if(urlLinkAtual.includes('cadastrar-cupom.html') || urlLinkAtual.includes('meus-numeros.html') || urlLinkAtual.includes('meus-dados.html')){
                    // window.location.href = "index.html";
                    logon();
                } else{
                    logoff();
                }
            };

        // Exibe um contador de data.
            try {
                $('[data-next-countdown]').each(function() {
                    var $this = $(this);
                    var dateCountdown = $this.data('next-countdown');
                    var fakeDate = $this.data('fake-date');
                    var formatDate = dateCountdown.split("/").reverse().join("/");
                    
                    if(fakeDate == false || fakeDate == null){
                        $this.countdown(formatDate, function(event) {
                            // $this.find('.semanas').html(event.strftime('%-W'));
                            // $this.find('.dias').html(event.strftime('%-d'));
                            $this.find('.dias').html(event.strftime('%-D'));
                            $this.find('.horas').html(event.strftime('%-H'));
                            $this.find('.minutos').html(event.strftime('%-M'));
                            $this.find('.segundos').html(event.strftime('%-S'));
                        });
                    } else if(fakeDate == true){

                        var addDays = $this.data('add-fake-days');
                        var dateFakeDays = moment().add(addDays, 'd').format('YYYY/MM/DD');

                        $this.countdown(dateFakeDays, function(event) {
                            // $this.find('.semanas').html(event.strftime('%-W'));
                            // $this.find('.dias').html(event.strftime('%-d'));
                            $this.find('.dias').html(event.strftime('%-D'));
                            $this.find('.horas').html(event.strftime('%-H'));
                            $this.find('.minutos').html(event.strftime('%-M'));
                            $this.find('.segundos').html(event.strftime('%-S'));
                        });
                    }
                });
            } catch (ex) { }
            // } catch (err) {
                // console.log('[ERRO] Countdown: '+err.message);
            // }
        
        // Efetua o LOGOFF quando clicado.
            $('[data-toggle=logoff]').on('click', function(e){
                var urlLinkAtual = getLinkPageName();

                if(urlLinkAtual.includes('cadastrar-cupom.html') || urlLinkAtual.includes('meus-numeros.html') || urlLinkAtual.includes('meus-dados.html')){
                    window.location.href = "index.html";
                } else{
                    logoff();
                }
                
                closePopup();
            });

        // Exibe o formulário de esqueci minha senha.
            $('.link-esqueci-minha-senha').on('click', function(e){
                e.preventDefault();
                $('.form-login').addClass('hide');
                $('.form-esqueci-minha-senha').hide();
                $('.form-esqueci-minha-senha').removeClass('hide');
                $('.form-esqueci-minha-senha').fadeIn();        
            });

        // Exibe o formulário de login.
            $('.link-voltar-para-o-login').on('click', function(e){
                e.preventDefault();
                $('.form-esqueci-minha-senha').addClass('hide');
                $('.form-login').hide();
                $('.form-login').removeClass('hide');
                $('.form-login').fadeIn();        
            });
        

        // Carrega a barra de rolagem personalizada.
            try {
                $('.scrollbar-outer').scrollbar();    
            } catch (ex) { }

        // Rolagem até a section escolhida.
            $('[data-scroll-section]').on('click', function(e){
                e.preventDefault();

                closeLogin();
                closePopup();

                if(larguraTotal() < 992){
                    if($('#btn-menu').hasClass('is-active')){
                        $('#btn-menu').trigger('click');                        
                    }
                }

                var section = $(this).data('scroll-section');
                scrollToSection(section, 'animate');
            });

        // Exibe os camppos de endereço após o preenchimento completo do CEP.
            $('#Cep').on('keyup', function(e){
                var valor = $(this).val();

                if($(this).val().length == 9){

                    if($('.endereco-oculto').is(':hidden')){
                        $('.endereco-oculto').hide();
                        $('.endereco-oculto').removeClass('hide');
                        $('.endereco-oculto').fadeIn();
                    }
                } else{
                    $('.endereco-oculto').addClass('hide');
                }
            });

        // Abre o popup informado no atributo 'data-target'.
            $('[data-toggle=popup]').on('click', function(e){
                e.preventDefault();

                closeLogin();

                if($('#btn-menu').is(':visible')){
                    if($('#menu').hasClass('show')){
                        $('#btn-menu').trigger('click');            
                    }
                }
                var target = $(this).data('target');

                if(target == "#login"){
                    $('.form-esqueci-minha-senha').addClass('hide');
                    $('.form-login').hide();
                    $('.form-login').removeClass('hide');
                    $('.form-login').fadeIn();        
                }

                closePopup();
                openPopup(target);
            });

        // Fecha todos os popups que estiverem abertos.
            $('[data-toggle=close-popup]').on('click', function(e){
                e.preventDefault();

                closePopup();
            });

        // Extende o evento do click para outro elemento.
            $('[data-trigger-click]').on('click', function(e){
                e.preventDefault();

                var target = $(this).data('trigger-click');
                $(target).trigger('click');                
            });    

        // Carrega arquivo de texto no carregamento do site.
            try {
                $('[data-load-txt]').each(function(e){

                    var file = $(this).data('load-txt');
                    var target = $(this).data('target');

                    $(target+' .loading').fadeIn(); 
                    
                    $(target+' .texto').empty();

                    $.ajax({
                        type : "GET",
                        url : file,
                        contentType: "charset=utf-8", 
                        dataType: "html",
                        success : function (data) {
                            $(target+' .texto').append(data);
                        },
                        complete: function(){
                            if($(target+' .loading').length){
                                $(target+' .loading').delay(500).fadeOut();    
                            }                
                        }
                    }); 
                });

            } catch (ex) { }

        // Carrega o arquivo de texto quando clicado.
            try {
                $('[data-load-txt-click]').on('click', function(e){

                    var file = $(this).data('load-txt-click');
                    var target = $(this).data('target');

                    $(target+' .loading').fadeIn();    

                    $(target+' .texto').empty();

                    $.ajax({
                        type : "GET",
                        url : file,
                        contentType: "charset=utf-8", 
                        dataType: "text",
                        success : function (data) {
                            $(target+' .texto').append(data);
                        },
                        complete: function(){
                            if($(target+' .loading').length){
                                $(target+' .loading').delay(500).fadeOut();    
                            }                
                        }
                    }); 
                });

            } catch (ex) { }
            
        // Carrega o Accordion que foi especificado.
            try {
                $('[data-load-accordion]').each(function(){

                    var target = $(this).data('load-accordion');

                    loadAccordion(target);

                });   
            } catch (ex) { }

        // Carrega arquivo de JSON no carregamento do site.
            try {
                $('[data-load-faq]').each(function(){

                    var file = $(this).data('load-faq');
                    var target = $(this).data('target');

                    $.getJSON(file, function(data){

                        $.each(data, function(index, item) {

                           var numero = item.numero;
                           var titulo = item.titulo;
                           var resposta = item.resposta;

                            $(target).append(
                                "<div class='item-accordion'>" +
                                    "<div class='accordion-button'>" +
                                        // "<span>"+ numero +"</span> "+ titulo +
                                        titulo +
                                    "</div>" +
                                    "<div class='accordion-content'>"+ resposta +"</div>" +
                                    "<div class='accordion-clear'></div>" +
                                "</div>"
                            );
                        });
                    }).done(function() {
                        if($(target+' .loading').length){
                            $(target+' .loading').delay(500).fadeOut();    
                        }   
                        // Carregamento completo
                        loadAccordion(target);
                    }); 

                });   
            } catch (ex) { }

        // Habilita a ordenação nas tabelas.
            try {
                $('.table-sorter').tablesorter({
                    cssHeader: "th-header"
                });
            } catch (ex) { }
        
        // Filtra a tabela de ganhadores pelo Nome.
            try {
                $('[data-filter-letters] .th-header:first-of-type').trigger('click');                
            } catch (ex) { }

        // Filtro de Letras.
            try {
                $('.filtro .iniciais a').on('click', function(e){
                    e.preventDefault();

                    var elementFilter = '#'+$(this).parents('[data-filter-letters]').attr('id'); 

                    var activeletter = $(this).data('filter-letter');

                    if($(this).hasClass('disable')){
                        // 
                    } else if($(this).hasClass('active')){
                        $(this).removeClass('active');

                        $(elementFilter+' .filtro [data-search-letter]').val('');
                        $(elementFilter+' .filtro [data-search-letter]').trigger('keyup');
                        $(elementFilter+' .scroll.scroll-content').animate({ scrollTop: 0}, 500);
                    } else{
                        $(elementFilter+' .filtro .iniciais a').removeClass('active');
                        $(this).addClass('active');

                        $(elementFilter+' .filtro [data-search-letter]').val(activeletter);
                        $(elementFilter+' .filtro [data-search-letter]').trigger('keyup');
                        $(elementFilter+' .scroll.scroll-content').animate({ scrollTop: 0}, 500);
                    }
                });
            } catch (ex) { }

            // Ao digitar a primeira inicial do nome, exibe as linhas da tabela com os resultados.
                try {
                    $('[data-search-letter]').on("keyup", function() {
                        var value = $(this).val();

                        var elementFilter = '#'+$(this).parents('[data-filter-letters]').attr('id'); 

                        $(elementFilter+' table tbody tr').each(function(index) {
                            $row = $(this);

                            var id = $row.find('td .filter-result').text();

                            // Se o resultado não foi encontrado, oculta as linhas correspondentes.
                            if (id.indexOf(value) !== 0) {
                                $row.hide();
                            }
                            // Se o resultado foi encontrado, exibe as linhas correspondentes.
                            else {
                                $row.fadeIn();
                            }

                            // Adiciona animação na exibição dos resultados.
                            $(this).addClass('animated fadeInLeft');
                        });
                    });
                } catch (ex) { }
                

            // Função que habilita apenas as iniciais dos nomes que estão presentes na tabela.
                var firstLetters = function (letter, elementId) {
                    for (var i = 0; i < letter.length; i += 1) {
                        var selectedLetter = letter[i].charAt(0);

                        $(elementId+' [data-filter-letter="'+selectedLetter+'"]').removeClass('disable');
                        $(elementId+' [data-filter-letter="'+selectedLetter+'"]').addClass('enable');
                    }
                }

            // Cria uma lista com os primeiros nomes da tabela.
                try {
                    $('[data-filter-letters]').each(function(){
                        var elementFilter = '#'+$(this).attr('id'); 

                        var arrayListNames = $(elementFilter+' table tbody').children().map(function () {
                            var children = $(this).children();

                            var value = children.eq(0).find('.filter-result').text().split(' ');
                            return value[0];
                        }).get();

                        firstLetters(arrayListNames, elementFilter);  
                    });
                } catch (ex) { }

        // Upload de Imagem
            $('input[type="file"]').on('change', function(){
                var typeAccept = $(this).attr('accept');

                if(typeAccept == 'image/*'){

                    try {
                        // Browser supports HTML5 multiple file?
                        var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
                            isIE = /msie/i.test( navigator.userAgent );


                        var $file = $(this).addClass('custom-file');
                        var $button = $(this).parent('.custom-file-container').find('.custom-file-upload');
                        var $input = $(this).parent('.custom-file-container').find('.custom-file-filename');
                        var files = [], fileArr, filename;
                        var preview = $(this).parent('.custom-file-container').find('.upload-preview');

                        // If multiple is supported then extract
                        // all filenames from the file array
                        if ( multipleSupport ) {
                            fileArr = $file[0].files;
                            for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                                files.push( fileArr[i].name );
                            }
                            filename = files.join(', ');
                        // If not supported then just take the value
                        // and remove the path to just show the filename
                        } else {
                            filename = $file.val().split('\\').pop();
                        }

                        if(filename == null || filename == ''){
                            filename = $file.data('message-no-file');
                            $input.html( filename ) // Set the value
                              .attr('title', filename) // Show filename in title tootlip
                              .focus(); // Regain focus
                            $(preview).css({'background':'#ffffff'});
                            $(preview).removeClass('img-preview');
                            $('form').validate().element(this);
                            $('#Upload-error').remove();          
                            $('#UploadCupom-error').remove();          

                            $('.custom-file-check').addClass('hide');                            
                        } else{
                            $input.html( filename ) // Set the value
                              .attr('title', filename) // Show filename in title tootlip
                              .focus(); // Regain focus

                            $('.custom-file-check').removeClass('hide');

                            $(preview).addClass('img-preview');
                            $(preview).css({ 'background' : 'url('+window.URL.createObjectURL(this.files[0])+') top center #ffffff', 'background-size' : 'cover',  });
                            $('#Upload-error').remove(); 
                            $('#UploadCupom-error').remove();          
                        }
                    } catch (ex) { }
                    // } catch (err) {
                        // console.log('[ERRO] Upload imagem: '+err.message);
                    // }
                    
                }
                
            });

        // Exibe o campo senha em formato de texto
            $('.olho-senha').on('click', function(e){
                e.preventDefault();
                
                var target = $(this).data('target');
                var tipoCampo = $(target).attr('type');

                if (tipoCampo == "password") {
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('icon-eye-blocked');

                    $(target).attr('type','text');
                } else{
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('icon-eye');

                    $(target).attr('type','password');
                }
            });

    });

// Executa comandos na rolagem da página.
    $(window).scroll('scroll', function () {
        // Active o link do menu correpondente e faz o tracking.
            var scrollTop = $(this).scrollTop();
            var adjustTop = $(window).height()/3;
            menuActive(scrollTop, adjustTop);

        // Fixa o HEADER quando houver rolagem na página.
            try {
                alturaHeader();
            } catch (ex) { }

        // Fixa o Scroll Up Button quando houver rolagem na página.
            try {
                scrollUpButton();
            } catch (ex) { }

        // Efeito Parallax
            try {
                $('[data-enable-parallax="true"]').each(function(){
                    parallax(this);
                });    
            } catch (ex) { }
            
    });

// A pressionar a tecla ESC fecha todos os popups que estiverem abertos.
    $(document).on('keyup', function(e) {
        // Pressionando a tecla ESC, fechará todos os popups.
            if (e.key === "Escape") {
                if (ehRecarregar === true)
                    document.location.reload()
                else
                    closePopup();
            }
    });

// Executa comandos no carregamento da página.
    $(document).ready(function(){
        // Fixa o HEADER quando houver rolagem na página.
            try {
                alturaHeader();
            } catch (ex) { }
        
        // Habilita no campo CEP o preenchimento automático dos outros campos de endereço.
            try {
                $('#Cep').autocompleteAddress();
            } catch (ex) { }
    });

// Executa comandos quando o carregamento da página for concluído.
    $(window).on('load', function() {
        // Animação do carregamento inicial.
            try {
                preloader();
            } catch (ex) { }

        // Insere a posição correta do LOGIN de acordo com a altura do HEADER.
            $(window).resize();

        // Esconde a faixa de processamento da página quando o site for completamente carregado.
            $('.processing').fadeOut();

        // Direcina para section correspondente (Exemplo: #contato) quando inserida na url. Exemplo: http://www.link.com.br/#contato
            try {
                goToSection();
            } catch (ex) { }

        // Inicia o plugin de animação WOW.
            try {
                new WOW().init();
            } catch (ex) { }
    });

// Executa comandos quando a página é redimensionada.
    $(window).on('resize', function() {
        
    });

// Executa comandos quando alguma requisição AJAX for processada.
    $(document).ajaxStart(function () {
        // Exibe a faixa de processamento.
            $('.processing').fadeOut();
    }).ajaxStop(function () {
        // Esconde a faixa de processamento.
            $('.processing').delay(1000).fadeOut();
    });

////// FIM - Configurações //////    

////// INÍCIO - Funções gerais //////

    // Preloader - Animação no carregamento inicial.
        function preloader(){
            $('.preloader').css({'display':'table!important'});

            var timePreloader = $('.preloader').data('time-duration');

            if(timePreloader == null || timePreloader == ''){
                timePreloader = 1500;
            }
            
            setTimeout(function(){
                $('.preloader').fadeOut();
            }, timePreloader);    
        }

    // Efeito Parallax na rolagem.
        function parallax(elemento){
            var ws = $(window).scrollTop();
            var direction = $(elemento).data('direction');
            var img = $(elemento).data('img-parallax');

            $(elemento).each(function(e){
                var speed = $(this).data('speed');

                if(speed == null){
                    speed = '1.2';
                }

                if(direction == null){
                    direction = 'vertical';
                }

                if(direction == 'vertical'){
                    $(this).css({
                        'background-image': 'url('+img+')',
                        'transform': 'translate(0px, -' + ws / speed + 'px)'
                    });
                } else if(direction == 'horizontal'){
                    $(this).css({
                        'background-image': 'url('+img+')',
                        'transform': 'translate(-' + ws / speed + 'px, 0px)'
                    });
                }

            });
        }
        
    
    // Retorna a largura exata da barra de rolagem.
        function getScrollBarWidth(){
            if($(document).height() > $(window).height()){
                $('body').append('<div id="scrollbar-measure" style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>');
                fakeScrollBar = $('#scrollbar-measure');
                fakeScrollBar.append('<div style="height:100px;">&nbsp;</div>');
                var w1 = fakeScrollBar.find('div').innerWidth();
                fakeScrollBar.css('overflow-y', 'scroll');
                var w2 = $('#scrollbar-measure').find('div').html('html is required to init new width.').innerWidth();
                fakeScrollBar.remove();
                return (w1-w2);
            }
            return 0;
        };

    // Insere a querystring "?login=conectado" nos links do menu.
        function linksMenuConectado(){
            $('#menu .nav-item a, .footer .links-menu a').each(function(){

                var dataScroll = $(this).data('scroll-section');

                if(dataScroll == null || dataScroll == ''){
                    var href = $(this).attr('href');
                    var novoLink = href + '?login=conectado';

                    $(this).attr('href', novoLink);    
                }
                
            });
        }

    // Remove a querystring "?login=conectado" nos links do menu.
        function linksMenuDesconectado(){
            $('#menu .nav-item a, .footer .links-menu a').each(function(){

                var dataScroll = $(this).data('scroll-section');

                if(dataScroll == null || dataScroll == ''){
                    var href = $(this).attr('href');
                    var novoLink = href.replace('?login=conectado','');

                    $(this).attr('href', novoLink);
                }

            });
        }

    // Método que retorna o nome da página que está no link.
        function getLinkPageName(){
            var fullUrl = window.location.href;
            var hashtag = window.location.hash;
            var getPage = fullUrl.lastIndexOf('/');
            var actualPage = fullUrl.substring(getPage + 1)

            return actualPage;
        }

    // Verifica as querystrings na URL.
        function getUrlVars(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        };

    // Método que retorna a url completa.
        function getUrl(){
            var fullUrl = window.location.href;

            return fullUrl;
        }

    // Insere a section correspondente da página na url. Exemplo: http://www.link.com.br/#como-participar
        function changeUrl(page, url) {
            var urlAtual = getUrl();
            var queryStrings = '';
            var noQueryStrings = '';
            var hashtag = '';

            if(urlAtual.indexOf('?') > 0){
                if(urlAtual.indexOf('?') > 1){
                    queryStrings = urlAtual.substring(urlAtual.indexOf('?') + 1);
                    noQueryStrings = urlAtual.substring(0, urlAtual.indexOf('?'));
                    
                    if(urlAtual.indexOf('#')){
                        hashtag = urlAtual.substring(urlAtual.indexOf('#') + 0);

                        if(hashtag.indexOf('?') > 0){
                            hashtag = hashtag.substring(0, hashtag.indexOf('?'));
                        } 
                    } else{}

                    if(noQueryStrings.indexOf('#') > 0){
                        noQueryStrings = urlAtual.substring(0, urlAtual.indexOf('#'));
                    }

                    url = noQueryStrings + url + '?'+queryStrings;                    
                }
            } else{
                queryStrings = '-'
                noQueryStrings = '-'

                if(urlAtual.indexOf('#')){
                    hashtag = urlAtual.substring(urlAtual.indexOf('#') + 0);
                } else{
                    hashtag = '-';
                }
            }

            // console.log('URL atual: '+noQueryStrings+'\nHashtag: '+hashtag+'\nQuerystrings: '+queryStrings);

            if (typeof (history.pushState) != "undefined") {
                var obj = {Page: page, Url: url};
                history.replaceState(obj, obj.Page, obj.Url);
            } else {
                window.location.href = "home";
                // alert("Browser does not support HTML5.");
            }
        }

    // Insere a section correspondente da página na url quando estiver rolando a página. Exemplo: http://www.link.com.br/#como-participar
        var iScrollPos = 0;
        function tracking(sectionId, scrollTop, adjustTop){
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {

                var sectionPage = sectionId;
                var $section = $(sectionPage);
                var sectionTop = ($section.offset().top)-adjustTop;
                var pageName = $section.data('title-section');
                
                // Navegação Scroll Down
                var iCurScrollPos = $(this).scrollTop();            
                if (iCurScrollPos > iScrollPos) {
                    //Scrolling Down
                    
                    if(scrollTop > sectionTop && scrollTop < sectionTop + $section.height()){

                        if(typeof _gaq == 'undefined' || _gaq == null){
                            console.log('Section: '+pageName+' / ID: '+sectionId);  
                        } else{
                            _gaq.push(['_set','page',pageName]);
                            _gaq.push(['_trackPageview']);
                            console.log('Section: '+pageName+' / ID: '+sectionId);                
                        }
                    }
            
                }
        
                iScrollPos = iCurScrollPos;

                changeUrl(pageName, sectionPage);  
                
            }, 500));
        }

    // Exibe o popup WARNING
        function openAlert(title, descricao, tipo, icone, customClass){
            if(tipo == 'info'){
                $('.popup#alert .icone').show();  
                $('.popup#alert .icone').html('<i class="icon-info3 '+customClass+'"></i>');  
            } else if(tipo == 'alert'){
                $('.popup#alert .icone').show();  
                $('.popup#alert .icone').html('<i class="icon-warning2 '+customClass+'"></i>');   
            } else if(tipo == 'success'){
                $('.popup#alert .icone').show();  
                $('.popup#alert .icone').html('<i class="icon-check '+customClass+'"></i>');          
            } else if(tipo == 'icone'){
                $('.popup#alert .icone').show();  
                $('.popup#alert .icone').html('<i class="'+icone+' '+customClass+'"></i>');          
            } else if(tipo == 'image'){
                $('.popup#alert .icone').show();  
                $('.popup#alert .icone').html('<img src="'+icone+'" class="img-fluid '+customClass+'" />');          
            } else{
                $('.popup#alert .icone').hide();  
                $('.popup#alert .icone').html('<i class="icon-warning2"></i>');
            }

            $('.popup#alert .inner .titulo').html(title);
            $('.popup#alert .inner .descricao').html(descricao);
            openPopup("#alert");
        };

    // Executa a abertura do popup.
        function openPopup(element){
            popupAberto.push(element);
            $('.popup'+element).hide();
            $('.popup'+element).removeClass('hide');
            $('.popup'+element).fadeIn();   
            $('body').css({'overflow-y':'hidden'}); 
            $(window).resize();
        };

    // Executa o fechamento de todos os popups que estiverem abertos.
        function closePopup(element) {
            if (element == undefined) { element = popupAberto.pop(); }
            if (element == undefined) { element = '' }
            if (element == 'all') { element = ''; }
            
            $('body').css({ 'overflow-y': 'auto' })
            $('.popup' + element).fadeOut('fast');
        };

    // Retorna a largura total da tela sem a barra de rolagem.
        function larguraTotal(){
            var largura = $(window).width();
            var scrollWidth = getScrollBarWidth();
            var larguraTotal = (largura + scrollWidth);

            return larguraTotal;
        }

    // Fixa o HEADER quando houver rolagem na página.
        function alturaHeader(){
            var headerHeightInit = $('.header').height();

            if ($(this).scrollTop() > 0) {
                $('.header').addClass("fixo");
                $('body').css({'padding-top' : headerHeightInit+'px'});
            } else {
                $('.header').removeClass("fixo");
                $('body').css({'padding-top' : '0px'});
            }
        }

    // Fixa o Scroll Up Button quando houver rolagem na página.
        function scrollUpButton(){
            var homeHeight = $('.section#home').height();

            if ($(this).scrollTop() > (homeHeight / 2)) {
                $('.scroll-up').addClass('on');
                $('.float-contato').addClass('on');
            } else {
                $('.scroll-up').removeClass('on');
                $('.float-contato').removeClass('on');
            }
        }

    // Rola a página até a SECTION escolhida.
        function scrollToSection(section, animation, element, time){
            if (animation == null){
                animation = '';
            }

            if (element == null){
                element = '';
            }

            if (time == null){
                time = 1000;
            }

            if($('#btn-menu').is(':visible')){

                if($('.header').length > 0){
                    setTimeout(function(){
                        if(animation == ''){
                            $('html,body').scrollTop(($(section+element).offset().top)-($('.header').height()));
                        } else if(animation == 'animate'){
                            $('html,body').animate({scrollTop:($(section+element).offset().top)-($('.header').height())}, time, 'easeInOutExpo');    
                        } 
                    }, 500);    
                } else{
                    setTimeout(function(){
                        if(animation == ''){
                            $('html,body').scrollTop(($(section+element).offset().top));
                        } else if(animation == 'animate'){
                            $('html,body').animate({scrollTop:($(section+element).offset().top)}, time, 'easeInOutExpo');
                        }
                    }, 500);
                }
                
            } else{

                if($('.header').length > 0){
                    if(animation == ''){
                        setTimeout(function(){
                            $('html,body').scrollTop(($(section+element).offset().top)-($('.header').height()));
                        }, 200);
                    } else if(animation == 'animate'){
                        $('html,body').animate({scrollTop:($(section+element).offset().top)-($('.header').height())}, time, 'easeInOutExpo');    
                    }                    
                } else{
                    if(animation == ''){
                        setTimeout(function(){
                            $('html,body').scrollTop(($(section+element).offset().top));
                        }, 200);
                    } else if(animation == 'animate'){
                        $('html,body').animate({scrollTop:($(section+element).offset().top)}, time, 'easeInOutExpo');
                    }
                }
            }
        }

    // Pega a "#hashtag" da url após a barra (Exemplo: http://www.link.com/#regulamento), e rola a página até a SECTION correspondente.
        function goToSection(){
            var urlAtual = getUrl();
            var goToSection = urlAtual.substr(urlAtual.indexOf('#') + 0); ;
            var sectionId = '';

            if(goToSection.indexOf('?') > 0){
                sectionId = goToSection.substr(0, goToSection.indexOf('?'));                 
            } else{
                sectionId = goToSection; 
            }

            if($(sectionId).length){      
                scrollToSection(sectionId);
            } 
        };
    
    // Efetua o LOGON
        function logon(){
            $('[data-login="desconectado"]').addClass('hide');
            $('[data-login="conectado"]').hide();
            $('[data-login="conectado"]').removeClass('hide');  
            $('[data-login="conectado"]').fadeIn();

            if($('#login-float').length){
                $('[data-class-conectado]').each(function(){
                    $(this).addClass('conectado');
                });
            }

            var tituloCadastro = $('.section#cadastro .header-section .title:not(.hide)').html();
            $('.section#cadastro').attr('data-title-section', tituloCadastro);

            $('.header').addClass('logado');

            linksMenuConectado();
        }

    // Efetua o LOGOFF
        function logoff(){
            $('[data-login="conectado"]').addClass('hide');
            $('[data-login="desconectado"]').hide();
            $('[data-login="desconectado"]').removeClass('hide');  
            $('[data-login="desconectado"]').fadeIn();

            if($('#login-float').length){
                $('[data-class-conectado]').each(function(){
                    $(this).removeClass('conectado');
                });
                $('#login-float').removeClass('show');
            }

            var tituloCadastro = $('.section#cadastro .header-section .title:not(.hide)').html();
            $('.section#cadastro').attr('data-title-section', tituloCadastro);

            $('.header').removeClass('logado');

            linksMenuDesconectado();
        }

    // Fecha o Login.
        function closeLogin(){
            $('#login-float').collapse('hide');
        }

    // Abre o Login.
        function openLogin(){
            $('#login-float').collapse('show');
        }   

    // Adiciona a class="active" no link do menu quando estiver na SECTION correspondente.
        function menuActive(scrollTop, adjustTop){
            var scrollMode = false;
            var linkActive = '';
            var sectionId = '';
            
            $('.section:visible').each(function() {
                var topDistance = $(this).offset().top;

                if((topDistance-adjustTop) < scrollTop){

                    var target = $(this).attr('id');
                    var title = $(this).data('title-section');
                    
                    if($('#link-menu-'+target).length){
                        $('#menu .nav-item a').removeClass('active');
                        $('#link-menu-'+target).addClass('active');

                        linkActive = $('#link-menu-'+target+'.active'); 
                        sectionId = linkActive.data('scroll-section');
                    } else{
                        $('#menu .nav-item a').removeClass('active');
                        sectionId = '#'+$(this).attr('id');                        
                    }

                    if(typeof sectionId == 'undefined' || sectionId == '' || sectionId == null){
                        // 
                    } else{
                        tracking(sectionId, scrollTop, adjustTop);
                    }
                    
                };
            }); 
        }

    // Método pega um lista de strings e seleciona aleatoriamente uma. Exemplo: 'Amarelo|Roxo|Verde|Vermelho'.
        function random(string){
            var randomString = string.split('|');
            var random = randomString[Math.floor(Math.random() * randomString.length)];   

            return random;
        };

    // Reseta todos os campos do formulário.
        function resetForm(element){
            if(element == '#FormCupom'){
                $(element+' #ValidaProduto').val('');
                // resetTabelaProdutos();
            }

            $(element)[0].reset();
            $(element).validate().resetForm();
            $(element+' .float-label .float').removeClass('show');
            $(element+' .error-message label').remove();
        }

    // Mascarar um e-mail
        function emailMask(email) {
            var maskedId = "";
            var myemailId = email;
            var index = myemailId.lastIndexOf("@");
            var prefix = myemailId.substring(0, index);
            var postfix = myemailId.substring(index);

            var mask = prefix.split('').map(function(o, i) {
              if (i == 0 || i == 1 || i == 2) {
                return o;
              } else {
                return '*';
              }
            }).join('');

            maskedId = mask + postfix;

            return maskedId;
        }

    // Exibir validação dos steps em formato de Círculo
        function configureStepCircle(currentStep){
            
            if($('.circle-progress').length){
                var countFieldsetForm = $('#FormCadastroSteps fieldset').length;
                var valueCircleProgress = 1 / countFieldsetForm;

                var colorTrackDesktop = $('.circle-progress').data('color-track-desktop');
                var colorTrackMobile = $('.circle-progress').data('color-track-mobile');
                var colorFillDesktop = $('.circle-progress').data('color-fill-mobile');
                var colorFillMobile = $('.circle-progress').data('color-fill-mobile');
                var thicknessDesktop = $('.circle-progress').data('thickness-desktop');
                var thicknessMobile = $('.circle-progress').data('thickness-mobile');

                if(typeof colorTrackDesktop == 'undefined' || colorTrackDesktop == ''){
                    colorTrackDesktop = "rgba(0,0,0,0)";
                };

                if(typeof colorTrackMobile == 'undefined' || colorTrackMobile == ''){
                    colorTrackMobile = "rgba(0,0,0,0.1)";
                };

                if(typeof colorFillDesktop == 'undefined' || colorFillDesktop == ''){
                    colorFillDesktop = "#a1c903";
                };

                if(typeof colorFillMobile == 'undefined' || colorFillMobile == ''){
                    colorFillMobile = "#a1c903";
                };

                if(typeof thicknessDesktop == 'undefined' || thicknessDesktop == ''){
                    thicknessDesktop = 15;
                };

                if(typeof thicknessMobile == 'undefined' || thicknessMobile == ''){
                    thicknessMobile = 15;
                };

                $('.circle-progress').circleProgress({
                    arcCoef: 1,
                    size: 1000,
                    value: 0,
                    lineCap: 'round'
                });    

                // $('.icons-steps .icon').addClass('animating');

                if(larguraTotal() > 991){
                    $('.circle-progress').circleProgress({
                        arcCoef: 1,                    
                        startAngle: -1.55,
                        thickness: thicknessDesktop,
                        fill: {color: colorFillDesktop},
                        emptyFill: colorTrackDesktop
                    });
                } else{
                    $('.circle-progress').circleProgress({
                        arcCoef: 0.3,
                        startAngle: 1.55,
                        thickness: thicknessMobile,                    
                        fill: {color: colorFillMobile},
                        emptyFill: colorTrackMobile
                    });   
                }

                if(typeof currentStep == 'undefined' || currentStep == '' || currentStep == 0){

                    $('.icons-steps .icon').removeClass('active');

                    $('.icons-steps .icon[data-icons-step="0"]').addClass('active');
                    $('.circle-progress').circleProgress('value', valueCircleProgress);

                    setTimeout(function(){
                        $('.icons-steps .icon').removeClass('animating');
                    }, 1000);

                } else if(currentStep > 0){

                    $('.icons-steps .icon').removeClass('active');

                    $('.icons-steps .icon[data-icons-step="'+currentStep+'"]').addClass('active');
                    $('.circle-progress').circleProgress('value', valueCircleProgress * (currentStep+1));

                    setTimeout(function(){
                        $('.icons-steps .icon').removeClass('animating');
                    }, 1000);
                }
            }
                        
        }

    // Função de delay para o atraso de alguma requisição
        function delay(callback, ms) {
            var timer = 0;
            return function() {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                  callback.apply(context, args);
              }, ms || 0);
            };
        }

////// FIM - Funções gerais //////