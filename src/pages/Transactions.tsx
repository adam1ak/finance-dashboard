import { useState } from 'react';
import SlidingModal from '../components/SlidingModal';
import AddTransaction from '../components/AddTransaction';

import { PlusIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import TransactionList from '../components/TransactionsList';

function Transactions() {

  const [showAddModal, setShowModal] = useState(false)


  const toggleAddModal = () => {
    setShowModal((prev) => !prev)
  }

  

  return (
    <div className="h-2/3">
      <SlidingModal
        isOpen={showAddModal}
        closeModal={toggleAddModal}
      >
        <AddTransaction />
      </SlidingModal>

      <div
        className="
                fixed left-1/2 -translate-x-1/2 -translate-y-16 h-full w-5/6 
                pt-8 px-10
                bg-white shadow-xl rounded-2xl
              ">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl font-semibold">Transactions History</h1>

          <div className="flex mt-4 sm:mt-0 gap-4 text-white">
            <button
              className="
                flex items-center justify-center gap-1 
                w-1/3 sm:w-auto 
                py-1.5 sm:py-2 sm:px-4
                bg-blue-600 rounded-md 
                cursor-pointer hover:bg-blue-700 transition-colors
              "
              onClick={() => { toggleAddModal() }}>
              <PlusIcon className="size-6" />
              <span>Add new</span>
            </button>

            <button
              className="
                flex items-center justify-center gap-2 
                w-1/3 sm:w-auto
                py-1.5 sm:py-2 sm:px-6
                bg-blue-600 rounded-md 
                cursor-pointer hover:bg-blue-700 transition-colors
              "
              onClick={() => { toggleAddModal() }}>
              <ArrowUpTrayIcon className="size-6" />
              <span>Import</span>
            </button>
          </div>

        </div>

        <TransactionList/>

      </div>
    </div>
  )
}

export default Transactions;