import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../firebase/firebaseConfig';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

export type Transaction = {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    type: "income" | "expense";
}



type TransactionState = {
    transactions: Transaction[];
}

const addTransactionToDb = async (data: Transaction) => {
    const uid = auth.currentUser?.uid;
    const db = getFirestore();
    if (!uid) {
        throw new Error("User UID is undefined");
    }

    try {
        await addDoc(collection(db, "users", uid, "transactions"), data);
    } catch (error) {
        console.log(error)
    }
}

const initialState: TransactionState = {
    transactions: []
};


const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload
        },
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.transactions.push(action.payload);
            addTransactionToDb(action.payload)
        },
        clearTransactions: (state) => { state.transactions = []; },

    }
})

export const { setTransactions, addTransaction, clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;