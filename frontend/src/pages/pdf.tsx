import axios from 'axios';
import React, { useEffect, useState } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const pdf = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getdata').then((response: any) => {
      console.log(response.data, 'oooo');
      setData(response.data);
    });
  }, []);

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 10, 0);
      
      pdf.save("download.pdf");
    });
  };

  return (
    < div className='w-screen flex justify-center  h-screen'>
    <div id='divToPrint' className=' w-[230mm] ml-10'>
      <table className='border  text-center text-black h-auto  mt-14 w-8/12'>
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
        <tbody className='w-screen h-10   '>
          {data.map((row) => (
            <tr className='text-black h-10 border  '>
              {Object.entries(row).map(
                ([key, value]: any) =>
                  key !== 'id' &&
                  key !== 'vr_no' && (
                    <td className='border h-10 '>
                      <div className=' h-10 '>{value}</div>
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className='text-black outline w-20 outline-1 hover:bg-gray-200 ml-[30rem] mt-10' onClick={printDocument}>print</button>
    </div>
      </div>
  );
};

export default pdf;
