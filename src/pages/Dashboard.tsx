import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import SlidingModal from '../components/SlidingModal';
import AddTransaction from '../components/AddTransaction';

function Dashboard() {

    const [showAddModal, setShowModal] = useState(false)


    const toggleAddModal = () => {
        setShowModal((prev) => !prev)
    }

    const handleLogOut = () => {
        signOut(auth).then(() => {
            console.log("signed out");
            localStorage.clear()
        }).catch(() => {
            console.log("error")
        })
    }

    return (
        <div className="h-2/3">
            <SlidingModal
                isOpen={showAddModal}
                closeModal={toggleAddModal}
            >
                <AddTransaction />
            </SlidingModal>
            <div className="fixed left-1/2 -translate-x-1/2 -translate-y-16 h-full w-5/6 bg-white shadow-xl rounded-2xl">
                <p>Dashboard</p>
                <button
                    className="bg-red-700 p-10"
                    onClick={() => handleLogOut()}>
                    Log Out
                </button>
                <button 
                    className="bg-green-700 p-10"
                    onClick={() => {toggleAddModal()}}>
                    Add
                </button>
            </div>

        </div>
    )
}

export default Dashboard;
