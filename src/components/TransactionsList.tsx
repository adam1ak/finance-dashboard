import { parse, format, getTime } from 'date-fns';
import { EllipsisHorizontalIcon, ArrowUpIcon, ArrowDownIcon, ArrowsUpDownIcon } from '@heroicons/react/24/solid';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store'
import { setTransactions } from '../redux/transactionSlice';

import { useEffect, useState } from 'react';

import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase/firebaseConfig';

type TransactionItemProps = {
    title: string,
    amount: number,
    category: string,
    date: string,
    id: string,
    type: string
}

interface PageButtonProps {
    pageNumber: number;
    onClick: () => void
}

function PageButton({ pageNumber, onClick }: PageButtonProps) {
    return (
        <button
            className="border-2 border-stone-200 py-1 px-3 font-bold text-lg cursor-pointer"
            onClick={onClick}>
            {pageNumber}
        </button>
    )
}

function TransactionItem({ title, amount, category, date, type }: TransactionItemProps) {

    const parsedDate = parse(date, 'dd-MM-yyyy', new Date());

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount)


    return (
        <>
            <tr
                className={`
                relative text-center font-medium border-1 border-stone-300
                text-sm sm:text-base
                ${type === "income" ? 'bg-red-100/25' : 'bg-green-100/25'}`}>
                <th className='py-3'>{title}</th>
                <th className="w-16 sm:w-auto">
                    <span className="hidden sm:inline">{date}</span>
                    <span className="inline sm:hidden">
                        {format(parsedDate, 'MMM d')}
                    </span>
                </th>


                <th>{category}</th>
                <th className={`
                    ${type === "income" ? "text-green-600" : "text-red-600"}
                    `}>{formattedAmount}
                </th>
                <th>
                    <EllipsisHorizontalIcon className="size-6 cursor-pointer" />
                </th>
            </tr>
        </>
    )
}

function TransactionList() {

    const transactions = useSelector((state: RootState) => state.transaction.transactions);
    const dispatch = useDispatch();

    const db = getFirestore();

    useEffect(() => {
        const userUid = auth.currentUser?.uid
        if (!userUid) return;

        const unsubscribe = onSnapshot(
            collection(db, "users", userUid, "transactions"),
            (querySnapshot) => {
                const firebaseTransactions = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: data.id,
                        title: data.title,
                        amount: data.amount,
                        category: data.category,
                        date: data.date,
                        type: data.type
                    };
                });

                dispatch(setTransactions(firebaseTransactions))
            },
            (error) => { console.error("Error:", error) }
        )

        return () => unsubscribe();
    }, [db, dispatch])

    const [sortedTransactions, setSortedTransactions] = useState([...transactions])

    const sortTransactions = (field: string, direction: "asc" | "desc") => {
        const copyTransaction = transactions.slice();
        let compareFn;

        switch (field) {
            case "title":
            case "category":
                compareFn = (a: TransactionItemProps, b: TransactionItemProps) => a[field].localeCompare(b[field]);
                break;
            case "amount":
                compareFn = (a: TransactionItemProps, b: TransactionItemProps) => a.amount - b.amount;
                break;
            case "date":
                compareFn = (a: TransactionItemProps, b: TransactionItemProps) => getTime(b.date) - getTime(a.date);
                break;
            default:
                compareFn = () => 0;
        }

        copyTransaction.sort((a, b) => {
            const result = compareFn(a, b);
            return direction === "asc" ? result : -result
        })

        return copyTransaction;
    }

    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

    const toggleDirection = () => {
        if (sortDirection === "asc") {
            setSortDirection("desc")
        } else {
            setSortDirection("asc")
        }
    }

    const handleSort = (field: string) => {
        if (field === sortField) {
            toggleDirection();
        } else {
            setSortField(field);
            setSortDirection("asc")
        }
    }

    useEffect(() => {
        if (sortField && sortDirection) {
            setSortedTransactions(sortTransactions(sortField, sortDirection))
        } else {
            setSortedTransactions([...transactions]); // fallback, np. po dodaniu nowej transakcji
        }
    }, [sortField, sortDirection, transactions])


    const [startIndex, setStartIndex] = useState(0);
    const [transactionsPerPage, setTransactionsPerPage] = useState(4)

    useEffect(() => {
        const breakpoints = [
            { minHeight: 875, perPage: 9 },
            { minHeight: 820, perPage: 8 },
            { minHeight: 715, perPage: 7 },
            { minHeight: 635, perPage: 5 },
            { minHeight: 0, perPage: 4 }
        ]

        const handleResizer = () => {
            const currentHeight = window.innerHeight;
            const tempObject = breakpoints.find(object => currentHeight >= object.minHeight)

            setTransactionsPerPage(tempObject?.perPage ?? 4)
        }

        handleResizer();

        window.addEventListener('resize', handleResizer);
        return () => window.removeEventListener('resize', handleResizer);
    }, [])


    const handleSetStartIndex = (index: number) => {
        setStartIndex(index)
    }

    const slicedTransactions = (index: number) => {
        if (sortedTransactions.length === 0 || index > Math.ceil(sortedTransactions.length)) console.log("Error");

        const startIndex = index * transactionsPerPage;
        const endIndex = startIndex + transactionsPerPage;

        const slicedList = sortedTransactions.slice(startIndex, endIndex);
        return slicedList;
    }

    // tempData now contains transactions with date as a
    return (
        <div className="transactions mt-6">

            <table
                className="
                    w-full divide-y divide-stone-200
                    ring-1 ring-stone-200 rounded-sm rounded-bl-none
                ">

                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>
                            <div className='flex gap-1 items-center justify-center py-1.5 cursor-pointer'>
                                Title
                                {sortField === "title" ? (
                                    sortDirection === "asc"
                                        ?
                                        <ArrowUpIcon className='size-5 text-black' />
                                        :
                                        <ArrowDownIcon className='size-5 text-black' />
                                ) : <ArrowsUpDownIcon className='size-5 text-black' />}
                            </div>
                        </th>

                        <th onClick={() => handleSort("date")}>
                            <div className='flex gap-1 items-center justify-center py-1.5 cursor-pointer'>
                                Date
                                {sortField === "date" ? (
                                    sortDirection === "asc"
                                        ?
                                        <ArrowUpIcon className='size-5 text-black' />
                                        :
                                        <ArrowDownIcon className='size-5 text-black' />
                                ) : <ArrowsUpDownIcon className='size-5 text-black' />}
                            </div>
                        </th>

                        <th onClick={() => handleSort("category")}>
                            <div className='flex gap-1 items-center justify-center py-1.5 cursor-pointer'>
                                Category
                                {sortField === "category" ? (
                                    sortDirection === "asc"
                                        ?
                                        <ArrowUpIcon className='size-5 text-black' />
                                        :
                                        <ArrowDownIcon className='size-5 text-black' />
                                ) : <ArrowsUpDownIcon className='size-5 text-black' />}
                            </div>
                        </th>

                        <th onClick={() => handleSort("amount")}>
                            <div className='flex gap-1 items-center justify-center py-1.5 cursor-pointer'>
                                Amount
                                {sortField === "amount" ? (
                                    sortDirection === "asc"
                                        ?
                                        <ArrowUpIcon className='size-5 text-black' />
                                        :
                                        <ArrowDownIcon className='size-5 text-black' />
                                ) : <ArrowsUpDownIcon className='size-5 text-black' />}
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        slicedTransactions(startIndex).map((item: TransactionItemProps) => (
                            <TransactionItem
                                key={item.id}
                                title={item.title}
                                date={format(item.date, 'dd-MM-yyyy')}
                                category={item.category}
                                amount={item.amount}
                                id={item.id}
                                type={item.type}
                            />
                        ))
                    }
                </tbody>

            </table>
            <div className="flex">
                {
                    Array.from({ length: Math.ceil(sortTransactions.length / transactionsPerPage) }).map((_, index) => (
                        <PageButton
                            pageNumber={index + 1} onClick={() =>
                                handleSetStartIndex(index)} />
                    ))
                }
            </div>
        </div>
    )
}

export default TransactionList;
