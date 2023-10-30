const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent')


const flowlinter = addKeyword(['linter']).addAnswer('Conectando con el aeropuerto...',
null,


async(_,{flowDynamic})=>{
     const header = randomUseragent.getRandom();
     const browser = await puppeteer.launch({
                 executablePath: '/usr/bin/chromium',
               timeout: 0,
                args: [
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--disable-setuid-sandbox',
                    '--no-sandbox'
                ]
            });
     const page = await browser.newPage();
     await page.setUserAgent(header)
     await page.setViewport({ width: 1920, height: 1080 });
     await page.goto('https://www.aeropuerto-maiquetia.com.ve/app_biva/')
     
     function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      } 
      
      run();
      
      async function run() {
        await delay(5000);
        page.screenshot({ path: 'ejemplo.png' })
      }
      let data=[];
      let cadena=`*Vuelo*-- *Origen*-- *Hora*-- *Status*\n`;
      await page.waitForSelector('.search-arrival-body')
      console.log('en el medio')
      const listadeItems = await page.$$('.flight-row')
      for (const item of listadeItems){
        const objetoVuelo = await item.$('.column-flight')
        const vuelo = await page.evaluate(objetoVuelo=>objetoVuelo.innerText,objetoVuelo)
        const objetoOrigen = await item.$('.column-city')
        const origen = await page.evaluate(objetoOrigen=>objetoOrigen.innerText,objetoOrigen)
        const objetoHora = await item.$('.column-time')
        const hora = await page.evaluate(objetoHora=>objetoHora.innerText,objetoHora)
        const objetoStatus = await item.$('.column-status')
        const status = await page.evaluate(objetoStatus=>objetoStatus.innerText,objetoStatus)
        data.push(
            {
                vuelo:vuelo,
                origen:origen,
                hora:hora,
                status:status

            }

        )
        cadena=cadena+`${vuelo}-->${origen}-->${hora}-->${status}\n_______________\n`
    
       
        
    }
    
    console.log(data)  
    flowDynamic("``` "+cadena+" ```")
      
     
     
     
     //yield sleep(2000)
     
         
       
     }
     

     
).addAnswer('llegadas',{media:'ejemplo.png'})
        
        
        





const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot de vuelos*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *linter* para ver llegasdas Internacionales',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],

    )

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowlinter])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
