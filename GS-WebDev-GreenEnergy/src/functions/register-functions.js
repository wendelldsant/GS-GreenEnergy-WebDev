const char_number_username = 5; 
const special_caracteres = ['*', '&', '%', '$', '#', '@', '!'];

export function verificaUsername(username, lista_users) {
    if (username.includes(' ')) {
        alert('Verifique os requisitos necessários para o nome de usuário.'); 
        return false;
    }
    else if (username.length < char_number_username) {
        alert('Verifique os requisitos necessários para o nome de usuário.');
        return false;
    }
    else if(verificaUsernameExistente(username, lista_users)){
        alert('Nome de usuário já existe. Tente novamente.');
        return false;
    }
    return true; 
}

function caracteresEspeciais(senha) {
    let has_SpecialChar = false;
    senha.split('').forEach(function(char) {
        if (special_caracteres.includes(char)) {
            has_SpecialChar = true;
        }
    });
    return has_SpecialChar;
}

//funcao usada para verificar TODOS os requisitos da senha do usuário
export function passwordRequirements(senha){
    let has_Number = false;
    let has_Maiuscula = false;
    let has_SpecialChar = false;
    senha.split('').forEach(char => { // usado para transformar em lista a senha inseridade
        if (!isNaN(char)) { //se o caracter for number primeira verificação OK
            has_Number = true;
        }
        if (isNaN(char)){ //validação se há caracteres maiusculos
            let char_maiusc = char.toUpperCase();
            if (char_maiusc === char && char.toLowerCase() !== char) { 
                has_Maiuscula = true;
            }
        }
        if(caracteresEspeciais(senha)){ //verificao de caracteres especiais
            has_SpecialChar = true;
        }
    });
    if(has_Number && has_Maiuscula && has_SpecialChar){
        return true;
    }
    else{
        return false;           
    }
}

export function verificaUsernameExistente(username, lista_users){
    if(lista_users.some(user => user.userId === username)){
        return true;
    }
    else {
        return false;
    }
}

//funcao para verificar se o login existe na lista de usuarios
export function verificaLoginExistente(lista_users, username){
    if(lista_users.some(user => user.userId === username )){
        lista_users.forEach(user => {
            if(user.userId == username){
                return user
            }
        }
        )
    }
    else{
        return false
    }
}

//validacao se a senha bate com o username
export function verificarSenhaxLogin(lista_users, username){
    for (let user of lista_users) {
        if (user.userId === username) {
            return user;
        }
    }
    return false; 
}

export function verificaSenha(senha, confirm_senha){
    let senha_check = passwordRequirements(senha);
    if (senha_check){
       if(senha != confirm_senha){
            alert('Cadastro não aceito - As senhas não conferem.')
            return false;
       } 
       else{    
            return true;
       }
    }
    else{
        alert('Cadastro não aceito - Verifique os requisitos de senha.')
    }

}