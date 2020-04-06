module.exports = (app) => {
    // compartilhar funcoes do servidor para dentro do template
    app.locals.checkUserDelete = function(user, answerUser){
        return user.id === answerUser.id;
    }
}