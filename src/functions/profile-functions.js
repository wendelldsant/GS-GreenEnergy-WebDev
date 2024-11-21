export function verifyUser(lista_users, login_check){
    let user_dados = ''
    if (lista_users) {
        lista_users.forEach(user => {
            if (login_check.userID === user.userID) {
                user_dados = user;
            }
        });
    }
    if(login_check===false || login_check===null || login_check === ''){
        console.log('Sem login')
        user_dados = false;

    }
    return user_dados
}