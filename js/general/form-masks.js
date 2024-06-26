$(document).ready(function(){
	
	$('[data-mask="cupom"]').mask('99999-9999-99');	
	$('[data-mask="placa"]').mask('aaa-9999');	
	$('[data-mask="cep"]').mask('99999-999');
	$('[data-mask="telefone"]').mask('(99) 9999-99999');
	$('[data-mask="celular"]').mask('(99) 99999-9999');
	$('[data-mask="hora"]').mask('99:99');
	$('[data-mask="valor"]').mask('999.999.999.999.999,99', {reverse: true});
	$('[data-mask="quantidade"]').keyup(function () { 
		this.value = this.value.replace(/[^0-9\.]/g,'');
	});	

	if(larguraTotal() > 991){
		$('[data-mask="cpf"]').mask('999.999.999-99');
		$('[data-mask="cnpj"]').mask('99.999.999/9999-99');
		$('[data-mask="data"]').mask('99/99/9999');
		$('[data-mask="data-hora"]').mask('99/99/9999 às 99:99');
	} else{
		$('[data-mask="cpf"]').mask('999.999.999-99', {reverse: true});
		$('[data-mask="cnpj"]').mask('99.999.999/9999-99', {reverse: true});
		$('[data-mask="data"]').mask('99/99/9999', {reverse: true});
		$('[data-mask="data-hora"]').mask('99/99/9999 às 99:99', {reverse: true});
	}	

	$('[data-mask="numeros"]').on('keypress keyup blur paste', function(e){
		if (/\D/g.test(this.value))	{
			this.value = this.value.replace(/\D/g, '');
		}
    });

    $('.only-numbers').on('keypress keyup blur paste', function(e){
		if (/\D/g.test(this.value))	{
			this.value = this.value.replace(/\D/g, '');
		}
	});
	
    $('.only-letters').on('keypress keyup blur paste', function(e) {
        var regex = /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g;
        if (regex.test(this.value)) {
            this.value = this.value.replace(regex, '');
        }
    });
	
});