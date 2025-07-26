import Product from '../Models/product.model.js'


//get all products
export const getAllProducts = async(req,res)=>{

try{

    const products = await Product.find();
    res.status(200).json({sucess:true,products})
}catch(err){
    res.status(500).json({sucess:false,error:err.message})
}

}

//get products by id
export const getProductById = async(req,res)=>{

    try{
        const{id}=req.params
        const product = await Product.findById(id)

        if(!product){
     
            return res.status(404).json({ success: false, message: 'Product not found' });
       
        }
            res.status(200).json({ success: true, product });

    } catch (err) {
    res.status(500).json({ success: false, error: err.message });
}
}