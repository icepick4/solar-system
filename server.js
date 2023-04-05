const EXPRESS = require('express');
const path = require('path');
const app = EXPRESS();
app.use('/', EXPRESS.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + './public/index.html');
});

let port = 4000;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
