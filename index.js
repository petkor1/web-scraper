const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://www.biegigorskie.pl/kalendarz-2023/';

axios(url).then(res=> {
    const html = res.data;
    const $ = cheerio.load(html);
    const scrapedData = [];
    $('tbody>tr', html).each(function (index, element){
        if (index === 0) return true;
        const tds = $(element).find('td');
        const category = $(tds[0]).text()
            .toLowerCase()
            .replaceAll('i', 'i ')
            .replaceAll('ss','ss ')
            .replaceAll('ultra','ultra ').replaceAll('nni ng','nning')
            .trim()
            .split(' ');
        const date = $(tds[1]).text();
        const location = $(tds[2]).text();
        const distance = $(tds[3]).text();
        const title = $(tds[4]).text();
        const url = $(tds[4]).find('a').attr('href');
        const tableRow = { category, date, location, distance, title, url };
        scrapedData.push(tableRow);
    })
    console.log(scrapedData)
}).catch(err=>console.log(err))

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`));