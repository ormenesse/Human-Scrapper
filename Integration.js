/*
__author__ = "Vinicius Ormenesse"
__version__ = "1.0.0"
__maintainer__ = "Vinicius Ormenesse"
*/

/*
*
* Abstract Class Integrations Puppeteer
*
*/
const Math = require('mathjs');
puppeteer = require('puppeteer-extra');
StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
gcursor = gcursor = require("ghost-cursor");

class Integration {
    constructor(
            initNavigation = true, getSession = false, setSession = true,
            url = '', user = '', password = ''
        ) {
        this.user = user;
        this.password = password;
        this.initNavigation = initNavigation;
        this.loggedIn = false;
        this.getSession = getSession;
        this.setSession = setSession;
        this.url = url;
        this.browser = null;
        this.page = null;
        this.page2 = null;
        this.page3 = null;
        this.scrapper = null;
        this.cursorScrapper = null;
        this.cookies = null;
        this.sessionStorage = null;
        this.localStorage = null;
    }

    async init() {
        
        this.browser = await puppeteer.launch(
            {
                headless: 'new', // this is headless browser
                //headless : false,
                ignoreHTTPSErrors: true,
                dumpio: true
            }
        );
        if (this.initNavigation === true ){
            await this.initRandomNavigation();
        }
        await this.goTologin();
        const do2FA = await this.doLogin();
        return do2FA
    }

    async initRandomNavigation(){
        this.page = await this.browser.newPage();
        await this.page.setViewport({ // setting a fullhd chrome
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await this.page.setDefaultNavigationTimeout(300000);
        const cursor = gcursor.createCursor(this.page,{ x: 600, y: 700 },true);
        await this.page.goto("https://youtube.com");
        await this.page.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*5))});
        await this.page.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*50))});
        await this.page.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*5))});
        await cursor.click();
        //
        this.page2 = await this.browser.newPage();
        await this.page2.setViewport({ // setting a fullhd chrome
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await this.page2.setDefaultNavigationTimeout(300000);
        const cursor2 = gcursor.createCursor(this.page2,{ x: 600, y: 700 },true);
        await this.page2.goto("https://g1.com.br");
        await cursor2.click();
        await this.page2.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*5))});
        await this.page2.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*20))});
        await this.page2.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*5))});
        await cursor2.click();
        //
        this.page3 = await this.browser.newPage();
        await this.page3.setViewport({ // setting a fullhd chrome
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await this.page3.setDefaultNavigationTimeout(300000);
        const cursor3 = gcursor.createCursor(this.page3,{ x: 600, y: 700 },true);
        await this.page3.goto("https://uol.com.br");
        await cursor3.click();
        await this.page3.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*5))});
        await this.page3.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*20))});
        await this.page3.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*5))});
        await cursor3.click();
    }

    async getCookiesAndSession() {
        /*
            Get cookies, etc from mongodb storage
        */
        throw new Error("Loading values from database must be yet implemented.");
        return cookies, sessionStorage, localStorage
    }

    async setCookiesAndSession() {
        /*
            Save cookies, etc to mongodb storage
            This should used after scrapping is completed
        */
        this.cookies = JSON.stringify(await this.scrapper.cookies());
        this.sessionStorage = await this.scrapper.evaluate(() =>JSON.stringify(sessionStorage));
        this.localStorage = await this.scrapper.evaluate(() => JSON.stringify(localStorage));
        throw new Error("Setting values to database must be yet implemented.");
    }

    async goTologin() {
        this.scrapper = await this.browser.newPage();
        await this.scrapper.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await this.scrapper.setDefaultNavigationTimeout(300000);
        this.cursorScrapper = gcursor.createCursor(this.scrapper,{ x: 600, y: 700 },true);
        await this.scrapper.goto(this.url);
        if ( this.getSession === true) {
            this.cookies, this.sessionStorage, this.localStorage = await this.getCookiesAndSession();
            await this.scrapper.setCookie(...this.cookies);
            await this.scrapper.evaluate((data) => {
                for (const [key, value] of Object.entries(data)) {
                sessionStorage[key] = value;
                }
            }, this.sessionStorage);
            await this.scrapper.evaluate((data) => {
                for (const [key, value] of Object.entries(data)) {
                localStorage[key] = value;
                }
            }, this.localStorage);
            console.log("Done managing sessions.");
            await this.scrapper.waitForTimeout(1 * 1000); // waiting 1 second 
        }
    }
    
    async doLogin(){
        throw new Error("Method 'doLogin()' must be implemented.");
    }

    async do2FA(code=''){
        throw new Error("Method 'scrappe()' must be implemented.");
    }

    async scrappe(){
        throw new Error("Method 'scrappe()' must be implemented.");
    }

    async updateIntegrationMetaData(){
        throw new Error("Method 'updateIntegrationMetaData()' must be implemented.");
    }

    async saveData(){
        throw new Error("Method 'saveData()' must be implemented.");
    }
}

/*
 * Ceu.
 *
 * @class Céu
 * @extends {Integration}
 */
class Ceu extends Integration {
    async doLogin() {
        await this.scrapper.waitForTimeout((Math.floor(Math.random() * 12) + 5) * 1000) 
        await this.scrapper.waitForSelector("input#user");
        await this.scrapper.waitForSelector("input#password");
        await this.cursorScrapper.move("input#user");
        await this.cursorScrapper.click()
        await this.scrapper.type("input#user",this.user, { delay: 100 });
        await this.cursorScrapper.move("input#password");
        await this.cursorScrapper.click();
        await this.scrapper.waitForTimeout((Math.floor(Math.random() * 12) + 5) * 1000);
        await this.scrapper.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*5))});
        await this.scrapper.type("input#password",this.password);
        await this.cursorScrapper.move("#btn-login");
        await this.cursorScrapper.click();
        await this.scrapper.waitForTimeout(10 * 1000);
        await this.scrapper.screenshot({path: 'screenshotCielo.png'});
        return false;
    }
}

/*
 * Reducard.
 *
 * @class Redecard
 * @extends {Integration}
 */
class Cardo extends Integration {
    async doLogin() {
        await this.scrapper.waitForSelector("input#user");
        await this.scrapper.waitForSelector("input#password");
        await this.cursorScrapper.move("input#user");
        await this.cursorScrapper.click()
        await this.scrapper.type("input#user",this.user, { delay: 100 });
        await this.cursorScrapper.move("input#password");
        await this.cursorScrapper.click();
        await this.scrapper.waitForTimeout((Math.floor(Math.random() * 12) + 5) * 1000);
        await this.scrapper.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*5))});
        await this.scrapper.type("input#password",this.password);
        await this.cursorScrapper.move("#btn-login");
        await this.cursorScrapper.click();
        await this.scrapper.waitForTimeout(10 * 1000);
        await this.scrapper.screenshot({path: 'screenshotRede.png'});
        return false;
    }
}

/*
 * EuComida.
 *
 * @class EuComida
 * @extends {Integration}
 */
class EuComida extends Integration {
    async doLogin() {
        await this.scrapper.waitForTimeout((Math.floor(Math.random() * 12) + 5) * 1000) 
        await this.scrapper.waitForSelector("input[type=email]");
        await this.cursorScrapper.move("input[type=email]");
        await this.cursorScrapper.click()
        await this.scrapper.type("input[type=email]",this.user, { delay: 100 });
        await this.cursorScrapper.move("button[type=submit]");
        await this.cursorScrapper.click();
        await this.scrapper.waitForTimeout((Math.floor(Math.random() * 12) + 5) * 1000);
        await this.scrapper.mouse.wheel({deltaY: ((Math.random() * 2 - 1)*100)*(Math.floor(Math.random()*10))});
        await this.cursorScrapper.move("input[type=password]");
        await this.cursorScrapper.click();
        await this.scrapper.type("input[type=password]",this.password);
        await this.cursorScrapper.move("button[type=submit]");
        await this.cursorScrapper.click();
        await this.scrapper.screenshot({path: 'screenshotIfood.png'});
        console.log("Fico devendo o resto da integração porque aqui possui 2FA");
        return true;
    }
}

module.exports = {
    Integration,
    Ceu,
    EuComida,
    Cardo
};
