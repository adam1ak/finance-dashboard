import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import SlidingModal from './SlidingModal';
import AddTransaction from './AddTransaction';

function Dashboard() {

    const [showAddModal, setShowModal] = useState(false)

    const toggleAddModal = () => {
        setShowModal((prev) => !prev)
    }

    const handleLogOut = () => {
        signOut(auth).then(() => {
            console.log("signed out");
        }).catch(() => {
            console.log("error")
        })
    }

    return (
        <div>
            <SlidingModal
                isOpen={showAddModal}
                closeModal={toggleAddModal}
            >
                <AddTransaction/>
            </SlidingModal>
            <p>Dashboard</p>
            <button
                className="
                    bg-red-700 p-10
                "
                onClick={() => handleLogOut()}>
                Log Out
            </button>
            <button
                className="
                    bg-green-700 p-10
                "
                onClick={() => toggleAddModal()}>
                Add
            </button>
        </div>
    )
}

export default Dashboard;
