import { PencilSquareIcon } from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/24/solid"

import { useDispatch } from 'react-redux';
import { removeTransaction } from '../redux/transactionSlice';
import type { AppDispatch } from '../redux/store';
import EditTransactionModal from "./EditTransactionModal";

type ModalProps = {
    id: number,
    onClose: () => void
}

function TransactionActionsModal({onClose, id } : ModalProps) {

const dispatch = useDispatch<AppDispatch>();

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
            <span 
            className="flex items-center cursor-pointer" 
            onClick={() => {console.log("clicked edit")}}>
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
            <EditTransactionModal id={id} onClose={onClose}/>
    </div>
  )
}

export default TransactionActionsModal
