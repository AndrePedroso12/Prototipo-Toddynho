$(document).ready(function(){

	// Formulário de UPLOAD CUPOM
	var validator = $("#FormUploadCupom").validate({
		ignore: [],
		rules:{ 
			UploadCupom:{
				required: true,
				accept: "image/*"
			}
		},
		messages:{
			UploadCupom:{
				accept: "Só é permitido arquivos de imagens."
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {	
			// Fecha todos os popups que estiverem abertos.
				closePopup();

			// Reseto os campos do formulário.
				resetForm('#FormUploadCupom');

				$('#btn-limpar-upload-cupom').trigger('click');

			// Mensagem
				openAlert('Tudo certo!','Seu cupom fiscal foi enviado para uma nova análise.','icone', 'icon-check');	
        }		
	});

	// Formulário de CONSENTIMENTOS
	var validator = $("#FormConsentimentos").validate({
		ignore: [],
		rules:{ 
			
		},
		messages:{
			
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {	
			// Fecha todos os popups que estiverem abertos.
				closePopup();

			// Popup de sucesso
			openAlert('Tudo certo!','As informações foram atualizadas com sucesso!','success');
        }		
	});

	// Formulário de CUPOM
	var validator = $("#FormCupom").validate({
		ignore: [],
		rules:{ 
			Produto: {
			    valueNotEquals: ""
			},
			Pincode: {
			    required: true,
			    minlength: 8
			}
		},
		messages:{
			Produto: {
			    valueNotEquals: "Campo obrigatório."
			},
			Pincode: {
			    required: "Campo obrigatório.",
			    minlength: "O código deve conter 8 caracteres"
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
			if(element.attr('type') == 'radio'){
				error.appendTo( element.parents('.options-radio').find('.error-message') );
			}
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {		

			$('#sucesso-cupom-premio .premios').addClass('hide');
			
			var premio = random('#premio-100');	

			$(premio).removeClass('hide');

			openPopup(random('#sucesso-cupom|#sucesso-cupom-premio|#sucesso-cupom-premio'));

			// Reseta o formulário
			resetForm('#FormCupom');
        }		
	});

	// Formulário de LOGIN
	var validator = $("#FormNovaSenha").validate({
		ignore: [],
		rules:{ 
			Senha: {
			    required: true,
			    senhaVisual: true
			},
			ConfirmacaoNovaSenha: {
				required: true,
				equalTo: "#Senha"
			}
		},
		messages:{
			Senha: {
			    required: "Campo obrigatório.",
			    minlength: "A senha não pode ter menos que 6 caracteres."
			},
			ConfirmacaoNovaSenha:{
				required: "Campo obrigatório.",
				equalTo: "As senhas não correspondem."
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {	
			// Fecha todos os popups que estiverem abertos.
				closePopup();

			// Reseto os campos do formulário.
				resetForm('#FormNovaSenha');

				$('#Senha').attr('data-senha-vazio','true');

			// Mensagem de sucesso.
				openAlert('Tudo certo!','Sua senha foi redefinida com sucesso.','icone', 'icon-key');
        }		
	});

	// Formulário de LOGIN
	var validator = $("#FormLogin").validate({
		ignore: [],
		rules:{ 
			CpfLogin: {
			    required: true,
			    cpf: true
			},
			SenhaLogin: {
			    required: true
			}
		},
		messages:{
			CpfLogin: {
			    required: "Campo obrigatório.",
                cpf: "CPF inválido."
			},		
			SenhaLogin: {
			    required: "Campo obrigatório."
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {	
			// Fecha todos os popups que estiverem abertos.
				// closePopup();

			// Reseto os campos do formulário.
				// resetForm('#FormLogin');

			// Efetua o logon do usuário e exibe os conteúdos protegidos
				// logon();

			// Verifico se o popup de USUÁRIO existe
				if($('.popup#usuario').length){
					// Abre o popup de USUARIO
						// openPopup('#usuario');	
				}		

			window.location.href = "index.html?login=conectado";
        }		
	});

	// Formulário de ESQUECI MINHA SENHA
	var validator = $("#FormEsqueciMinhaSenha").validate({
		ignore: [],
		rules:{ 
			EmailEsqueciMinhaSenha: {
			    required: true,
			    email: true
			}
		},
		messages:{
			EmailEsqueciMinhaSenha: {
			    required: "Campo obrigatório.",
                email: "E-mail inválido."
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {		
			// Fecha todos os popups que estiverem abertos.
			closePopup();

			var email = emailMask($('#EmailEsqueciMinhaSenha').val());

			// Reseto os campos do formulário.
			resetForm('#FormEsqueciMinhaSenha');
			$('#FormEsqueciMinhaSenha')[0].reset();
			
			// Mensagem de sucesso.
			openAlert('Sua senha foi enviada <br class="desktop" /> com sucesso!','Você receberá no seguinte e-mail:<br /><br /><strong>'+email+'</strong><br /><br />Caso não a tenha recebido, confira sua caixa de SPAM.','icone', 'icon-key');
        }		
	});
		
	// Formulário de CADASTRO
	var validator = $("#FormCadastro").validate({
		ignore: [],
		rules:{ 
			Cpf: {
			    required: true,
			    cpf: true
			},
			Cnpj: {
			    required: true,
			    cnpj: true
			},
			Nome:{ 
				required: true,
				fullName: true
			},
			DataDeNascimento: {
			    required: true,
                dateBR: true,
                maiorIdade: 18,
                dateFuture: true
			},
			Sexo:{
				valueNotEquals: "" 
			},			
			Rg:{ 
				required: true
			},
			Cep:{
				required: true,
				postalcodeBR: true
			},
			Endereco:{
				required: true
			},
			Numero:{
			    required: true,
                digits: true
			},
			Bairro:{
				required: true
			},
			Cidade:{
				valueNotEquals: "" 
			},
			Estado:{
				valueNotEquals: "" 
			},
			Telefone1:{
			    required: true
			},
			Telefone2:{
			    notEqualTo: "#Telefone1"
			},
			Email: {
				required: true,
				email: true
			},
			ConfirmacaoDeEmail: {
				required: true,
				equalTo: "#Email"
			},
			SenhaAntiga: {
			    required: true,
			    minlength: 6
			},
			Senha: {
			    required: true,
			    minlength: 6
			},
			ConfirmacaoDeSenha: {
				required: true,
				equalTo: "#Senha"
			},
			Pergunta:{
				required: true
			},
			Upload:{
				required: true
			},
			AceiteRegulamento: {
			    required: true
			},
			AceitePolitica: {
			    required: true
			},
			Captcha:{
				required: true
			}
		},
		messages:{
			Cpf: {
			    required: "Campo obrigatório.",
                cpf: "CPF inválido."
			},
			Cnpj: {
			    required: "Campo obrigatório.",
                cnpj: "CNPJ inválido."
			},
			Nome:{ 
				required: "Campo obrigatório."
			},
			DataDeNascimento: {
			    required: "Campo obrigatório."
			},
			Sexo:{
				valueNotEquals: "Campo obrigatório."
			},
			Rg: {
				required: "Campo obrigatório."
			},
			Cep: {
				required: "Campo obrigatório.",
				postalcodeBR: "CEP inválido"
			},
			Endereco: {
				required: "Campo obrigatório."
			},
			Numero: {
			    required: "Campo obrigatório.",
                digits: "Campo obrigatório."
			},
			Bairro: {
				required: "Campo obrigatório."
			},
			Cidade: {
				valueNotEquals: "Obrigatório."
			},
			Estado: {
				valueNotEquals: "Obrigatório."
			},
			Telefone1: {
				required: "Campo obrigatório."
			},
			Telefone2:{
			    notEqualTo: "O telefone deve ser diferente do anterior."
			},
			Email: {
				required: "Campo obrigatório.",
				email: "É nessário digitar um e-mail válido."
			},
			ConfirmacaoDeEmail:{
				required: "Campo obrigatório.",
				equalTo: "O e-mail digitado não corresponde ao anterior."
			},
			SenhaAntiga: {
			    required: "Campo obrigatório.",
			    minlength: "A senha não pode ter menos que 6 caracteres."
			},		
			Senha: {
			    required: "Campo obrigatório.",
			    minlength: "A senha não pode ter menos que 6 caracteres."
			},
			ConfirmacaoDeSenha:{
				required: "Campo obrigatório.",
				equalTo: "As senhas não correspondem."
			},
			Pergunta: {
				required: "Campo obrigatório."
			},
			Upload:{
				required: "É necessário selecionar uma imagem."
			},
			AceiteRegulamento: {
				required: "Campo obrigatório."
			},
			AceitePolitica: {
				required: "Campo obrigatório."
			},
			Captcha: {
				required: "Campo obrigatório."
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
			if(element.attr('type') == 'radio'){
				error.appendTo( element.parents('.options-radio').find('.error-message') );
			}
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {		
			// Fecha todos os popups que estiverem abertos.
			closePopup();
			
			// Redireciono o submit para a "action" do form
			// $("#FormCadastro")[0].submit();

			// Reseto os campos do formulário.
			resetForm('#FormCadastro');

			// Reseto a imagem do campo de Upload de arquivo
			$('#Upload').val('');
			$('#Upload').trigger('change');
			$('#Upload-error').remove();

			// Popup de sucesso
			openPopup('#sucesso-cadastro');

			// Efetuo o logon do usuário
			logon();
        }		
	});

	// Formulário de CADASTRO
	var validator = $("#FormMeusDados").validate({
		ignore: [],
		rules:{ 
			Cpf: {
			    required: true,
			    cpf: true
			},
			Cnpj: {
			    required: true,
			    cnpj: true
			},
			Nome:{ 
				required: true,
				fullName: true
			},
			DataDeNascimento: {
			    required: true,
                dateBR: true,
                maiorIdade: 18,
                dateFuture: true
			},
			Sexo:{
				valueNotEquals: "" 
			},			
			Rg:{ 
				required: true
			},
			Cep:{
				required: true,
				postalcodeBR: true
			},
			Endereco:{
				required: true
			},
			Numero:{
			    required: true
			},
			Bairro:{
				required: true
			},
			Cidade:{
				required: true
			},
			Estado:{
				valueNotEquals: "" 
			},
			Telefone1:{
			    required: true
			},
			Email: {
				required: true,
				email: true
			},
			ConfirmacaoDeEmail: {
				required: true,
				equalTo: "#Email"
			},
			SenhaAntiga: {
			    required: true,
			    minlength: 6
			},
			Senha: {
			    required: true,
			    senhaVisual: true
			},
			ConfirmacaoDeSenha: {
				required: true,
				equalTo: "#Senha"
			},
			Pergunta:{
				required: true
			},
			Upload:{
				required: true
			},
			AceiteRegulamento: {
			    required: true
			},
			AceitePoliticaMeusDados: {
			    required: true
			},
			AceitePrivacidade: {
			    required: true
			}
		},
		messages:{
			Cpf: {
			    required: "Campo obrigatório.",
                cpf: "CPF inválido."
			},
			Cnpj: {
			    required: "Campo obrigatório.",
                cnpj: "CNPJ inválido."
			},
			Nome:{ 
				required: "Campo obrigatório."
			},
			DataDeNascimento: {
			    required: "Campo obrigatório."
			},
			Sexo:{
				valueNotEquals: "Campo obrigatório."
			},
			Rg: {
				required: "Campo obrigatório."
			},
			Cep: {
				required: "Campo obrigatório.",
				postalcodeBR: "CEP inválido"
			},
			Endereco: {
				required: "Campo obrigatório."
			},
			Numero: {
			    required: "Campo obrigatório."
			},
			Bairro: {
				required: "Campo obrigatório."
			},
			Cidade: {
				required: "Campo obrigatório."
			},
			Estado: {
				valueNotEquals: "Obrigatório."
			},
			Telefone1: {
				required: "Campo obrigatório."
			},
			Email: {
				required: "Campo obrigatório.",
				email: "É nessário digitar um e-mail válido."
			},
			ConfirmacaoDeEmail:{
				required: "Campo obrigatório.",
				equalTo: "O e-mail digitado não corresponde ao anterior."
			},
			SenhaAntiga: {
			    required: "Campo obrigatório.",
			    minlength: "A senha não pode ter menos que 6 caracteres."
			},		
			Senha: {
			    required: "Campo obrigatório."
			},
			ConfirmacaoDeSenha:{
				required: "Campo obrigatório.",
				equalTo: "As senhas não correspondem."
			},
			Pergunta: {
				required: "Campo obrigatório."
			},
			Upload:{
				required: "É necessário selecionar uma imagem."
			},
			AceiteRegulamento: {
				required: "Campo obrigatório."
			},
			AceitePoliticaMeusDados: {
				required: "Campo obrigatório."
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
			if(element.attr('type') == 'radio'){
				error.appendTo( element.parents('.options-radio').find('.error-message') );
			}
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {		
			// Fecha todos os popups que estiverem abertos.
			closePopup();
			
			// Redireciono o submit para a "action" do form
			// $("#FormMeusDados")[0].submit();

			// Reseto os campos do formulário.
			resetForm('#FormMeusDados');

			$('#Senha').attr('data-senha-vazio','true');

			// Popup de sucesso
			openAlert('Tudo certo!','Seu cadastro foi atualizado com sucesso!','success');

        }		
	});

	// Formulário de CONTATO
	var validator = $("#FormContato").validate({
		ignore: [],
		rules:{ 
			NomeContato:{ 
				required: true,
				fullName: true
			},
			CpfContato: {
				required: true,
				cpf: true
			},
			EmailContato: {
				required: true,
				email: true
			},
			TelefoneContato: {
			    required: true,
			    telefone: "GERAL"
			},
			DataDeNascimentoContato: {
			    required: true,
                dateBR: true,
                maiorIdade: 13,
                dateFuture: true
			},
			AssuntoContato: {
			    required: true
			},
			MensagemContato: {
			    required: true
			},
			AceitePoliticaContato: {
				required: true
			}
		},
		messages:{
			NomeContato: {
			    required: "Campo obrigatório."
			},
			CpfContato: {
				required: "Campo obrigatório.",
				cpf: "CPF inválido."
			},
			EmailContato: {
				required: "Campo obrigatório.",
				email: "É nessário digitar um e-mail válido."
			},
			TelefoneContato: {
			    required: "Campo obrigatório.",
				telefone: "Telefone inválido."
			},
			DataDeNascimentoContato: {
			    required: "Campo obrigatório.",
			    maiorIdade: "Promoção válida a partir de {0} anos"
			},
			AssuntoContato: {
			    required: "Campo obrigatório."
			},
			MensagemContato: {
			    required: "Campo obrigatório."
			},
			AceitePoliticaContato: {
				required: "Campo obrigatório."
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();
	    },
		submitHandler: function(form) {		

			// Separamos apenas o primeiro nome do contato. 
			var nomeContato = '';
			var nomeCompleto = $('#NomeContato').val();
			
			if(nomeCompleto.indexOf(' ') > 0){
				nomeContato = nomeCompleto.substr(0, nomeCompleto.indexOf(' ')); 	
			} else{
				nomeContato = nomeCompleto;
			}			

			// Fecha todos os popups que estiverem abertos.
			closePopup();

			// Reseto os campos do formulário.
			resetForm('#FormContato');

			// Mensagem de sucesso com o nome de contato.
			openAlert(nomeContato+', obrigado pelo contato!','Sua mensagem foi enviada para nossa equipe. <br /> Retornaremos o contato em tempo hábil para <br class="desktop" />participação na promoção.','icone', 'icon-envelop');
        }		
	});

	// Formulário de CADASTRO STEPS
	var idFormStep = $('[data-form-step]').data('form-step');
	var indexStep = $('[data-form-step="'+idFormStep+'"]').data('start-step');
	var formSteps = $(idFormStep).show();
	formSteps.steps({
        headerTag: "h4",
        bodyTag: "fieldset",
        transitionEffect: "none",
        titleTemplate: '<span class="number">#index#</span>',
        startIndex: indexStep,
        labels: {
	        cancel: "Cancelar",
	        current: "Etapa atual:",
	        pagination: "Página",
	        finish: "<div class='btn-finish'><span class='finish'>Finalizar</span></div>",
	        next: "<div class='btn-next'><i class='icon-arrow-right32'></i></div>",
	        previous: "<div class='btn-previous'><i class='icon-arrow-left32'></i></div>",
	        loading: "Carregando ..."
	    },
        onStepChanging: function (event, currentIndex, newIndex)
        {	
        	// Corrigindo o duplo click
		    $(idFormStep+' .actions').append('<div class="block-steps-form" style="position:absolute; top:0; left:0; width:100%; height:100%;"></div>');

            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex)
            {
            	formSteps.find(".body:eq(" + newIndex + ") label.error").show();
                scrollToSection('#home',' .form-content-steps');
                // scrollToSection('#home');
                return true;
            }
            
            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex)
            {
                // To remove error styles
                formSteps.find(".body:eq(" + currentIndex + ") label.error").show();
                scrollToSection('#home',' .form-content-steps');
                // scrollToSection('#home');
            }
            formSteps.validate().settings.ignore = ":disabled,:hidden";
            
            // formSteps.validate();
            return formSteps.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex)
        {
            configureStepCircle(currentIndex);

	        // Corrigindo o duplo click
	        $(idFormStep+' .block-steps-form').remove();
        },
        onFinishing: function (event, currentIndex)
        {
            formSteps.validate().settings.ignore = ":disabled,:hidden";
            // formSteps.validate();
            return formSteps.valid();
        },
        onFinished: function (event, currentIndex)
        {
            // Fecha todos os popups que estiverem abertos.
			closePopup();
			
			// Redireciono o submit para a "action" do form
			// $("#FormCadastro")[0].submit();

			// Reseto os campos do formulário.
			resetForm(idFormStep);

			// Reseto a imagem do campo de Upload de arquivo
			$('#Upload').val('');
			$('#Upload').trigger('change');
			$('#Upload-error').remove();

			// Popup de sucesso
			openPopup('#sucesso-cadastro');

			// Efetuo o logon do usuário
			logon();
        }
    }).validate({
        // errorPlacement: function errorPlacement(error, element) { element.before(error); },
        ignore: [],
		rules:{ 
			Cpf: {
			    required: true,
			    cpfBR: true
			},
			CpfResponsavel: {
				cpfBR: true
			},
			Cnpj: {
			    required: true,
			    cnpj: true
			},
			Nome:{ 
				required: true,
				fullName: true
			},
			Sobrenome:{ 
				required: true
			},
			DataDeNascimento: {
			    required: true,
                dateBR: true,
                maiorIdade: 13,
                dateFuture: true
			},
			DataDeNascimentoResponsavel: {
                dateBR: true,
                maiorIdade: 18,
                dateFuture: true
			},
			Sexo:{
				valueNotEquals: "" 
			},			
			Rg:{ 
				required: true
			},
			Cep:{
				required: true,
				postalcodeBR: true
			},
			Endereco:{
				required: true
			},
			Numero:{
			    required: true
			},
			Bairro:{
				required: true
			},
			Cidade:{
				required: true
			},
			Estado:{
				valueNotEquals: "" 
			},
			Telefone1:{
			    required: true,
			    telefone: "GERAL"
			},
			Telefone2:{
			    notEqualTo: "#Telefone1",
			    telefone: "GERAL"
			},
			Email: {
				required: true,
				validateEmail: true
			},
			ConfirmacaoDeEmail: {
				required: true,
				equalTo: "#Email"
			},
			EmailAlternativo: {
				required: false,
				email: true
			},
			SenhaAntiga: {
			    required: true,
			    minlength: 6
			},
			Senha: {
			    required: true,
			    senhaVisual: true
			},
			ConfirmacaoDeSenha: {
				required: true,
				equalTo: "#Senha"
			},
			Pergunta:{
				required: true
			},
			Upload:{
				required: true
			},
			AceiteRegulamento: {
			    required: true
			},
			AceitePolitica: {
			    required: true
			},
			Captcha:{
				required: true
			},
			ConfirmacaoDeEmailResponsavel:{
				equalTo: "#EmailResponsavel"
			}
		},
		messages:{
			Cpf: {
			    required: "Campo obrigatório.",
                cpfBR: "CPF inválido."
			},
			CpfResponsavel:{
                cpfBR: "CPF inválido."
			},
			Cnpj: {
			    required: "Campo obrigatório.",
                cnpj: "CNPJ inválido."
			},
			Nome:{ 
				required: "Campo obrigatório."
			},
			Sobrenome:{ 
				required: "Campo obrigatório."
			},
			DataDeNascimento: {
			    required: "Campo obrigatório.",
			    maiorIdade: "Promoção válida a partir de {0} anos"
			},
			DataDeNascimentoResponsavel: {
			    required: "Campo obrigatório.",
			    maiorIdade: "Promoção válida a partir de {0} anos"
			},
			Sexo:{
				valueNotEquals: "Campo obrigatório."
			},
			Rg: {
				required: "Campo obrigatório."
			},
			Cep: {
				required: "Campo obrigatório.",
				postalcodeBR: "CEP inválido"
			},
			Endereco: {
				required: "Campo obrigatório."
			},
			Numero: {
			    required: "Campo obrigatório."
			},
			Bairro: {
				required: "Campo obrigatório."
			},
			Cidade: {
				required: "Campo obrigatório."
			},
			Estado: {
				valueNotEquals: "Obrigatório."
			},
			Telefone1: {
				required: "Campo obrigatório.",
				telefone: "Telefone inválido."
			},
			Telefone2:{
			    notEqualTo: "O telefone deve ser diferente do anterior.",
				telefone: "Telefone inválido."
			},
			Email: {
				required: "Campo obrigatório.",
				validateEmail: "É nessário digitar um e-mail válido."
			},
			ConfirmacaoDeEmail:{
				required: "Campo obrigatório.",
				equalTo: "O e-mail digitado não corresponde ao anterior."
			},
			EmailAlternativo: {
				required: "Campo obrigatório.",
				email: "É nessário digitar um e-mail válido."
			},
			SenhaAntiga: {
			    required: "Campo obrigatório.",
			    minlength: "A senha não pode ter menos que 6 caracteres."
			},		
			Senha: {
			    required: "Campo obrigatório.",
			    minlength: "A senha não pode ter menos que 6 caracteres."
			},
			ConfirmacaoDeSenha:{
				required: "Campo obrigatório.",
				equalTo: "As senhas não correspondem."
			},
			Pergunta: {
				required: "Campo obrigatório."
			},
			Upload:{
				required: "É necessário selecionar uma imagem."
			},
			AceiteRegulamento: {
				required: "Campo obrigatório."
			},
			AceitePolitica: {
				required: "Campo obrigatório."
			},
			Captcha: {
				required: "Campo obrigatório."
			},
			ConfirmacaoDeEmailResponsavel:{
				equalTo: "O e-mail digitado não corresponde ao anterior."
			},
			PerguntaTemInstagram:{
				required: "Campo obrigatório."
			},
			PerfilDoInstagram:{
				required: "Campo obrigatório."
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find('.error-message'));
			if(element.attr('type') == 'radio'){
				error.appendTo( element.parents('.options-radio').find('.error-message') );
			}
		},
		success: function(label, element) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
			$(element).removeClass('error-input');
		},
		highlight: function(element, errorClass) {
			$(element).parent().find("." + errorClass).removeClass("checked");
			$(element).addClass('error-input');			
		},
		invalidHandler: function(form, validator) {
	        var errors = validator.numberOfInvalids();

	        // Corrigindo o duplo click
	        $(idFormStep+' .block-steps-form').remove();
	    }
    });

// Validação de senha customizada

    $('.validar-senha').on("keydown", function (e) {
        // Bloqueia o espaço do teclado
        if (e.keyCode == 32) return false; 

        // Bloqueia o ponto do teclado
        if (e.keyCode == 190) return false;       

        // Ajustando a validação errada no campo
        $(this).removeClass('valid'); 
    }); 

    //Processa senha
    $('.validar-senha').on("keyup", function () {
        ControleSenha(this);           
    });

    /* Metodos uteis */
    String.prototype.SomenteNumeros = function () {
        return this.replace(/[^0-9]/g, '');
    };

    String.prototype.SomenteTexto = function () {
        return this.replace(/[^a-zA-Z-Zà-úÀ-Ú ]/g, '');
    };

    String.prototype.SemCaracteresEspeciais = function () {
        var texto = "";
        for (var i = 0; i < this.length; i++) {
            if ("abcdefghijklmnopqrstuvwxyz 0123456789".indexOf(this[i].toLowerCase().SemAcentos()) != -1)
                texto += this[i];
        }
        return texto;
    };

    String.prototype.SemAcentos = function () {
        com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
        sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
        nova = '';
        for (i = 0; i < this.length; i++) {
            try {
                if (com_acento.search(this.substr(i, 1)) >= 0 && this.substr(i, 1) != '.') {
                    nova += sem_acento.substr(com_acento.search(this.substr(i, 1)), 1);
                }
                else {
                    nova += this.substr(i, 1);
                }

            } catch (e) {
                console.log(e);
                nova += this.substr(i, 1);
            }
        }
        return nova;
    };

    // Validação de Senha
    var ControleSenha = function (elemento) {
        var value = $(elemento).val();
        var texto = value.SemAcentos();
        var match = texto.match(/[a-zA-Z]/g);
        var letras = match != null ? texto.match(/[a-zA-Z]/g).length > 0 : false;
        var numeros = value.SomenteNumeros().length > 0;
        //var especiais = value.SemCaracteresEspeciais().length < value.length;
        var tamanho = value.length >= 8;

        $(elemento).attr("data-senha-vazio", value.trim().length <= 0 ? "true" : "false");

        $(elemento).attr("data-senha-letras", letras ? "true" : "false");
        $(elemento).attr("data-senha-numeros", numeros ? "true" : "false");
        //$(elemento).attr("data-senha-especiais", especiais ? "true" : "false");
        $(elemento).attr("data-senha-tamanho", tamanho ? "true" : "false");
        $(elemento).attr("data-senha-maiusculas", letras && texto.toLowerCase() != texto ? "true" : "false");
        $(elemento).attr("data-senha-minusculas", letras && texto.toUpperCase() != texto ? "true" : "false");
    }

    $.validator.addMethod("senhaVisual", function (value, element) {
        try {
            $(".field-validation-error").length > 0 ? $(".field-validation-error").remove() : "";


            var texto = value.SemAcentos();
            var letrasMaiusculas = texto.match(/[A-Z]/g).length > 0;
            var letrasMinusculas = texto.match(/[a-z]/g).length > 0;
            var numeros = value.SomenteNumeros().length > 0;
            var tamanho = value.length >= 8;
            // var especiais = false; //value.SemCaracteresEspeciais().length < value.length;

            ControleSenha(element);

            var combinacao = 0;
            combinacao += (letrasMaiusculas ? 1 : -1);
            combinacao += (letrasMinusculas ? 1 : -1);
            combinacao += (numeros ? 1 : -1);
            combinacao += (tamanho ? 1 : -1);
            // combinacao += (especiais ? 1 : -1);

            // return tamanho && combinacao >= 3;
            return combinacao >= 3;
        } catch (e) {
            return false;
        }
    }, "");
    
});