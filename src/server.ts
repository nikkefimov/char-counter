import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from 'path';

const app = express();
const port = 8189;

// static files
app.use(express.static(path.join(__dirname, '../public')));

// middleware for parsing JSON
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser. json());

// process form submission and respond with the result
app.post('/count', (req: Request, res: Response) => {
    const inputText = req.body.inputText;

    // process the text to create an array with strings, ints and floats
    const result = processText(inputText);

    // respond with the count and the result
    res.send(`
        <html>
            <head>
                <title>Result</title>
            </head>
            <body>
                <h1>Result</h1>
                <p>String: ${result.stringsCount}</p>
                <p>Int: ${result.intsCount}</p>
                <p>Float: ${result.floatsCount}</p>
                <br>
                <a href="/">Go back</a>
            </body>
        </html>
        `);
    });

    // counting logic
    function processText(inputText: string) {
        // split text into words
        // split by whitespace and filter empty strings
        const symbols = inputText.split(/\s+/).filter(Boolean);

        let stringsCount = 0;
        let intsCount = 0;
        let floatsCount = 0;

        // categorize each symbol in array
        symbols.forEach((symbol) => {
            if (isFloat(symbol)) {
                floatsCount++;
            } else if (isInt(symbol)) {
                intsCount++;
            } else {
                stringsCount++;
            }
        });

        const totalCount = stringsCount + intsCount + floatsCount;

        return { stringsCount, intsCount, floatsCount, totalCount};
    }

    // check if a symbol is a valid integer
    function isInt(symbol: string): boolean {
        return /^-?\d+$/.test(symbol);
    }
    
    // check if a symbol is a valid float
    function isFloat(symbol: string): boolean {
        return /^-?\d+\.\d+$/.test(symbol);
    }

    // start server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });