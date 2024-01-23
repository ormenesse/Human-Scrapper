A classe principal desse projeto é Integration.js
Nela, temos uma classe abstrata com métodos pré-implementados e com ela devemos implementar cada webscrapper separadamente. Os métodos a serem implementados são:

- doLogin ->  método com passo a passo de login para cada integração;
- scrappe -> método para se utilizar após o login na integração.

Para instanciar a classe, deve-se, por exemplo:
```
const rede = new Redecard(true, true, true,"https://meu.userede.com.br/login", "login", "senha");
await rede.init();
await rede.scrappe();
```

De primeira instância estamos já bypassando recaptcha, porém, é possível que no método doLogin devamos colocar alguma cláusula para caso o mesmo apareça.