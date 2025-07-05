import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import { ChevronDownIcon } from '@heroicons/react/24/solid';

import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';

type ModalProps = {
    type: string;
    initialData?: FormData;
    transactionType: boolean;
    onSubmit: (data : FormData, resetForm: () => void) => void;
    setTransactionType: (type: boolean) => void;
}

type FormData = {
    title: string;
    amount: number;
    category: string;
    type: string;
    date: Date;
};

function TransactionForm({ type, initialData, transactionType, onSubmit, setTransactionType }: ModalProps) {


    const [isOpen, setIsOpen] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title: "",
            category: "",
            date: new Date(),
        }
    });

    useEffect(() => {
        if(initialData){
            setTransactionType(initialData?.type === "income")
            reset({
                ...initialData,
                date: initialData.date ? new Date(initialData.date) : new Date()
            })
        }
    }, [JSON.stringify(initialData)])

    const handleFormSubmit = (data: FormData) => {
        onSubmit(data, () => {
            reset({
                title: "",
                amount: 0,
                category: "",
                date: new Date(),
            });

            setTransactionType(true)
        })
    }

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="
                flex flex-col w-3/4 h-full
                py-2 px-4
            ">
            <h1 className="text-2xl text-neutral-900 font-bold">{type} Transaction</h1>
            <label htmlFor="title" className="mt-3 text-xl text-neutral-600 font-medium">Title</label>
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
                    w-full border-2 border-stone-200 rounded-sm py-1.5 pl-2 focus:outline-none
                "/>
            {errors.title && <p className="text-sm ml-2 text-red-700 font-medium">{errors.title.message}</p>}

            <label htmlFor="amount" className="mt-4 text-xl text-neutral-600 font-medium">Amount</label>
            <div className="relative">
                <p
                    onClick={() => setTransactionType(!transactionType)}
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
                    w-full border-2 border-stone-200 rounded-sm py-1.5 pl-10 focus:outline-none
                " />
            </div>

            {errors.amount && <p className="text-sm ml-2 text-red-700 font-medium">{errors.amount.message}</p>}

            <label htmlFor="category" className="mt-4 text-xl text-neutral-600 font-medium">Category</label>
            <div className="relative">
                <select
                    id="category"
                    {...register("category", { required: "Category is required" })}
                    onClick={() => setIsOpen((prev) => !prev)}
                    onBlur={() => setIsOpen((prev) => !prev)}
                    className="
                        w-full border-2 border-stone-200 rounded-sm py-1.5 pl-2 appearance-none focus:outline-none
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

            <label htmlFor="date" className="mt-4 text-xl text-neutral-600 font-medium">Date</label>
            <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                    <DatePicker
                        id="date"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        onBlur={field.onBlur}
                        dateFormat="dd/MM/yyyy"
                        className="
                    w-full border-2 border-stone-200 rounded-sm py-1.5 pl-2 focus:outline-none
                "  />
                )}
            />
            {errors.date && <p className="text-sm ml-2 text-red-700 font-medium">{errors.date.message}</p>}

            <input
                type="submit"
                value={`${type} Transaction`}
                className="
                    mt-4 w-full py-2 rounded-md cursor-pointer bg-blue-600 text-white font-semibold 
                " />
        </form>
    )
}

export default TransactionForm
