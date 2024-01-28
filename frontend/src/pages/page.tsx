import { addRow, removeRow, selectRows, updateRowValue } from '@/app/salesSlice';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'sonner';
import Swal from 'sweetalert2'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';

interface Details {
  sr_no: number;
  item_code: string;
  item_name: string;
  description: string;
  qty: number;
  rate: number,
  amount:number
  vr_no:number
}

interface Header{
  vr_no:number,
  vr_date:string,
  ac_name:string,
  ac_amt:number,
  status:string
}


const Spreadsheet = () => {
  const navigate = useNavigate()
  const row  = useSelector(selectRows)
  const dispactch = useDispatch()
  const [amount,setAmount] = useState(0)
  
  const [headerData,setHeaderData] = useState<Header>({
    vr_no: 0,
    vr_date: '',
    ac_name: '',
    ac_amt: 0,
    status: '',
  })
  const [rows, setRows] = useState<Details[]>([
    { sr_no: 1,
       item_code: '',
        item_name: '',
         description: '',
          qty: 0,
           rate: 0,
           amount:0,
           vr_no:0
          }
  ]);
  const [idCounter, setIdCounter] = useState(2);

  const handleAddRow = () => {
    const newRow = { sr_no: idCounter, item_code: '', item_name: '', description: '', qty: 0, rate: 0,amount:0 ,vr_no:0}
    dispactch(addRow())
    setRows([...rows, newRow])
    setIdCounter(idCounter + 1)
  };

  const hasEmptyField = (obj:any)=> {
    return Object.values(obj).some(value => value === '' || value === null);
  }

  const hasObjectWithEmptyField = (arr:any)=> {
    return arr.some(obj => hasEmptyField(obj));
  }

  const handleRemoveRow = () => {
    Swal.fire({
      title: "You sure you want to delete?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "yes",
      denyButtonText: `No`
    }).then((result) => {
      
      if (result.isConfirmed) {
        if (rows.length > 1 ) {
          const updatedRows = rows.slice(0, -1); 
          dispactch(removeRow())
          setRows(updatedRows);
        }
      }
    });
    
  };

  const updateValue = (rowIndex: number, field: string, value: any) => {
    const updatedRows = rows.map((row, i) => (
       i === rowIndex ? { ...row, [field]: value } : row
      
    ));
    dispactch(updateRowValue({rowIndex,field,value}))
    setRows(updatedRows);
    console.log(updatedRows)
  };
  
  const handleHeaderData = (field:string,value:any)=>{
    let data = {...headerData,[field]:value}
    if(field=='vr_no'){
      let newRow = rows.map((row)=>{
        return {...row,vr_no:value}
      })
      setRows(newRow)
      console.log(newRow,'row')
    }
    setHeaderData(data)
    console.log(data,'header')
  }

  const saveData = async(header:Header,details:Details)=>{
    try {
      let containNullInDetails = await hasObjectWithEmptyField(row)
      let containNull =  hasEmptyField(headerData)
      console.log(containNull,'hehehehe')
      if(!containNullInDetails && !containNull){

        axios.post('http://localhost:5000/api/savedata',{header,details}).then(({data})=>{
          console.log(data,'data')
          if(data.message=='success'){
            toast.success('Datas saved successfully')
          }else{
            toast.error(data.message)
          }
        })
      }else{
        toast.error('Some fields are empty')
        console.log('error')
      }

    } catch (error:any) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  const totalAmount = useMemo(() => {
    let total = rows.reduce((total, row) => total + row.rate * row.qty, 0);
    handleHeaderData("ac_amt",total)
    return total
  }, [rows]);

  useEffect(()=>{
    
    setAmount(totalAmount)
  },[totalAmount])

  return (
    <div className='bg-white w-full text-black flex justify-center pt-20 pb-20'>
        <div>
        <div className='flex justify-center border border-input pt-10 pb-10'>
        <div>
        <div className='flex'>
          <label> Vr No</label>
          <input type="number" value={headerData?.vr_no} onChange={(e)=>handleHeaderData("vr_no",e.target.value)} className={`border pl-1 outline-none border-input lg:ml-5 mr-10  ${/^[0-9]+$/.test(headerData.vr_no) ? '' : 'bg-red-200'}`} />
          <label> Vr Date</label>
          <input type="date" value={headerData?.vr_date} onChange={(e)=>handleHeaderData("vr_date",e.target.value)} className={`border pl-1 outline-none border-input lg:ml-5 mr-10  ${/^\s*$/.test(headerData.vr_date) ? 'bg-red-200' : ''}`} />
          <label> Status</label>
          <DropdownMenu  >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='bg-white ml-1 w-20 hover:bg-gray-300 hover:text-black text-black'>{!headerData?.status?'open':headerData?.status}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-black ">
        <DropdownMenuRadioGroup className='bg-white ' value={headerData?.status} onValueChange={(value)=>handleHeaderData('status',value)}>
          <DropdownMenuRadioItem className='bg-white' value="A">A</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="I">I</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
          {/* <input type="" value={headerData?.status} onChange={(e)=>handleHeaderData("status",e.target.value)} className={`border pl-1 outline-none border-input lg:ml-5 mr-10  ${/^\s*$/.test(headerData.status) ? 'bg-red-200' : ''}`} /> */}
        </div>
        <div className='flex mt-5'>
          
          <label> Ac Name</label>
          <input type="text" value={headerData?.ac_name} onChange={(e)=>handleHeaderData("ac_name",e.target.value)} className={`border pl-1 outline-none border-input lg:ml-5 mr-10  ${/^\s*$/.test(headerData.ac_name) ? 'bg-red-200' : ''}`} />
          <label> Ac Amt</label>
          <input type="number" value={amount}  className={`border pl-1 outline-none border-input lg:ml-5 mr-10  ${/^[0-9]+$/.test(headerData.ac_amt) ? '' : 'bg-red-200'}`} />
        </div>
      

        </div>
        </div>
        
      <table className='border border-black'> 
        <thead >
          <tr>
            <th>Sr No</th>
            <th>Item code</th>
            <th>Item name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(row).map(([key, value], colIndex) =>  (key!='vr_no' &&
                <>
  <td key={colIndex} className='border-input border'>
    {
      key === 'vr_no' || key == 'amount' ? null : (
        key === 'item_code' || key === 'item_name' || key === 'description' ? (
          <input
            type="text"
            value={value}
            className={`text-black outline-none pl-1 ${/^\s*$/.test(value) ? ' bg-red-200' : ''}`}
            onChange={(e) => updateValue(rowIndex, key, e.target.value)}
          />
        ) : (
          <input
            type="text"
            value={value}
            className={`text-black outline-none pl-1 ${/^\d+(\.\d+)?$/.test(value) ? '' : 'bg-red-200'}`}
            onChange={(e) => updateValue(rowIndex, key, e.target.value)}
            onKeyUp={()=>updateValue(rowIndex, 'amount', row.qty * row.rate)}
          />
        )
      )

      
    }
  {
    key=='amount' ? <input
    type="text"
    value={row.rate * row.qty}
    
    className={`text-black outline-none pl-1 ${/^[^\d\s]*$/.test(value) ? 'bg-red-200' : ''}`}
    
    />:null
  }
  </td>
  </>
))}
            </tr>
          ))}
        </tbody>
      </table>


      <div className='w-24  fixed rounded top-1/3 right-0 text-center  bg-amber-300 h-40'>
        <button  className='mt-3  w-full hover:translate-x-1 duration-300' onClick={handleAddRow}>New Row</button> <br />
        <button className='mt-3 w-full hover:translate-x-1 duration-300' onClick={handleRemoveRow}>Delete Row</button>
        <button className='mt-3 w-full hover:translate-x-1 duration-300' onClick={()=>navigate('/pdf')}>Print</button>
        <button className='mt-3 w-full hover:translate-x-1 duration-300' onClick={()=>saveData(headerData,rows)} >Save</button>
      </div>
    </div>
    </div>
  );
  console.clear()
};

export default Spreadsheet;
