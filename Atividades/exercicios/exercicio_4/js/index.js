const getRepository = async (user) => {
    /* 
        Esta função vai faz um request na API aberta do github
        e retorna um array contendo as seguintes informações do usuário
        login, email, public_repos, followers, following
    */

    try{
        const url = `https://api.github.com/users`;
        const data = await fetch(`${url}/${user}`)
            .then((data) => data.json())
            .catch((err) => err.json());
        const { login, email, public_repos, followers, following } = data;
        return [login, email, public_repos, followers, following] ;
    } catch(e) {
        console.error(e)
    }   
};

const showError = (show) => {
    console.error('Erro:', show)
}


const insertRow = async () => {
    //Recupere o input digitado
    var nameValue = document.getElementById('github_name').value

    const userInfos = await getRepository(nameValue)
    
    /*  
        Se o elemento login retornado pela função getRepository 
        for undefined, significa que o usuário não existe, então será
        mostrado ao usuário uma mensagem de erro
    */
    if(!userInfos[0]){
        showError(false)
        return true
    }

    const tabela = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
  
    // Adiciona células à nova linha
    const celulaLogin = novaLinha.insertCell(0);
    const celulaEmail = novaLinha.insertCell(1);
    const celulaRepositorios = novaLinha.insertCell(2);
    const celulaSeguidores = novaLinha.insertCell(3);
    const celulaSeguindo = novaLinha.insertCell(4);
  
    // Preenche as células com os dados do usuário
    celulaLogin.textContent = userInfos[0]
    celulaEmail.textContent = userInfos[1] || 'N/A';
    celulaRepositorios.textContent = userInfos[2];
    celulaSeguidores.textContent = userInfos[3];
    celulaSeguindo.textContent = userInfos[4];

}