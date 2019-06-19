
var id0=0;
function allusers(){
    $.ajax({
        url:'/users',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            var i = 0;
            $.each(response, function(){
                if(response[i].type=="student"){
                    f = '<tr><td>'+response[i].id+'</td>';
                    f = f + '<td>'+response[i].name+'</td>';
                    f = f + '<td>'+response[i].surname+'</td>';
                    f = f + '<td>'+response[i].username+'</td>';
                    f = f + '<td>'+response[i].nickname+'</td>';
                    f = f + '<td>'+response[i].password+'</td>';
                    f = f + '<td>'+response[i].points+'</td>';
                    f = f + '<td>'+'<input class="btn btn-info btn-sm" type="button" value="Editar" onclick="modifyUser('+response[i].id+')" />';
                    f = f + '<input class="btn btn-danger btn-sm" type="button" value="Eliminar" onclick="deleteUser('+response[i].id+')" />'+'</td></tr>';
                    $('#t_users').append(f);
                }
                i = i+1;
            });
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}

function createUser(){
    var name = $('#name').val();
    var surname = $('#surname').val();
    var nickname = $('#nickname').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var points = $('#points').val();
    var message = JSON.stringify({
                "name": name,
                "surname": surname,
                "nickname": nickname,
                "username": username,
                "password": password,
                "type": "student",
                "points": points
            });
    $.ajax({
        url:'/users',
        type:'POST',
        contentType: 'application/json',
        dataType:'json',
        data:message,
        success: function(response){
            //alert(JSON.stringify(response));
        },
        error: function(response){
            //alert(JSON.stringify(response));
            if(response['status']==401){
                //
            }else{
                location.reload();
            }
        }
    });
}

function openForm(form){
    document.getElementById(form).style.display = "block";
}

function closeForm(form){
    document.getElementById(form).style.display = "none";
}

function modifyUser(id){
    openForm('myReplace');
    id0=id;
}

function updateUser(){
    var campo = $('#campo').val();
    var actualizar = $('#actualizar').val();
    var message = JSON.stringify({
                "key":campo,
                "update":actualizar
            });
    $.ajax({
        url:'/users/'+id0,
        type:'PUT',
        contentType: 'application/json',
        dataType:'json',
        data:message,
        success: function(response){
            //alert(JSON.stringify(response));
        },
        error: function(response){
            //alert(JSON.stringify(response));
            if(response['status']==401){
                //
            }else{
                location.reload();
            }
        }
    });
}

function deleteUser(id){
    $.ajax({
        url:'/users/'+id,
        type:'DELETE',
        contentType: 'application/json',
        dataType:'json'
    });
    location.reload();
}