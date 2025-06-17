import Image from "next/image";
import React from "react";

const NavbarDashboard: React.FC = () => {
    return(
        <>
            {/* Navbar del Dashboard */}
                <div className="flex flex-col items-center pl-8 pt-4 bg-[rgb(240,241,244)]  md:flex-col md:items-center lg:flex-row lg:items-center lg:justify-start">
                    <Image
                            src="/iconoKasapp.png"
                            alt="Logo"
                            width={100}
                            height={98}
                            className="h-[30px] w-auto  md:h-[80px] md:w-auto md:mt-0 lg:h-[70px] lg:w-auto lg:ml-5 object-cover"
                    />
                    <span className="text-3xl font-bold text-[#4A0E1B] mt-2 md:mt-0 lg:mt-0 lg:ml-2.5">
                            KasApp
                    </span>
                </div>
            
        </>

)}

export default NavbarDashboard