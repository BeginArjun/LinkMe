import { AnimatePresence } from "framer-motion";
import { lazy, MouseEventHandler, Suspense, useCallback, useState, useMemo, useEffect } from "react";
import Modal from "../../../Modal";
import { ModalHeader, ModalBackBtn, ModalCloseBtn, ModalBody } from "../../../Modal/Utils";
import Image from "next/image";
import { FiFile } from "react-icons/fi";
import { Api } from "../../../../../utils/apis";
import { uploadFile } from "../../../../utils/uploadFile";

const IconPreview = lazy(() => import('./IconPreview.jsx'));
const TablerIconSelector = lazy(() => import('./TablerIconSelector'));

const ThumbnailOption = ({img, title, description, onClick} : {img: string, title : string, description : string, onClick : MouseEventHandler}) => {
    return(
        <button className="flex justify-between items-center border p-2 w-full rounded-xl hover:border-slate-400" onClick={onClick}>
            <Image src={img} alt={title} width={50} height={50} />
            <div className="flex flex-col justify-between items-center gap-1 w-full">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </button>
    )
}

const UploadThumbnail = ({onSelect} : {onSelect : (icon : string)=>void;}) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          setFile(selectedFile);
          console.log('File selected:', selectedFile);
        }
    };

    const handleDragOver = (e : React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const selectedFile = e.dataTransfer.files?.[0];
        if (selectedFile) {
          setFile(selectedFile);
          console.log('File selected:', selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file) {
          console.log('File submitted:', file);
          // Add your upload logic here
            const {client, storage, BUCKET_ID} = await uploadFile(file);
            if(storage) {
                const normalizedFileName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                console.log("Normalized File Name : ",normalizedFileName)
                const response = await storage.createFile(BUCKET_ID,normalizedFileName,file);
                if(response.$id) {
                    console.log("File uploaded successfully");
                    onSelect(`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${normalizedFileName}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);
                }
            }
        } else {
          console.log('No file selected.');
        }
    };
    
      const handleReset = () => {
        setFile(null);
        console.log('File input cleared.');
      };

    return(
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative w-full px-4 py-2 min-h-[150px] border-2 border-dashed border-pink-500 flex flex-col justify-center items-center cursor-pointer hover:border-pink-900 transition-all ease-in duration-100">
                <input type="file" name="file" 
                className="absolute z-20 invisible w-full h-full" id="file" onChange={handleFileChange}
                />
                <FiFile className="text-2xl"/>
                <p>Select file or upload, 
                    <span className="before:content-[<br/>]">or drag-and-drop file here</span>
                </p>
            </label>
            <div className="w-full grid grid-cols-2 gap-3 mt-3">
                <button type="reset" className="border border-black bg-white hover:bg-gray-200 active:shadow-none px-4 py-2 rounded-full font-medium text-lg shadow-[2px_2px_0_0_#000] transition-all duration-75 ease-in">Clear</button>
                <button type="submit" title="Upload File" className="bg-[--brand-primary] hover:bg-pink-500 border border-black active:shadow-none disabled:bg-slate-500 disabled:cursor-not-allowed px-4 py-2 rounded-full font-medium text-lg shadow-[2px_2px_0_0_#000] transition-all duration-75 ease-in" disabled={file===null}>Upload</button>
            </div>
        </form>
    )
}

const THUMBNAIL_OPTIONS = [
    {
        img : '/assets/thumbnail-own.gif',
        title : 'Upload your own thumbnail',
        description : 'Choose an image or GIF from your device',
        component : 'UploadThumbnail'
    },
    {
        img : '/assets/tabler.webp',
        title : 'Choose from Tabler Icons',
        description : 'Select from a library of icons',
        component : 'TablerIcons'
    }
]



export default function Icon({linkid} : {linkid: string}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState('ThumbnailOption');
    const [icon, setIcon] = useState<{icon : null | string, iconType : null | "TABLER" | "IMAGE"}>({icon : null, iconType : null});

    useEffect(()=>{
        const requestIconUpdate = async () => {
            console.log("Icon : ",icon)
            const req = await Api.updateLink(linkid, icon);
            console.log(req)
        }
        requestIconUpdate();
    },[icon])

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentView('ThumbnailOption');
    }

    const renderView = useCallback(() => {
        switch(currentView) {
            case 'ThumbnailOption' : 
                return THUMBNAIL_OPTIONS.map((option, index) => (
                    <ThumbnailOption key={index} img={option.img}
                     title={option.title} description={option.description}
                     onClick={() => setCurrentView(option.component)}
                     />
                ))

            case 'UploadThumbnail' :
                return <UploadThumbnail onSelect={(icon:string)=>{
                    setIcon({icon : icon, iconType : 'IMAGE'});
                    // setCurrentView('IconPreview');
                }}/>

            case 'TablerIcons' :
                return <TablerIconSelector onSelect={(icon:string)=>{
                    setIcon({icon : icon, iconType : 'TABLER'});
                    setCurrentView('IconPreview');
                }}/>

            case 'IconPreview' :
                return <IconPreview icon={icon} onChange={()=>{
                    // setIcon({icon : null, iconType : null});
                    setCurrentView('ThumbnailOption');
                }
                } 
                onRemove={()=>console.log("Removing....")}/>

            default : 
                return null;
        }
    }, [currentView]);

    const goToThumbnailOption = useCallback(()=>{
        setCurrentView('ThumbnailOption');
    },[])



    return(
        <div className="flex flex-col justify-between items-center gap-3 px-3 py-5">
            <p className="font-light text-slate-500">Add a Thumbnail or Icon to this Link</p>
            <button 
            onClick={openModal}
            className="bg-[--brand-primary] w-1/2 hover:bg-pink-500 active:shadow-none border-[1px] border-black shadow-[2px_2px_0_0_#000]  px-2 py-3 rounded-full font-semibold text-white">
                Set Icon
            </button>

            {/* Modal */}
            <AnimatePresence mode="wait">
                {
                    isModalOpen && (
                        <Modal size="small" onClose={closeModal} onBack={goToThumbnailOption}>
                            <ModalHeader>
                                <ModalBackBtn/>
                                <h1 className="text-xl font-semibold">
                                    {currentView === 'ThumbnailOption' ? 'Choose a Thumbnail' : 'Add a Thumbnail'}
                                </h1>
                                <ModalCloseBtn/>
                            </ModalHeader>
                            <ModalBody>
                                    <Suspense fallback={<p>Loading...</p>}>
                                        {renderView()}
                                    </Suspense>
                            </ModalBody>
                        </Modal>
                    )
                }
            </AnimatePresence>

        </div>
    )
}