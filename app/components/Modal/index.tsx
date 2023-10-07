'use client'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import Button from '../Button';
import {useDisclosure} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback } from 'react';

interface Props{
    children?:React.ReactNode;
    display:string;
    title:string;
    actionButton:string;
    method?:string;
    load?:Object;
    url?:string;
}
const Component=(props:Props)=>{
    const { isOpen, onOpen, onClose }=useDisclosure();
    const {load,url}=props;
    const handleSubmit=useCallback(async(e)=>{
        e.preventDefault();
        const fetch=async()=>{
            try{
                if(props.method==='post'){
                const {data}=await axios.post(url,load)
                console.log(data)
                }
                if(props.method==='patch'){
                    const {data}=await axios.patch(url,load)
                    console.log(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        fetch();
    },[load,url])
    return(
        <>
        <Button onClick={onOpen}>{props.display}</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    <Button className='bg-[--brand-primary] font-bold w-full' onClick={handleSubmit}>{props.actionButton}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
export default Component;