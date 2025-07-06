import './App.css'

import { useState } from 'react'

import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionsList'
import SlidingModal from './components/SlidingModal'
import Authentication from './components/Authentication'

function App() {

  const [showAddModal, setIsShowModal] = useState(false)

  const toggleAddModal = () => {
    setIsShowModal((prev) => !prev)
  }

  return (

<div>
    <Authentication/>
      {/* <button onClick={toggleAddModal}>
        open
      </button>
      <SlidingModal
        isOpen={showAddModal}
        closeModal={toggleAddModal}>
          <AddTransaction/>
      </SlidingModal>
      <p>xd</p>
      <TransactionList />
      <p>x</p> */}
    </div>
  )
}

export default App;
