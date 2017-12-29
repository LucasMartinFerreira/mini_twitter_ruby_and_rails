// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery3
//= require jquery_ujs
//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require bootstrap

$(document).ready(function(){
    // click on button submit
    $("#submit").on('click', function(){

        var id = $('#idUser').val();
        var name = $('#nameInput').val();
        var email =  $('#emailInput').val();

        $.ajax({
            url: 'users/'+id, // url where to submit the request
            type : "PATCH", // type of action POST || GET
            dataType : 'JSON', // data type
            data : 'user[name]=' + name + '&user[email]=' + email,
            success : function(result) {
                $('.modal').modal('toggle');
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
                alert('Problema con la petición')
            }
        })
    });
});


function getPostsUser(userId) {
    $('#allPost').empty();

    var $titlePost = $('Posts del Usuario')

    $.getJSON('microposts?user_id='+userId, function(data){
        console.log('Microposts:', data)

        if(data.length===0){
            console.log('No tenemos nada')
            $('#allPost').append("<div style='text-align: center'>No hay resultados</div>");
        }else{

            data.forEach(function(post){
                var date = new Date(post.created_at);
                var dd = date.getDate();
                var mm = date.getMonth()+1;
                var yyyy = date.getFullYear();
                if(dd<10){dd='0'+dd}
                if(mm<10){mm='0'+mm}
                var create = dd+'/'+mm+'/'+yyyy;

                var $newdiv1 = $( "<div style='width: 50%; float: left'>"+post.content+"</div>" +
                                  "<div style='width: 50%; float: left'>"+create+"</div>" )

                $('#allPost').append($newdiv1);

            })

        }

    })
}

function show_user(id){
    $.getJSON('users/'+id, function(data){
        console.log('**** Datos del Usuario a editar ****', data)
        $('#idUser').val(data.id)
        $('#nameInput').val(data.name);
        $('#emailInput').val(data.email);
    })
}