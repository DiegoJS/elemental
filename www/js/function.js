function setUnidad(id){

	switch (id) {
		case 1:
			location.href = 'unidad.html';
			break;
		case 2:
			location.href = 'unidad1.html';
			break;
		default:
			location.href = 'unidad2.html';
			break;
	}

}

function login(username) {

	var userlist = localStorage.getItem('userlist');
	var status = false;

	userlist = $.parseJSON(userlist);

    console.log(userlist);
	

    if (userlist !== null) {

		$.each(userlist, function (index, value) { 
			if (value.usuario === username) {
                localStorage.setItem('usuario_id', value.usuario);
				status = true;
			}
		});

    }

    return status;
}

/* handler */

$usuario_id = false;

$(document).ready(function() {

	var height_window = $( window ).height();

	$("#navbarsExampleDefault").css('min-height', height_window+'px');
    
    if (localStorage.getItem('usuario_id') !== null) {
        $usuario_id = localStorage.getItem('usuario_id');
	}
	//localStorage.removeItem('userlist');
	
	/*myDB.transaction(function(transaction) {
		transaction.executeSql('CREATE TABLE IF NOT EXISTS usuario (id integer primary key, nombre text, desc text)', [],
		function(tx, result) {
			alert("Table created successfully");
		},
		function(error) {
			alert("Error occurred while creating the table."+ error);
		});
	});*/

});

$(document).on("submit","#sendMEssage",function(e){
	e.preventDefault();
	var usuario = $("#username_login").val();
	if (usuario !== "") {
        if (login(usuario)){
			location.href = 'dashboard.html';
		}
		else {
            swal("Error", "Este usuario no existe", "error");
		}
	}
});

$(document).on('submit','#formActividad',function(event){
	event.preventDefault();
	if ($("#respuesta_pregunta").val() === '') {
		swal('Ingresa tu respuesta...', '', 'warning');
	}
	else{
		swal('Bien!','','success');
		setTimeout(function(){
			window.location.href = 'dashboard.html';
		}, 1500);
	}
});

$(document).on("click","#btnSendForm",function(event){
	event.preventDefault();

    var completo = true;

    $("#formRegistro .form-control").each(function(index, element) {
        if ($(this).val() === '') {
            completo = false;
        }
    });

    if (completo) {

        var nombre 	= 	$("#nombre").val();
        var apellido 	= 	$("#apellido").val();
        var edad 	= 	$("#edad").val();
        var grado 	= 	$("#grado").val();
        var genero 	= 	$("#genero").val();
		var usuario = 	$("#usuario").val();
		
		var userlist = localStorage.getItem('userlist');
		
        if (userlist === null) {
            userlist = new Array();
		}
		else{
            userlist = $.parseJSON(userlist);
		}

		var registrado = false;

		$.each(userlist, function (index, value) { 
			if (value.usuario === usuario) {
				registrado = true;
			}
		});

        if (registrado) {

			$("#usuario").val("");
            swal('El usuario ya existe.', '', 'warning');

		}
		else{

            var objeto = new Object();

            objeto.nombre = nombre;
            objeto.apellido = apellido;
            objeto.edad = edad;
            objeto.grado = grado;
            objeto.genero = genero;
            objeto.usuario = usuario;
            objeto.progresos = new Array();

			userlist.push(objeto);
			
            userlist = JSON.stringify(userlist);

            localStorage.setItem('userlist', userlist);
            localStorage.setItem('usuario_id', usuario);

			window.location.href = "dashboard.html";

		}

    }
    else {
        swal('Completa tus datos', '', 'warning');
    }

});
