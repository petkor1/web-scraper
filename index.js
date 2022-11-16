const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://www.biegigorskie.pl/kalendarz-2022/';

axios(url).then(res=> {
    const html = res.data;
    const $ = cheerio.load(html);
    const articles = [];
    $('td', html).each(function (){
        const text = $(this).text();
        const url = $(this).find('a').attr('href');
        articles.push({
            text,
            url
        })
    })
    console.log(articles)
}).catch(err=>console.log(err))

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`));