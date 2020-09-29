const Puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const[el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imgUrl = await src.jsonValue();

    const[el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const[el3] = await page.$x('//*[@id="priceblock_dealprice"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    const[el4] = await page.$x('//*[@id="acrPopover"]/span[1]/a/i[1]');
    const txt3 = await el4.getProperty('textContent');
    const rating = await txt3.jsonValue();

    const[el5] = await page.$x('//*[@id="acrCustomerReviewText"]');
    const  txt4 = await el5.getProperty('textContent');
    const ratingCount = await txt4.jsonValue();

    console.log({imgUrl, title, price, rating, ratingCount});
    browser.close();

}

scrapeProduct('https://www.amazon.in/Fender-Bullet-SSS-BSB-0370001532-Tremolo-Sunburst/dp/B07BDG5VMJ/ref=sr_1_4_mod_primary_lightning_deal?dchild=1&pf_rd_i=3677697031&pf_rd_m=A1K21FY43GMZF8&pf_rd_p=9ebedb30-74e5-4bad-90cc-d4c02548105f&pf_rd_r=GZTPNWN91SW72SB7S2MT&pf_rd_s=merchandised-search-12&pf_rd_t=101&qid=1601059114&refinements=p_89%3ACort%7CFender%7CGivson%7CIntern%7CJUAREZ%7CVAULT%7CYamaha%2Cp_85%3A10440599031&rps=1&s=musical-instruments&sbo=Tc8eqSFhUl4VwMzbE4fw%2Fw%3D%3D&smid=A14CZOWI0VEHLG&sr=1-4')
