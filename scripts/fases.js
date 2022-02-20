function enviarSenha(event) {
    if (event.keyCode === 13) {
        passarDeFase();
    }
}

function removerCaracteresEspeciais(senhaSuja) {
    const charsInvalidos = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
    const charsValidos = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    let senhaLimpa = "";

    for (let i = 0; i < senhaSuja.length; i++) {
        if (charsInvalidos.indexOf(senhaSuja.charAt(i)) != -1) {
            senhaLimpa += charsValidos.substring(charsInvalidos.search(senhaSuja.substring(i, 1)), 1);
        } else {
            senhaLimpa += senhaSuja.substring(i, 1);
        }
    }

    return senhaLimpa.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function passarDeFase() {
    const senha = document.getElementById("senha").value;
    if (senha === '') {
        return;
    }
    const senhaFormatada = removerCaracteresEspeciais(senha);
    const url = window.location.href;

    window.location.href = `${url.substring(0, url.lastIndexOf("/"))}/${senhaFormatada}.html`;
}