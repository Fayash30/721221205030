const express = require('express');

const router = express.Router();

const companies = ['AMZ', 'FLP' , 'SNP','MYN','AZO']

const categories = ['Phone' , 'Compnaies' , 'Laptop' , 'Tv' , 'Earphone' , 'Tablet' , 'Charger','Mouse','Keypad' ,'Bluetooth' , 'Pendrive','Remote','Speaker','Headset','Laptop','PC'];

router.get('/categories/:categoryname/products' , async (req,res)=>{
    const categoryname = req.params.categoryname;

    const allProducts = [];

    
    for(company of companies)
    {
        const url = "http://20.244.56.144/products/companies/`${company}`/categories/`${categoryname}`/products?top=n&minPrice=p&maxPrice=q"
        const products = await fetch(, {
            headers:{
                Authorization: `Bearer ${accesstoken}`,
            },
        })
        .then((response)=> response.json())
        .catch((err)=> console.log(err))

        console.log(products);
        allProducts = [ ...allProducts , products];
        console.log("Allproducts")
        console.log(allProducts)
    }
        return res.status(200).json({products})
    }
})