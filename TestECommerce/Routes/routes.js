const express = require('express');


const router = express.Router();

const companies = ['AMZ', 'FLP' , 'SNP','MYN','AZO']
const formData = {
    companyName: process.env.COMPANYNAME,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    ownerName: process.env.OWNERNAME, 
    ownerEmail: process.env.OWNEREMAIL,
    rollNo: process.env.ROLLNO
}

router.get('/categories/:categoryname/products' ,  async (req,res)=>{

    try{
    const accessresponse = await fetch(process.env.TOKENURL , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData)
    }).then(response=>{
        return  response.json()
    }).catch(error =>{
        console.error(error);
    })

    const access_token = accessresponse.access_token;
    const categoryname = req.params.categoryname;

    const allProducts = [];

    
    for(company of companies)
    {
        const url = `http://20.244.56.144/products/companies/${company}/categories/${categoryname}/products?top=10&minPrice=1000&maxPrice=10000`
        try {
            const products = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }).then(response => response.json());
            allProducts.push(...products);
        } catch (err) {
            console.error(err);
        }
    }

        //Sorted By Ratings
        allProducts.sort((a,b)=> a.rating - b.rating).reverse();
        topProducts = allProducts.slice(0,10); 


        return res.status(200).json({topProducts})
}
catch(err){
    return res.status(404).json(err)
    }
})

module.exports = router;