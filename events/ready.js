const client = require ('../index');
const prefix = require ("../config.json");
const version = require ("../version.json");
const config = require("../config.json");




client.on('ready', () => {
    console.log('Your bot name here, is online!');
    

    const arrayofStatus = [
        `Status you want here `,
        `Status you want here `,
        `Status you want here `
    ];

    let index = 0;

    setInterval(() => {
    if (index === arrayofStatus.length) index = 0;
    const status = arrayofStatus[index];
    console.log(status);
    client.user.setActivity(status);
    index++;
    
    }, 10000)




    
    
})
