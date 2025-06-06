

const Loading = () => {

    return (
        <div className="p-8">
            <div className="p-6 flex  justify-center items-center h-screen">
                <div className="flex items-start justify-center h-screen">
                    <div className="w-96 p-5 rounded-xl shadow-lg bg-white animate-pulse space-y-3">
                        <div className="h-6 w-2/3 bg-slate-300 rounded" />
                        <div className="h-4 w-full bg-slate-300 rounded" />
                        <div className="h-4 w-5/6 bg-slate-300 rounded" />
                        <div className="h-4 w-4/6 bg-slate-300 rounded" />
                        <div className="h-4 w-2/3 bg-slate-300 rounded" />
                        <p>Cargando datos...</p>
                    </div>

                </div>

            </div>

        </div>
    );

}


export default Loading;
