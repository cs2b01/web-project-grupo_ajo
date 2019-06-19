function misPuntos(){
    $.ajax({
        url:'/current',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            //alert(JSON.stringify(response));
            $('#Puntos').html(response['points']);
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}
