const app = require('./src/app')
const { PORT } = process.env.PORT || 2300;


const startApp = () => {
app.listen(2300, () => {
    console.log(`Server started on port ${2300}`)
})
};

startApp()