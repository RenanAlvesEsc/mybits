/*
* Config da barra de navegacao
*/

let abrirMenu = () => {
    $(".nav__items").toggleClass("ativa");
}
$(".nav__menu-btn").on('click', function() {abrirMenu()})


/*
 * Config dos calculos do sensor 
*/

let valorSangramento = $('#valor-sangramento').val();

$('#enviar-valor-sensor').on('click', function() {
    valorSangramento = $('#valor-sangramento').val()
})


function porcentagemEnchimento(valorSangramento, dadoSensor) {
    return Math.floor((valorSangramento - dadoSensor)/valorSangramento * 100);
}
setInterval(function() {
    $.ajax({
            method: "GET",
            url: "https://api.thingspeak.com/channels/1910675/fields/2.json?api_key=HH8CKTZ3GAX6MHF4&results=2",
            success: function(request) {
                let valorSensor = request.feeds[1].field2;
                let percentual = porcentagemEnchimento(valorSangramento, valorSensor);
                console.log(
                    valorSangramento,
                    valorSensor,
                    percentual
                )
                $('.info__percent__value').html(percentual + "%")
                if (percentual > 85) {
                    $('.info__percent__alert').addClass('sangramento');
                } else if (percentual < 10){
                    $('.info__percent__alert').removeClass('sangramento');
                    $('.info__percent__alert').addClass('seca');
                }
                else {
                    $('.info__percent__alert').removeClass('seca');
                    $('.info__percent__alert').removeClass('sangramento');
                }
            },
            error: function(xhr) {
                console.log("Erro, não foi possivel parear com a chave" + xhr)
            }
    })}, 1000
)