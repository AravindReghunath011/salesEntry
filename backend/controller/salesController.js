import { newDetailTable, newHeadertable,getData } from "../repository/repository.js"

export const savedata = async(req,res)=>{
    console.log(req.body,'keeeeeeeeeeeeeeee')
    
    try {
        let data = {
            ...req.body.header,
            vr_no:Number(req.body.header.vr_no),
            ac_amt:Number(req.body.header.ac_amt)
        }
        console.log(req.body,'boddyee')
        let header = await newHeadertable(data)
        let details = await newDetailTable(req.body.details)

        console.log(header,'headerssss')
        console.log(details,'details')
        res.json({header:header,details:details,message:'success'})
        
    } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
    }

}

export const getdata = async(req,res)=>{
    try {
        let data = await getData()
        res.json(data)
    } catch (error) {
        res.json({message:error.message})
    }
}

