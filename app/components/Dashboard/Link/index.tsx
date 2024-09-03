'use client';
// import { Switch } from "@chakra-ui/react";
import { FaGripVertical } from "react-icons/fa6";
import { FiEdit3, FiShare, FiImage, FiCalendar, FiBarChart , FiTrash2, FiLayout, FiX   } from "react-icons/fi";
import { useDragControls, Reorder, AnimatePresence } from "framer-motion";
import Tooltip from "../Tooltip";
import LinkActionItem from "../LinkActionItem";
import {useState } from "react";
import './index.css'
import Layout from "../ActionChildren/Layout";
import Icon from "../ActionChildren/Icon";
import Schedule from "../ActionChildren/Schedule";
import Modal from "../../Modal";
import { ModalBody, ModalCloseBtn, ModalHeader } from "../../Modal/Utils";
import Switch from "../../Switch";
import { Api } from "../../../../utils/apis";
import { useDispatch } from "react-redux";
import { updateLink } from "../../../../redux/slice/linkSlice";

type ActiveAction = 'layout' | 'icon' | 'schedule' | 'analytics';

type ActionTabType = {
    [key in ActiveAction]: {
        component : JSX.Element,
        title : string
    }
}

const DeleteBtn = ()=>{
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return(
        <div>
            <Tooltip title="Delete">
                <FiTrash2 color="red" onClick={openModal} className="cursor-pointer"/>
            </Tooltip>
            {
                isOpen && (
                    <AnimatePresence mode="wait">
                        <Modal size="small" onClose={closeModal}>
                            <ModalHeader>
                                <h2 className="text-lg font-semibold text-black">Delete Link</h2>
                                <ModalCloseBtn/>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-black font-medium text-lg">Are you sure you want to delete this link?</p>
                                <p className="text-red-500 font-light text-sm">
                                   <span className="font-medium">Note : </span> 
                                This action is irreversible</p>
                                <div className="flex justify-between items-center gap-4 w-full">
                                    <button className="bg-white w-1/2 hover:bg-slate-200 active:shadow-none border-[1px] border-black shadow-[2px_2px_0_0_#000] px-2 py-3 rounded-full font-semibold text-black"
                                    onClick={closeModal}
                                    >No</button>
                                    <button
                                    onClick={closeModal}
                                    className="bg-[--brand-primary] w-1/2 hover:bg-pink-500 active:shadow-none border-[1px] border-black shadow-[2px_2px_0_0_#000]  px-2 py-3 rounded-full font-semibold text-black hover:text-white">Yes</button>
                                </div>
                            </ModalBody>
                        </Modal>
                    </AnimatePresence>
                )
            }
        </div>
    )
}

export default function LinkItem({ link  } : {link : any}) {
    const dragControls = useDragControls();
    const [isActive, setIsActive] = useState<ActiveAction | null>(null);
    const dispatch = useDispatch()
    console.log("Link : ", link)

    const [formData, setFormData] = useState({
        title : link.title,
        url : link.url,
        icon : link.icon,
        visible : link.visible
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        console.log(checked)
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if(type==='checkbox'){
            handleSubmit({visible : checked})
        }

        const newLink = {
            ...link,
            [name] : type === 'checkbox' ? checked : value
        }

        dispatch(updateLink(newLink))
    };
    

    const handleSubmit = async (data:any)=>{
        console.log("Data : ", data)
        const req = await Api.updateLink(link.id, {...data});
        console.log(req)
    }

    
    const ActionTab : ActionTabType  = {
        'layout' : {
            component : <Layout linkid={link.id} currLayout={link.layout} />,
            title : 'Layout'
        },
        'icon' : {
            component : <Icon linkid={link.id}/>,
            title : 'Add a thumbnail'
        },
        'schedule' : {
            component : <Schedule/>,
            title : 'Schedule'
        },
        'analytics' : {
            component : <p>Analytics</p>,
            title : 'Track your link'
        },
    }

    return (
        <Reorder.Item value={link} dragListener={false} dragControls={dragControls} className="max-h-none opacity-100 will-change-auto">
            <div className="flex flex-col w-full p-4 bg-white border-[1px] rounded-lg shadow-md gap-3">
                <div className="flex justify-start items-center w-full rounded-xl gap-4 p-2">
                    <div
                        className="cursor-grab"
                        onPointerDown={(e) => dragControls.start(e)}
                    >
                        <FaGripVertical />
                    </div>
                    <div className="flex justify-between items-center gap-4 w-full">
                        <div className="flex flex-col">
                            <label className="flex justify-center items-center">
                                <input type="text" name="title"
                                onChange={handleChange}
                                onBlur={()=>handleSubmit({title : formData.title})}
                                onKeyDown={(e)=>e.key==='Enter' && handleSubmit({title : formData.title})}
                                placeholder="Untitled" value={formData.title} className="min-w-[1px]" />
                                <FiEdit3 />
                            </label>
                            <label className="flex justify-center items-center">
                                <input type="text" name="url"
                                placeholder="https://www.your-link.com" 
                                value={formData.url} className="min-w-[1px]"
                                onChange={handleChange}
                                onBlur={()=>handleSubmit({link : formData.url})}
                                onKeyDown={(e)=>e.key==='Enter' && handleSubmit({link : formData.url})}
                                />
                                <FiEdit3 />
                            </label>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <FiShare />
                            <Switch checked={formData.visible} onChange={handleChange} size="small"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around items-center gap-3 relative">
                    <LinkActionItem title="Layout" icon={FiLayout} setIsActive={setIsActive} isActive={isActive}/>
                    <LinkActionItem title="Icon" icon={FiImage} setIsActive={setIsActive} isActive={isActive}/>
                    <LinkActionItem title="Schedule" icon={FiCalendar} setIsActive={setIsActive} isActive={isActive}/>
                    <LinkActionItem title="Analytics" icon={FiBarChart} setIsActive={setIsActive} isActive={isActive}/>
                    <DeleteBtn/>
                </div>
                    <div className={`${isActive!==null?'visibility-visible':'visibility-hidden'}`}>
                        <div className="bg-slate-300 border-[1px] w-full relative h-9">
                            <p className="capitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">{isActive && ActionTab[isActive]?.title}</p>
                            <div className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer w-fit h-fit px-3 py-1">
                                <FiX className="text-black relative inline-block" onClick={()=>setIsActive(null)}/>
                            </div>
                        </div>
                        <div className={`action-container ${isActive ? 'h-auto' : 'h-0'}`}>
                            {isActive!==null?ActionTab[isActive]?.component:<></>}
                        </div>
                    </div>
            </div>
        </Reorder.Item>
    );
}