import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type FormData = {
    title: string;
    amount: number;
    category: string;
    date: Date;
};

function AddTransaction() {

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title: "",
            amount: 0,
            category: "",
            date: new Date()
        },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Title</label>
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
                            message: "Title must be atleast 2 characters"
                        },
                        maxLength: {
                            value: 50,
                            message: "Title cannot exceed 50 characters"
                        }
                    })} />
            {errors.title && <p>{errors.title.message}</p>}

            <label htmlFor="amount">Amount</label>                    
            <input
                id="amount"
                type="number"
                placeholder="24$"
                {...register("amount",
                    {
                        required: "Amount is required",
                        validate : (value) => value !== 0 || "Amount cannot be zero",
                        min: {
                            value: -1000000,
                            message: "Amount must be ≥ -1,000,000"
                        },
                        max: {
                            value: 1000000,
                            message: "Amount must be ≤ 1,000,000"
                        }
                    })} />
            {errors.amount && <p>{errors.amount.message}</p>}

            <label htmlFor="category">Category</label>
            <select id="category" {...register("category", {required : "Category is required"})}>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
            </select>
            {errors.category && <p>{errors.category.message}</p>}

            <label htmlFor="date">Date</label>
            <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DatePicker
                        id="date"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        onBlur={field.onBlur}
                        dateFormat="dd/MM/yyyy" />
                )}
            />
            {errors.date && <p>{errors.date.message}</p>}

            <input type="submit" value="Add transactions"/>
        </form>
    )
}

export default AddTransaction
