function ErrorPage() {

    return (
        <div 
            className="
                flex flex-col justify-center items-center
                bg-gradient-to-br from-blue-600 to-blue-800 h-screen
                font-bold text-white
                select-none
            ">
            <h1 className="text-[14rem] bg-none">404</h1>
            <h2 className="-mt-10 text-2xl uppercase">page not found</h2>
            <button
                onClick={() => window.history.back()}
                className="uppercase mt-1"
            >
                Go back
            </button>
        </div>
    )
}

export default ErrorPage;