var frases = [];
var indiceEditar = 0;
$(document).ready(function () {

    var localSFrases = localStorage.getItem('frases');
  if(localFrases && localFrases.length > 0) {
        frases = JSON.parse(localSFrases);
        mostrarFrases();
    }

});




$('#form-frases').submit(function (event) {
    event.preventDefault();
    var datos = $(this).serializeArray();
    if (indiceEditar > -1) {
 frases[indiceEditar] = { 'titulo': datos[1].value, 'autor': datos[0].value, 'frase': datos[2].value }
 indiceEditar = -1;
    } else {
        frases.push({ 'titulo': datos[1].value, 'autor': datos[0].value, 'frase': datos[2].value });
     

    }
    localStorage.setItem('frases', JSON.stringify(frases));
    $('#lista-frases').html("");
    mostrarFrases();
    $(this).trigger("reset");
})

function mostrarFrases() {
    $.each(frases, function (i, value) {
        $('#lista-frases').append('<div class="card">' +
            '<div class="card-header">' +
            value['titulo'] +
            '</div>' +
            '<div class="card-body" required>' +
            '<blockquote class="blockquote mb-0">' +
            '<p>' + value['frase'] + '</p>' +
            '<footer class="blockquote-footer">' + value['autor'] + '<p></p>'+
            '<button class="btn btn-sm btn-success mr-2" onclick="editar(' + i + ')">Editar</button>'+
            '<button class="btn btn-sm btn-danger mr-2" onclick="eliminar(' + i + ')">Eliminar</button></footer>' +
            '</blockquote>' +
            '</div>' +
            '</div>'+
            '<p></p>');
    });
}

function editar(indice) {
    var fraseEditar = frases[indice];
    $('[name="autor"]').val(fraseEditar['autor']);
    $('[name="titulo"]').val(fraseEditar['titulo']);
    $('[name="frase"]').val(fraseEditar['frase']);
    indiceEditar = indice;
}

function eliminar(indice){
    frases.splice(indice,1);
    localStorage.setItem('frases', JSON.stringify(frases));
    $('#lista-frases').html("");
    mostrarFrases();
}
