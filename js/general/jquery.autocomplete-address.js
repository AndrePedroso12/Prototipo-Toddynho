;(function ( $, window, document, undefined ) {
	var pluginName = "autocompleteAddress",
			defaults = {
			publicAPI: "https://viacep.com.br/ws/{{cep}}/json/",
			address: "",
			neighborhood: "",
			city: "",
			state: "",
			setReadonly: true,
	};

	// Construtor do plugin
	function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
	}

	$.extend(Plugin.prototype, {
			init: function () {
				self = this;
				$cep = $(this.element);
				$address = this.getData("autocomplete-address");
				$complement = this.getData("autocomplete-complement");
				$neighborhood = this.getData("autocomplete-neighborhood");
				$city = this.getData("autocomplete-city");
				$state = this.getData("autocomplete-state");
				currentCep = $cep.val();
				if($cep.mask){
					$cep.mask("99999-999");
				}
				$cep.on('blur change keyup', function() {
					var val = $cep.val();
					// Remove caracteres que o usuario normalmente digita no cep como - e .
					val = val.replace(/\-|\./g, "");
					if (val && currentCep !== val && val.length === 8) {
						currentCep = val;
						self.sendRequest();
					}
				});
			},
			getData: function(data){
				// sistema fallback para selecionar os campos

				// verifica se o campo foi especificado utilizando seletor na inicializacao
				var result = $(this.settings[data.replace("autocomplete-","")]);
				if(result.length === 0){
					// verifica se o input foi especificado utilizando classes
					result = $("."+data);
					if(result.length === 0){
						// verifica se foi especificado por data-attribute
						result = $("[data-" + data + "]");
					}
				}
				return result;
			},
			// envia o request ajax para a API
			sendRequest: function () {
				var cep = currentCep.replace('-', '');
				 $.ajax({
					url: this.settings.publicAPI.replace('{{cep}}', cep),
					type:"GET",
					dataType: "json",
					success: function(response){
						self.bindValues(response);
					},
					ajaxError: function(){
						$address.closest('.float-label').find('label.float').removeClass('show');
						$address.removeClass('disabled').removeAttr('readonly');
						$complement.closest('.float-label').find('label.float').removeClass('show');
						$complement.removeClass('disabled').removeAttr('readonly');
						$neighborhood.closest('.float-label').find('label.float').removeClass('show');
						$neighborhood.removeClass('disabled').removeAttr('readonly');
						$city.closest('.float-label').find('label.float').removeClass('show');
						$city.removeClass('disabled').removeAttr('readonly');
						$state.closest('.float-label').find('label.float').removeClass('show');
						$state.removeClass('disabled').removeAttr('readonly'); 
					}
				});
			},
			// Envia a resposta para os respectivos campos
			bindValues: function(values){
				$address.val(values.logradouro);
				$complement.val(values.complemento);
				$neighborhood.val(values.bairro);
				$state.val(values.uf);

				if ($state.is('select')) {
					$state.children('option:contains("' + values.uf + '")').prop('selected', true);
					// integração com nice-select
					if ($state.next().hasClass('nice-select'))
						$state.niceSelect('update');
				} else {
					$state.val(values.uf);
				}
				$state.change();

				if ($city.is('select')) {
					$city.children('option:contains("' + values.localidade + '")').prop('selected', true);
					$city.data('select', values.localidade);
				} else {
					$city.val(values.localidade);
				}
				$city.change();

				if (this.settings.setReadonly)
					this.checkStatusField([$address, $neighborhood, $city, $state]);
			},
			checkStatusField: function(fields) {
				var i = fields.length,
					$field,
					val;
				while (i--) {
					$field = $(fields[i]);
					val = $field.val();

					// Ajuste Beegles
					if (fields[i].length > 0 && val && val.match(/[a-z]/i)){
						$('#FormCadastro, #FormCadastroSteps').validate().element($field);
						$field.closest('.float-label').find('label.float').addClass('show');
						$field.addClass('disabled').attr('readonly', 'readonly');

						if($field.is('select')){
							if($field.parents('.selectric-hide-select').length){
								$field.attr('disabled', 'disabled').selectric('refresh');	
							}							
						}
					} else{
						$('#FormCadastro, #FormCadastroSteps').validate().element($field);
						$field.closest('.float-label').find('label.float').removeClass('show');
						$field.removeClass('disabled').removeAttr('readonly');

						if($field.is('select')){
							if($field.parents('.selectric-hide-select').length){
								$field.removeAttr('disabled').selectric('refresh');							
							}
						}
					}
				}
			},
	});

	$.fn[ pluginName ] = function ( options ) {
			this.each(function() {
					if ( !$.data( this, "plugin_" + pluginName ) ) {
							$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
					}
			});
			return this;
	};
})( jQuery, window, document );