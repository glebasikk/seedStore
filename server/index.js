const app = require("./app");

async function start() {
    app.listen(5000, () => {
        console.log(`Example app listening at http://localhost:${5000}`);
    });
   
}
start();
