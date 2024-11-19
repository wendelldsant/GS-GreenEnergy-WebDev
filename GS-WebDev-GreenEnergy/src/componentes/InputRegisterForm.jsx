import HelpToggle from "./HelpToggle";

function InputRegisterForm({handle, placeholder, id, helpText, typeInput}) {
    return (  
        <div className="col-span-2 ">
        <div className="relative flex items-center">

        <input
            className="p-3 shadow-2xl glass w-full placeholder:italic placeholder:text-slate-400 outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
            type={typeInput ? typeInput : "text"}
            id= {id}
            placeholder={placeholder}
            required
            onChange={handle}
        />
        {helpText &&  <HelpToggle texto={helpText} />}
        </div>
    </div>
    );
}

export default InputRegisterForm;