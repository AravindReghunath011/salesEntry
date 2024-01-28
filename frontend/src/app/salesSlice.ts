import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detailTable: [
        {
          sr_no: 1,
          item_code: '',
          item_name: '',
          description: '',
          qty: 1,
          rate: 1,
        },
      ],
    headerTable:{
        vr_no: 0,
        vr_date: '',
        ac_name: '',
        ac_amt: 0,
        status: '',
    }
}

export const salesSlice = createSlice({
    name:'sales',
    initialState,
    reducers:{
        updateRowValue: (state, action) => {

            const { rowIndex, field, value } = action.payload;
            state.detailTable = state.detailTable.map((row, i) =>
              i === rowIndex ? { ...row, [field]: value } : row
            );
            console.log(state.detailTable,'from slice')
        },
        updateHeader: (state, action) => {
            const { field, value } = action.payload;
            state.headerTable[field] = value;
            console.log(state.headerTable, 'from slice');
          },
        addRow: (state) => {
            const newRow = {
              sr_no: state.detailTable.length + 1,
              item_code: '',
              item_name: '',
              description: '',
              qty: 1,
              rate: 1,
            };
            state.detailTable.push(newRow);
          },
          removeRow: (state) => {
            if (state.detailTable.length > 1) {
              state.detailTable.pop();
            }
          },
    }
})

export const {updateRowValue,addRow,removeRow} = salesSlice.actions
export const selectRows = (state:any) => state.sales.detailTable;
export default salesSlice.reducer;