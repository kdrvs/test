//http://pastie.org/p/5HJkOG7DtihSeY4RJlpmP2

// это документ с комментариями исходного кода,
// Во втором файле исправленная версия.

class UserService {
    var username;        //var не требуется;
    var password;
    
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    get username(){                        // геттер должен иметь имя, отличное от поля
        return UserService.username;       // например get Username
                                           // геттер должен возвращать поле текущего объекта, а не класса
                                           // return this.username
    }

    get password() {                                 // если поле password приватно, 
        throw "You are not allowed to get password"; // возможно его нужно именовать _password
                                                     // или сделать приватным: #password
    }

    static authenticate_user(){         // метод не должен быть статичным, 
                                        // он должен работать с данными объекта
                                        // метод использует асинхронную функцию внутри
                                        // значит он должен возвращать promise
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://examples.com/api/user/authenticate?username=" + 
                UserService.username + "&password=" + UserService.password, true); 
                // в запрос нужно передавать поля текущего объекта, а не класса:
                // "https://examples.com/api/user/authenticate?username=" + 
                //  this.username + "&password=" + this.password, true);
                // кроме того, для приватных действий желательно использовать POST запросы
                // также, возможно имеет смысл использовать fetch вместо XMLHttpRequest
                // url api желательно вынести в переменную

        xhr.responseType = "json";

        const result = false;    // константа неизменна, этой переменной нельзя присвоить 
                                 // новое значение. Нужно использовать let result;

        // пропущен xhr.send() данные на сервер не отправлены.

        xhr.onload = function(){
            if(xhr.status !== "200") {
                result = xhr.response; // в этом блоке сервер выдал ошибку, соответственно
                                       // получать response нет смысла.
                                       // можно использовать throw...
            } else {
                result = true;         // в этом блоке сервер ответил на запрос,
                                       // но это не означает, что аутентификация прошла,
                                       // тут переменной нужно присвоить значение, 
                                       // которое отдал сервер
                                       // кроме того, тип получаемого ответа - json
                                       // значит значение нужно получить из json
                                       // например result = xhr.response.value
            }
        }

        return result;
    }
}

$("form #login").click(function ()) { 
    var username = $("#username");   //получены dom элементы, а не их значения
    var password = $("#password");

    var res = UserService(username, password).authenticate_user(); // пропущено new;
    if(res == true){
        document.location.href = "/home";
    } else {
        alert(res.error);  // res типа bool, у него нет свойства error
    }
}

