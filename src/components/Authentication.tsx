import { ExclamationTriangleIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

function Authentication() {

    type FormData = {
        name: string,
        email: string,
        password: string
    }

    const [showRegistrationForm, setShowRegistrationForm] = useState(true);

    const authMessages = {
        register: {
            greeting: "Nice to meet you. Please sign up to continue",
            prompt: "Have an account?",
            action: "Sign In",
            reverseAction: "Sign Up"
        },
        login: {
            greeting: "Welcome back! Please sign in to continue",
            prompt: "Don't have an account?",
            action: "Sign Up",
            reverseAction: "Sign In"
        }
    }

    const { greeting, prompt, action, reverseAction } =
        showRegistrationForm ? authMessages.register : authMessages.login

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (data: FormData) => {
        console.log(data)
        reset()
    }

    return (
        <div
            className="
                flex flex-col lg:flex-row 
                items-center justify-center h-screen
                px-8 lg:px-0
            ">
            <div className="lg:w-3/5 lg:flex lg:flex-col lg:items-center">
                <div
                    className="flex flex-col items-center">
                    <h1 className="text-3xl text-black font-bold">Track your expenses</h1>
                    <p className="text-neutral-600 text-lg mt-2">
                        Log in or Create account to get back to your dashboard!
                    </p>
                </div>

                <div
                    className="
                        lg:w-3/5
                        flex flex-col items-center
                        mt-6 h-fit rounded-md
                        shadow-[0_0_8px_0_rgba(0,0,0,0.1)]
                    "
                >
                    <h2 className="mt-6 lg:mt-12 text-xl text-black font-bold">{reverseAction} to Finance Tracker</h2>
                    <p className="mt-1 text-neutral-600 text-balance font-medium">{greeting}</p>

                    <form
                        className="w-full flex flex-col items-center gap-6 mt-6 pb-5"
                        onSubmit={handleSubmit(onSubmit)}>
                        {showRegistrationForm && (
                            <div className="flex flex-col w-3/5">
                                <label
                                    className="mb-2 text-black font-semibold"
                                    htmlFor="name">Name</label>
                                <input
                                    className={`
                                        outline-0 border-2 px-2 py-1 rounded-md
                                        ${errors.name ?
                                            "border-red-500 focus:border-red-500"
                                            :
                                            "border-gray-200 focus:border-gray-200"
                                        }
                                    `}
                                    id="name"
                                    type="text"
                                    placeholder="John"
                                    {...register("name",
                                        {
                                            required: "Name is required",
                                            validate: (value) =>
                                                value.trim().length > 0 || "Title cannot be empty or just spaces",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters"
                                            },
                                            maxLength: {
                                                value: 25,
                                                message: "Name cannot exceed 25 characters"
                                            }
                                        }
                                    )} />
                                {errors.name && (
                                    <p className="text-sm text-red-600 mt-1.5 flex items-center">
                                        <ExclamationTriangleIcon className="size-4 mr-2" />
                                        {errors.name.message}
                                    </p>
                                )}

                            </div>
                        )}

                        <div className="flex flex-col w-3/5">
                            <label
                                className="mb-2 text-black font-semibold"
                                htmlFor="email">Email</label>
                            <input
                                className={`
                                        outline-0 border-2 px-2 py-1 rounded-md
                                        ${errors.email ?
                                        "border-red-500 focus:border-red-500"
                                        :
                                        "border-gray-200 focus:border-gray-200"
                                    }
                                    `}
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register("email",
                                    {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        },
                                        validate: (value) =>
                                            value.trim().length > 0 || "Email cannot be empty or just spaces",
                                        minLength: {
                                            value: 2,
                                            message: "Email must be at least 2 characters"
                                        },
                                        maxLength: {
                                            value: 35,
                                            message: "Email cannot exceed 25 characters"
                                        }
                                    }
                                )} />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1.5 flex items-center">
                                    <ExclamationTriangleIcon className="size-4 mr-2" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col w-3/5">
                            <label
                                className="mb-2 text-black font-semibold"
                                htmlFor="password">Password</label>
                            <input
                                className={`
                                        outline-0 border-2 px-2 py-1 rounded-md
                                        ${errors.password ?
                                        "border-red-500 focus:border-red-500"
                                        :
                                        "border-gray-200 focus:border-gray-200"
                                    }
                                    `}
                                id="password"
                                type="password"
                                placeholder="password1234"
                                {...register("password",
                                    {
                                        required: "Password is required",
                                        validate: (value) =>
                                            value.trim().length > 0 || "Password cannot be empty or just spaces",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        maxLength: {
                                            value: 25,
                                            message: "Password cannot exceed 25 characters"
                                        }
                                    }
                                )} />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1.5 flex items-center">
                                    <ExclamationTriangleIcon className="size-4 mr-2" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <input
                            className="w-3/5 bg-black text-white font-semibold py-2 rounded-lg cursor-pointer"
                            type="submit"
                            value={reverseAction} />

                    </form>

                    <p className="text-neutral-600">
                        {prompt}{' '}
                        <button
                            className="text-black font-medium pb-6 lg:pb-12 cursor-pointer"
                            onClick={() => setShowRegistrationForm((prev) => !prev)}>
                            {action}
                        </button>
                    </p>
                </div>
            </div>
            <div
                className="
                    hidden lg:flex bg-gradient-to-br from-blue-600 to-blue-800 
                    shadow-2xl items-center justify-center w-2/5 h-screen
            ">
                <div className="text-center">
                    <ChartBarIcon className="h-42 w-42 text-white mx-auto mb-8" />
                    <h2 className="text-4xl font-bold text-white mb-4">Track Your Finances</h2>
                    <p className="text-xl text-blue-100">
                        Get insights into your spending habits and financial health
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Authentication;
