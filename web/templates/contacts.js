
function getData(){
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
        var content = JSON.stringify({
                "name": name,
                "email": email,
                "subject": subject,
                "message": message
            });
        $.ajax({
            url:'/send_message',
            type:'POST',
            contentType: 'application/json',
            data : content,
            dataType:'json',
        });
    }