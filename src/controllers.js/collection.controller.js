
import Collection from "../models/collection.schema.js";
import asynchandler from "../services/asyncHandler.js";
import CustomError from "../utils/CustomError";

const createCollection= asynchandler(async(req,res)=>{

    const name=req.body;

    if(!name)
    {
        throw new CustomError("collection name is required",400);
    
    }

    const collection=await Collection.create({
        name,
    });

    res.staus(200).json({
        success:true,
        message: "Collection created Successfully",
        collection
    })

});

const updateCollection= asynchandler(async(req,res)=>{

    const name=req.body;
    const { id: collectionId } = req.params;

    if(!name)
    {
        throw new CustomError("collection name is required",400)
    
    }

    const updatecollection=await Collection.findByIdAndUpdate(
    collectionId,
     {
        name,
    },
    {
        new:true,
        runValidators:true,
    });

    if(!updatecollection)
    {
        throw new CustomError("Collection not found", 404);
    }
    res.staus(200).json({
        success:true,
        message: "Collection updated Successfully",
        updatecollection
    })

});

const deleteCollection= asynchandler(async(req,res)=>{

    
    const { id: collectionId } = req.params;


    const collectionToDelete= await Collection.findById(collectionId);

    if(!collectionToDelete)
    {
        throw new CustomError("Collection to be delete is not found",400);
    }

    collectionToDelete.remove();


    res.staus(200).json({
        success:true,
        message: "Collection deleted Successfully",
      
    })

});

const getAllCollection= asynchandler(async(req,res)=>{


    const collections= await Collection.find();

    if(!collections)
    {
        throw new CustomError("No Collections found",400);
    }


    res.staus(200).json({
        success:true,
        collections
      
    })

})