function Buttons({ dados }) {
    return (
        <>
            {
                dados.map((pegaDados, index) => (
                    <div className={pegaDados.divStyle} index={index}>
                        <div className="max-w- bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
                            <button onClick={pegaDados.handle} className="px-5 py-2"><a className href>{pegaDados.title}</a></button>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default Buttons;
