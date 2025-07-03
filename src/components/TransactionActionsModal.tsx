import { PencilSquareIcon } from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/24/solid"

import { useDispatch } from 'react-redux';
import { removeTransaction } from '../redux/transactionSlice';
import type { AppDispatch } from '../redux/store';
import EditTransactionModal from "./EditTransactionModal";
import { useState } from "react";
import SlidingModal from "./SlidingModal";

type ModalProps = {
    id: number,
    onClose: () => void
}

function TransactionActionsModal({ onClose, id }: ModalProps) {

    const dispatch = useDispatch<AppDispatch>();

    const [showEditModal, setShowEditModal] = useState(false)

    const toggleEdit = () => {
        setShowEditModal((prev) => !prev)
    }

    return (
        <div
            className={`
                absolute
                pop-up-modal
                w-max 
                bg-white
                flex flex-col gap-2  
                pl-3 pr-8 py-2
                shadow-lg rounded-sm
        `}>
            <SlidingModal
                isOpen={showEditModal}
                closeModal={toggleEdit}
                onClose={onClose}>
                    <EditTransactionModal id={id} onClose={onClose}/>
            </SlidingModal>
            <span
                className="flex items-center cursor-pointer"
                onClick={() => setShowEditModal(true)}>
                <PencilSquareIcon
                    className="
                        size-5 mr-1
                    "/>
                Edit
            </span>
            <span
                className="flex items-center cursor-pointer"
                onClick={() => {
                    dispatch(removeTransaction(id));
                    onClose()
                }}>
                <TrashIcon
                    className="
                        size-5 mr-1
                    "/>
                Delete
            </span>
        </div>
    )
}

export default TransactionActionsModal
