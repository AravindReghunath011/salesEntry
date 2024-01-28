import prisma from "../config/dbConfig.js";

export const newHeadertable = async(data)=>{
    let {vr_no,vr_date,ac_name,ac_amt,status} = data
    console.log(vr_date,'dateee')
   let newHeader = await prisma.header_table.create({
        data:{
            vr_no: vr_no,
            vr_date:new Date(vr_date),
            ac_name:ac_name,
            ac_amt:ac_amt,
            status:status
        }

    })
    console.log(newHeader)
    return newHeader
}

export const newDetailTable = async(data)=>{    
    console.log(data,'from repos datasssssssssss')
    try {
       let newTable =  await Promise.all(data.map(async (row) => {
          let { vr_no, sr_no, item_code, item_name, description, qty, rate, amount } = row;
    
          await prisma.detail_table.create({
            data: {
              vr_no: Number(vr_no),
              sr_no: Number(sr_no),
              item_code: item_code,
              item_name: item_name,
              description: description,
              qty: Number(qty),
              rate: Number(rate),
              amount: Number(amount),
            },
          });
        }));
    
        console.log('All details inserted successfully');
        console.log(newTable,'hehe')
      } catch (error) {
        console.error('Error inserting details:', error);
      }
    
}

export const getData = async()=>{
    const data = prisma.detail_table.findMany({})
    console.log(data,'hehe')
    return data
}