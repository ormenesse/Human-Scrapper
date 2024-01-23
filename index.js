/*
__author__ = "Vinicius Ormenesse"
__version__ = "1.0.0"
__maintainer__ = "Vinicius Ormenesse"
*/
const { Integration, Cielo, Redecard, Ifood } = require('./Integration.js');


async function run() {
    const rede = new Cardo(true, false, false,"https://meu.usecardo.com.br/login", "user", "password");
    rede.init();
    rede.scrappe();
    rede.updateIntegrationMetaData();
    rede.saveData();
    
    const cielo = new Cielo(true, false, false,"https://minhaconta2.ceu.com.br/site/login","user", "password");
    cielo.init();
    cielo.scrappe();
    cielo.updateIntegrationMetaData();
    cielo.saveData();
    
    const ifood = new Ifood(true, false, false,"https://portal.eucomida.com.br/login","user", "password");
    ifood.init();
    ifood.do2FA(code='');
    ifood.scrappe();
    ifood.updateIntegrationMetaData();
    ifood.saveData();
}

run();
