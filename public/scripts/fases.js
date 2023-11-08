function enviarSenha(event) {
    if (event.keyCode === 13) {
        passarDeFase();
    }
}

function removerCaracteresEspeciais(senhaSuja) {
    return senhaSuja.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function passarDeFase() {
    const senha = document.getElementById("senha").value;
    if (senha === '') {
        return;
    }
    const senhaFormatada = removerCaracteresEspeciais(senha);
    const url = window.location.href;
    const newUrl = `${url.substring(0, url.lastIndexOf("/"))}/${senhaFormatada}.html`;

    fetch(newUrl).then(response => {
        if (response.ok) {
            window.location.href = newUrl;
        } else {
            throw new Error('Arquivo não encontrado');
            
        }
    })
    .catch(error => {
        console.log(error);
        alert('Ops, ' + error.message);
    });
}

function voltar(){
    window.history.back();
}