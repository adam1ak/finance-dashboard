import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, type Transaction } from '../redux/transactionSlice';
import type { AppDispatch } from '../redux/store';
import type { RootState } from '../redux/store'

import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';

type FormData = {
    title: string;
    amount: number;
    category: string;
    date: Date
};

function AddTransaction() {
    const dispatch = useDispatch<AppDispatch>();
    const transactions = useSelector((state: RootState) => state.transaction.transactions);

    const [isOpen, setIsOpen] = useState(false)

    // true = income, false = expense
    const [transactionType, setTransactionType] = useState(true)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title: "",
            category: "",
            date: new Date(),
        },
    });

    const onSubmit = (data: FormData) => {
        const transactionData: Transaction = {
            ...data,
            id: Date.now(),
            date: data.date.toISOString(),
            type: transactionType ? "income" : "expense"
        }
        dispatch(addTransaction(transactionData))
        reset();
    };

    useEffect(() => {
    console.log("Updated transactions:", transactions);
    }, [transactions]);


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="
                flex flex-col h-full
                py-2 px-4
            ">
            <h1 className="text-3xl text-neutral-900 font-bold">Add Transaction</h1>
            <label htmlFor="title" className="mt-6 text-2xl text-neutral-600 font-medium">Title</label>
            <input
                id="title"
                type="text"
                placeholder="Medicines"
                {...register("title",
                    {
                        required: "Title is required",
                        validate: (value) =>
                            value.trim().length > 0 || "Title cannot be empty or just spaces",
                        minLength: {
                            value: 2,
                            message: "Title must be at least 2 characters"
                        },
                        maxLength: {
                            value: 50,
                            message: "Title cannot exceed 50 characters"
                        }
                    })}
                className="
                    w-full text-xl border-2 border-stone-200 rounded-sm py-1.5 pl-2 focus:outline-none
                "/>
            {errors.title && <p className="text-sm ml-2 text-red-700 font-medium">{errors.title.message}</p>}

            <label htmlFor="amount" className="mt-6 text-2xl text-neutral-600 font-medium">Amount</label>
            <div className="relative">
                <p 
                onClick={() => setTransactionType((prev) => !prev)}
                className={`
                    absolute top-1/2 -translate-y-1/2 ml-2
                    w-6 rounded-lg text-center
                    text-white font-bold
                    cursor-pointer
                    ${transactionType ? "bg-green-600" : "bg-red-700"}
                `}>{transactionType ? "I" : "E"}</p>
                <input
                    id="amount"
                    type="number"
                    placeholder="0"
                    step={0.01}
                    {...register("amount",
                        {
                            required: "Amount is required",
                            validate: (value) => value !== 0 || "Amount cannot be zero",
                            min: {
                                value: -1000000,
                                message: "Amount must be ≥ -1,000,000"
                            },
                            max: {
                                value: 1000000,
                                message: "Amount must be ≤ 1,000,000"
                            }
                        })}
                    className="
                    w-full text-xl border-2 border-stone-200 rounded-sm py-1.5 pl-10 focus:outline-none
                " />
            </div>

            {errors.amount && <p className="text-sm ml-2 text-red-700 font-medium">{errors.amount.message}</p>}

            <label htmlFor="category" className="mt-6 text-2xl text-neutral-600 font-medium">Category</label>
            <div className="relative">
                <select
                    id="category"
                    {...register("category", { required: "Category is required" })}
                    onClick={() => setIsOpen((prev) => !prev)}
                    onBlur={() => setIsOpen((prev) => !prev)}
                    className="
                        w-full text-xl border-2 border-stone-200 rounded-sm py-1.5 pl-2 appearance-none focus:outline-none
                    ">
                    <option value="" disabled hidden>Select a category</option> {/* Placeholder */}
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                </select>

                <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 mr-3">
                    <ChevronDownIcon
                        className={`
                            size-4 transition-all duration-400 ease-in-out  
                            ${isOpen ? "rotate-180" : "rotate-360"}`
                        } />
                </div>
            </div>
            {errors.category && <p className="text-sm ml-2 text-red-700 font-medium">{errors.category.message}</p>}

            <label htmlFor="date" className="mt-6 text-2xl text-neutral-600 font-medium">Date</label>
            <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required"}}
                render={({ field }) => (
                    <DatePicker
                        id="date"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        onBlur={field.onBlur}
                        dateFormat="dd/MM/yyyy"
                        className="
                    w-full text-xl border-2 border-stone-200 rounded-sm py-1.5 pl-2 focus:outline-none
                "  />
                )}
            />
            {errors.date && <p className="text-sm ml-2 text-red-700 font-medium">{errors.date.message}</p>}

            <input
                type="submit"
                value="Add transactions"
                className="
                    mt-6 text-xl w-full py-2 rounded-md cursor-pointer bg-blue-600 text-white font-semibold 
                " />
        </form>
    )
}

export default AddTransaction
