import { useDispatch } from 'react-redux';
import { addTransaction, type Transaction } from '../redux/transactionSlice';
import type { AppDispatch } from '../redux/store';

import "react-datepicker/dist/react-datepicker.css";
import TransactionForm from './TransactionForm';
import { useState } from 'react';

type FormData = {
    title: string;
    amount: number;
    category: string;
    date: Date
};

function AddTransaction() {
    const dispatch = useDispatch<AppDispatch>();

    const [transactionType, setTransactionType] = useState(true)

    const onSubmit = (data: FormData, resetForm: () => void) => {
        const transactionData: Transaction = {
            ...data,
            amount: transactionType ? data.amount : -data.amount,
            id: Date.now().toString(),
            date: data.date.toISOString(),
            type: transactionType ? "income" : "expense"
        }
        
        dispatch(addTransaction(transactionData));
        resetForm();
    };


    return (
        <TransactionForm
            type="Add"
            onSubmit={onSubmit}
            transactionType={transactionType}
            setTransactionType={setTransactionType}/>
    )

}

export default AddTransaction
