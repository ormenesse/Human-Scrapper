The main class of this project is Integration.js
In it, we have an abstract class with pre-implemented methods and with it we must implement each webscrapper separately. The methods to be implemented are:

- doLogin -> step-by-step login method for each integration;
- scrappe -> method to use after logging into the integration.

To instantiate the class, you must, for example:
```
const network = new Cardo(true, true, true,"https://meu.cardo.com.br/login", "login", "password");
await network.init();
await rede.scrappe();
```

In the first instance we are already bypassing recaptcha, however, it is possible that in the doLogin method we must add a clause in case it appears.
