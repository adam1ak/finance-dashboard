import { useDispatch, useSelector } from 'react-redux';
import { editTransaction, type Transaction } from '../redux/transactionSlice';
import type { AppDispatch } from '../redux/store';
import type { RootState } from '../redux/store'

import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import TransactionForm from './TransactionForm';

type ModalProps = {
    id: number;
    onClose: () => void;
}

type FormData = {
    title: string;
    amount: number;
    category: string;
    type: string;
    date: Date;
};

function EditTransactionModal({ id, onClose }: ModalProps) {
    const dispatch = useDispatch<AppDispatch>();
    const transaction = useSelector((state: RootState) =>
        state.transaction.transactions.find((t) => t.id === id));

    const [transactionType, setTransactionType] = useState(true)

    const initialFormData = transaction ? {
        ...transaction,
        date: new Date(transaction.date),
    } : undefined;

    const onSubmit = (data: FormData, resetForm: () => void) => {
        if (!transaction) return;

        const transactionData: Transaction = {
            ...data,
            id: transaction.id,
            date: data.date.toISOString(),
            type: transactionType ? "income" : "expense",
        };

        dispatch(editTransaction(transactionData));
        resetForm();
        onClose?.();
    };

    

    return (
        <TransactionForm
            type="Edit"
            initialData={initialFormData}
            onSubmit={onSubmit}
            transactionType={transactionType}
            setTransactionType={setTransactionType} />
    )
}

export default EditTransactionModal
