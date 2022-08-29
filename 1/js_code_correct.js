//http://pastie.org/p/1NtrEJB1LSV7nQ2ki0Z45B

// Это документ с исправленной версией,
// Во втором документе исходный текст с комментариями.

class UserService {
    _username;
    _password;
    
    constructor(username, password) {
        this._username = username;
        this._password = password;
    }

    get Username(){
        return this._username;
    }
    get Password(){
        throw "You are not allowed to get password";
    }

    authenticate_user(){
        return new Promise(function(resolve) {
            let url = `https://examples.com/api/user/authenticate?username=${this._username}&password=${this._password}`;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "json";
            xhr.onload = function(){
                if(xhr.status == "200"){
                    resolve(xhr.response.value)
                } else {
                    throw "Bad Status";
                }
            }
            xhr.send();
        
        });
    }
};

$( "form #login" ).click(async function(){
    let username = $("#username").val();
    let password = $("#password").val();
    let user = new UserService(username, password);
    let res = await user.authenticate_user();
    if(res == true){
        document.location.href = "/home";
    } else {
        alert("Error");
    }

});
