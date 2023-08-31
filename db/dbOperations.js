const config = require('./dbConfig.js')
const sqlServer = require('../node_modules/mssql')

const getItems = async () => {
    try {
        let pool = await sqlServer.connect(config)
        let items = pool.request().query('SELECT * from Items')
        return items
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = {getItems}