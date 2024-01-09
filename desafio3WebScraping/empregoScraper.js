const pup = require("puppeteer")

const url = 'https://www.empregos.com.br/';
const searchFor = "javascript";

let count = 1;

(async () => {
    const browser = await pup.launch({headless: false}); // inicializa o navegador e define que veremos isso por baixo do pano, com o true, não veremos nada acontecer.
    const page = await browser.newPage(); // abre uma nova aba/pagina
    
    await page.goto(url); // navega para a url desejada
    await page.waitForSelector('#ctl00_ContentBody_ucSuggestCargo_txtCargo'); // se não usar ese metodo, irá dar erro, pois a página não vai esperar carregar e executar
    // o próximo código pra redirecionar
    await page.type("#ctl00_ContentBody_ucSuggestCargo_txtCargo", searchFor); // pesquisa "javascript" no input com o id "#ctl00_ContentBody_ucSuggestCargo_txtCargo"

    await Promise.all([ // vai conseguir navegar entre as paginas corretamente, pois o puppeteer tem o problema de esperar a navegação entre páginas
        page.waitForNavigation(),
        await page.click('#ctl00_ContentBody_lnkBuscar') // clica em pesquisar no input com o id "#ctl00_ContentBody_lnkBuscar"
    ])

    const links = await page.$$eval('.descricao > h2 > a', el => el.map(link => link.href)); // o $$eval é uma função que funciona como o querySelectorAll,
    // ele passa por todos elementos e pega o href do link 
    console.log(links)
    for(const link of links){
        console.log('Página', count);
        await page.goto(link);

        const titulo = await page.$eval('.flex > h1', element => element.innerText);
        const empresa = await page.$eval('.flex > h2 > a', element => element.innerText);
        const local = await page.$eval('.flex > h2', element => element.textContent);
        const descricao = await page.$eval('.info > p', element => element.textContent);

        const obj = {titulo, empresa, local, descricao}
        console.log(obj)

        count++;
    }

    await page.waitForTimeout(3000); // espera 3 segundos pra fechar o navegador, sem isso, ele fecha instantaneamente
    await browser.close();
})(); // chama a função anônima