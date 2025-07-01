import { format } from 'date-fns';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import TransactionActionsModal from './TransactionActionsModal';

import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store'
import { useState } from 'react';

type TransactionItemProps = {
    title: string,
    amount: number,
    category: string,
    date: string,
    id: number,
    type: string
}

function TransactionItem({ title, amount, category, date, type, id }: TransactionItemProps) {

    const [showModal, setShowModal] = useState(false)
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    return (
        <>
            <tr className='relative text-center font-medium'>
                <th className='py-3'>{title}</th>
                <th>{date}</th>
                <th>{category}</th>
                <th className={`
                    ${type === "income" ? "text-green-600" : "text-red-600"}
                    `}>{type === "income" ? '+' : '-'}${amount}
                </th>
                <th>
                    <EllipsisHorizontalIcon
                        className="size-6 cursor-pointer"
                        onClick={(e) => {
                            setModalPosition({
                                x: e.clientX,
                                y: e.clientY
                            });
                            setShowModal(true);
                        }} />
                </th>
            </tr>
            {showModal && (
                <div className="fixed inset-0 z-50" onClick={() => setShowModal(false)}>
                    <div
                        className="absolute shadow-lg rounded-sm"
                        style={{
                            left: `${modalPosition.x - 75}px`,
                            top: `${modalPosition.y + 15}px`
                        }}
                        onClick={e => e.stopPropagation()}
                        
                    >
                        <TransactionActionsModal id={id} onClose={() => setShowModal(false)}/>
                    </div>
                </div>
            )}
        </>
    )
}

function TransactionList() {

    const transactions = useSelector((state: RootState) => state.transaction.transactions);

    return (
        <div
            className="
        transactions
    ">

            <h1 className='text-2xl font-semibold mb-8'>Transaction History</h1>
            <table
                className="
                    min-w-full divide-y divide-stone-200
                    ring-1 ring-stone-200 rounded-sm
                ">
                <thead>
                    <tr className='text-center text-lg text-neutral-600'>
                        <td className='py-1.5'>Title</td>
                        <td>Date</td>
                        <td>Category</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((item) => (
                            <TransactionItem
                                key={item.id}
                                title={item.title}
                                date={format(item.date, 'dd-MM-yyyy')}
                                category={item.category}
                                amount={item.amount}
                                id={item.id}
                                type={item.type} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TransactionList;
