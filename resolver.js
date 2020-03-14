const path = require('path');
const fs = require('fs');
const {v4} = require('uuid');
let guid = v4;

let productList = [];

 const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');

  async function loadfileContent(){
     try{
        let content = fs.readFileSync(p);
         productList = JSON.parse(content);
         return productList;
     }
     catch(e)
     {
       productList = [];
       return productList;
     }
 }

const Resolver = {

Query : {
   message : ()=>{
     return 'hellow wold';

   },

   getallproduct : async function(){
     loadfileContent();
     return productList;
   },

   getproductbyid : ({id})=>{  
      loadfileContent(); 
    
     let result =  productList.find(item => item.id === id);
      return result;
   }
},

Mutation : {
  insert : ()=>{
    return 'data created'
  },

  createproduct : ({input})=>{
     try{
         let content = loadfileContent();
         
            let value =
        {
          id : guid(),
          name : input.name,
          category : input.category,
          color : input.color,
          available : input.available,
          qantity : input.qantity,
          isactive : input.isactive
        }
        productList.push(value);

         fs.writeFileSync(p, JSON.stringify(productList));
        //  fs.writeFile(p, JSON.stringify(productList), (err)=>{
        //         console.log(err);
        //         return {isSuccess : "false", message :  "error in creating a product"}
        //   });
        return {isSuccess : "true", message :  "Product created successfully"}
        
     }
     catch(e)
     {
         console.log(e);
         return {isSuccess : "false", message :  "error in creating a product"}
     }
  },

  updateproduct : ({input})=>{
     try{
          loadfileContent();
          console.log(productList);
  var objFound_bool = false;
      var i = 0;
      let result = productList.find((item, i) => item.id == input.id );

      if(result === undefined || result === {}) 
      {
         return {isSuccess : "false", message :  "No record found"};
      }
      else
      {      
        objFound_bool = true;
        productList[i].name =input.name ;
        productList[i].category =input.category ;
        productList[i].color =input.color ;
        productList[i].available =input.available ;
        productList[i].qantity =input.qantity ;
        // productList.push(productList);
          fs.writeFileSync(p, JSON.stringify(productList));
        return {isSuccess : "true", message :  "Product updated successfully"}
      }
 
     }
     catch(e)
     {
       console.log(e);
        return {isSuccess : "false", message :  "error! unable to update the record"}
     }

  },

  deleteproduct : ({id})=>{
     try{
         let i = 0;
         loadfileContent();     
     let result =  productList.find(item => item.id === id);
      if(result === undefined || result === {}) 
      {
         return {isSuccess : "false", message :  "No record found"};
      }
      else
      {      
        objFound_bool = true;
        productList[i].isactive = false ;
       
          fs.writeFileSync(p, JSON.stringify(productList));
        return {isSuccess : "true", message :  "Product deleted successfully"}
      }
     }
     catch(e)
     {
         console.log(e);
        return {isSuccess : "false", message :  "error! unable to delete the record"}
     }
  }
  
}


}

module.exports = Resolver;