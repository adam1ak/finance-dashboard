import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Transaction = {
    id: number;
    title: string;
    amount: number;
    category: string;
    date: string;
    type: "income" | "expense";
}



type TransactionState = {
    transactions: Transaction[];
}

const initialState: TransactionState = {
    transactions: []
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.transactions.push(action.payload);
        },
        removeTransaction: (state, action: PayloadAction<number>) => {
            state.transactions = state.transactions.filter(
                (transaction) => transaction.id !== action.payload
            )
        }, 
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.transactions.findIndex(t => t.id === action.payload.id);
            if (index !== -1 ){
                state.transactions[index] = action.payload;
            }
        },
        clearTransactions: (state) => { state.transactions = []; },

    }
})

export const { addTransaction, removeTransaction, clearTransactions, editTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;