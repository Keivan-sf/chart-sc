import minimal_args from "./MinimalPuppeteerArgs";
import puppeteer from "puppeteer-core";
import { BrowserLunchOptions } from "./interfaces";

/**
 * Browser controller which simplifies the use of puppeteer
 */
class Browser {
    private page: puppeteer.Page;
    private browser: puppeteer.Browser;
    constructor() {}
    async lunch(options: BrowserLunchOptions) {
        this.browser = await puppeteer.launch({
            headless: true,
            args: minimal_args,
            userDataDir: "./browser-cache",
        });
        this.page = await this.browser.newPage();
        await this.page.setViewport({
            width: options?.viewPort?.width ?? 1440,
            height: options.viewPort?.height ?? 1700,
        });
    }
    async gotoPage(url: string) {
        await this.page.goto(url, { waitUntil: "networkidle0" });
    }
    async reload(){
        await this.page.reload();
    }
}
