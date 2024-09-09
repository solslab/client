'use client';

import { useState } from "react";
import DeletionConfirm from "./deletionConfirm";

export default function DeletionBtn() {
    const [modalVisible,setModalVisible] = useState(false);
  return (
    <>
    <div className="w-full flex justify-end py-8">
      <button onClick={()=>setModalVisible(true)} className="text-gray-70 text-xl">탈퇴하기</button>
    </div>
    {
        modalVisible&& 
        <DeletionConfirm setVisible={setModalVisible}/>
    }
    </>
    
  );
}
