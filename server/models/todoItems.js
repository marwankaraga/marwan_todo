const mongooose=require('mongoose');

const TodoSchema=new mongooose.Schema(
    {
        item:{
            type:String,required:true
        }
        ,
        numb:{
            type:Number,required:true
        }
        
    }
)
module.exports=mongooose.model('todo',TodoSchema); 