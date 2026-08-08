// Middleware power 

//     request ke andar ka sara data padh skte hai
//     request ke anadar ke data ko modify kar skta hai
//     response bhi send kar skte hai


const jwt = require("jsonwebtoken");

async function authArtist(req,res,next){

    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }

    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role !== "artist"){
            return res.status(403).json({message:"Forbidden"});
        }

        req.user=decoded //Adding new property in request.

        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({message:"unauthorized"});
    }
}

async function authUser(req,res,next){

    const token= req.cookies.token;

    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role !== "user" && decoded.role!=="artist"){
            return res.status(403).json({message:"forbidden"});
        }

        req.user = decoded;

        next();

    }catch(err){
        console.log(err);
        return res.status(401).json({message:"unauthorized"});
    }
}

module.exports= {authArtist,authUser};