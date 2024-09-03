'use client'
import { useUser } from "../context/User";
import Header from "../components/Dashboard/Header"
import AddLink from "../components/Dashboard/AddLink";
import AddHeader from "../components/Dashboard/AddHeader";
import ViewArchive from "../components/Dashboard/ViewArchive";
import LinkList from "../components/Dashboard/LinkList";


const Dashboard=()=>{



    return(
        <div className="">
            <div className="min-h-screen h-auto border-x-2 p-3 flex flex-col gap-4">
                <Header/>
                <AddLink/>
                <div className="flex justify-between items-center">
                    <AddHeader/>
                    <ViewArchive/>
                </div>
                <LinkList/>
            </div>
        </div>
    )
}
export default Dashboard;