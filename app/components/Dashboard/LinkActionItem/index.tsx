'use client';
import React, { useState } from "react";
import Tooltip from "../Tooltip";

type ActiveAction = 'layout' | 'icon' | 'schedule' | 'analytics';

export default function LinkActionItem({ title, icon: Icon, setIsActive, isActive } 
    : {title : string, icon : React.FC, setIsActive : React.Dispatch<React.SetStateAction<any>>, isActive : ActiveAction | null}) {   
    
        const handleClick = () => {
            setIsActive((prev : string)=>{
                if(prev === title.toLowerCase()) return null;
                return title.toLowerCase();
                });
        };

    const styles = {
        backgroundColor : isActive===title.toLowerCase()? "var(--brand-primary)" : "transparent",
        transition : "background-color 0.5s",
        transitionTimingFunction : "ease-in",
        transitionDelay : "0.5s",
    }

    return (
        <div className="relative min-h-full rounded-md" style={styles}>
            <div onClick={handleClick} className="cursor-pointer z-20 p-2">
                <Tooltip title={title}>
                    <Icon />
                </Tooltip>
            </div>
        </div>
    );
}
