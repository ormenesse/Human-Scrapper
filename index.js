/*
__author__ = "Vinicius Ormenesse"
__version__ = "1.0.0"
__maintainer__ = "Vinicius Ormenesse"
*/
const { Integration, Cielo, Redecard, Ifood } = require('./Integration.js');


async function run() {
    const rede = new Redecard(true, false, false,"https://meu.userede.com.br/login", "atendimento@amorimrelojoariaeotica.com.br", "Otica1408");
    rede.init();
    rede.scrappe();
    rede.updateIntegrationMetaData();
    rede.saveData();
    
    const cielo = new Cielo(true, false, false,"https://minhaconta2.cielo.com.br/site/login","30229647812", "120414");
    cielo.init();
    cielo.scrappe();
    cielo.updateIntegrationMetaData();
    cielo.saveData();
    
    const ifood = new Ifood(true, false, false,"https://portal.ifood.com.br/login","vitorserver1@gmail.com", "Maya12345#");
    ifood.init();
    ifood.do2FA(code='');
    ifood.scrappe();
    ifood.updateIntegrationMetaData();
    ifood.saveData();
}

run();
