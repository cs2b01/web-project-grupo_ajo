var guardar_ID=0;
function misDatos(){
    $.ajax({
        url:'/current',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            var bloqueA= 'Nickname: ' + response["nickname"];
            var bloqueB= 'Nombre: ' + response["name"];
            var bloqueC= 'Apellido: ' + response["surname"];
            var bloqueD= 'Username: ' + response["username"];

            guardar_ID=response['id'];

            $('#nickname').html(bloqueA);
            $('#name').html(bloqueB);
            $('#surname').html(bloqueC);
            $('#username').html(bloqueD);


            },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}
function renovarDatos(){
    var newNickname= $('#newNickname').val();
    var newName= $('#newName').val();
    var newSurname= $('#newSurname').val();
    var newUsername= $('#newUsername').val();

    if(newNickname.length != 0) {
        updateUser('nickname', newNickname);
    }
    if(newName.length != 0){
        updateUser('name',newName);
    }
    if(newSurname.length != 0) {
        updateUser('surname', newSurname);
    }
    if(newUsername.length != 0) {
        updateUser('username', newUsername);
    }
}

function updateUser(campo,actualizar){



    var message = JSON.stringify({
                "key":campo,
                "update":actualizar
            });
    $.ajax({
        url:'/users/'+guardar_ID,
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
