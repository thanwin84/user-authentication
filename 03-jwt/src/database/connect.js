const {connect} = require('mongoose')

const connectToDb = async(connectionString)=>{
    return await connect(connectionString)
}
module.exports = connectToDb