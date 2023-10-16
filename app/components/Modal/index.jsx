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
import Button,{IconButton} from '../Button';
import {useDisclosure} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback } from 'react';
import { useUser } from '../../context/User';

const Component=(props)=>{
    const { isOpen, onOpen, onClose }=useDisclosure();
    const {user,setUser}=useUser();
    const {load,url}=props;
    const handleSubmit=useCallback(async(e)=>{
        e.preventDefault();
        const fetch=async()=>{
            try{
                if(props.method==='post'){
                const {data}=await axios.post(url,load)
                setUser({...user,...data})
                console.log(user)
                }
                if(props.method==='patch'){
                    const {data}=await axios.patch(url,load)
                    setUser({...user,...data})
                    console.log(user)
                }
            }
            catch(err){
                console.log(err)
            }
            finally{
                onClose();
            }
        }
        fetch();
    },[load,url,onClose,props.method])
    return(
        <>
        <IconButton className={`${props.variant==='secondary'?'shadow-none hover:bg-base':''}`} onClick={onOpen} variant={props.variant} icon={props.icon}>{props.display   || ''}</IconButton>

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