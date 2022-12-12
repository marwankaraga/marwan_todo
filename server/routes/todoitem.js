const router=require('express').Router();
const path=require('path')

const todoItems = require('../models/todoItems');




router.post('/api/item', async (req,res)=>{
    try{
        const newItem=new todoItems({
            item:req.body.item,
            numb:req.body.numb
        
    })
            const saveItem =await newItem.save()
            res.status(200).json("item added")

        }catch(err){
            res.json(err);
        }
    }
)

router.get('/api/items',async (req,res)=>{
    try{
        const allTodosItems=await todoItems.find({})
        res.status(200).json((allTodosItems))

    }
    catch(err){
        res.json(err)

    }
})

router.put('/api/item/:id', async (req,res)=>{
    try{
        const updateItem=await todoItems.findByIdAndUpdate(req.params.id,{$set :req.body});
        res.status(200).json("item update")   

         
    }
    catch(err){

        res.json(err);
    }
})

router.delete('/api/item/:id' ,async(req,res) =>{
    try{
        const deleteItem=await todoItems.findByIdAndDelete(req.params.id);
        res.status(200).json("item deleted");
    }catch(err){
        res.json(err)
    }
   


})

module.exports=router;