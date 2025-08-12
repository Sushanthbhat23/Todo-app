import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 5000

//command to get the file path from the url in the module
const __filename = fileURLToPath(import.meta.url)
//tell the os the directory where the file is present
const __dirname = dirname(__filename)

//middleware
app.use(express.json())
//this line of code used to tell the code that the static file is in another directory
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`server has started on ${PORT}`);
})