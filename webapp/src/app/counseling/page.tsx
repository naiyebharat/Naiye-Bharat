// @ts-nocheck

"use client";

import React, { useState, useEffect } from "react";
import IntakeForm from "./components/IntakeForm";
import ExpertMatches from "./components/ExpertMatches";
import SecureChat from "./components/SecureChat";

export default function CounselingPage() {
  // Step tracker: 1 = Form, 2 = Matchmaker List, 3 = Chat Room
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null); // 🔥 Added Room ID state

  // Recovery layer tracking logic
  useEffect(() => {
    const savedOrderId = localStorage.getItem("current_active_order_id");
    const savedRoomId = localStorage.getItem("current_active_room_id");
    const savedStep = localStorage.getItem("current_active_step");
    
    if (savedOrderId && savedStep) {
      setCurrentOrderId(savedOrderId);
      setActiveStep(Number(savedStep) as 1 | 2 | 3);
    }
    if (savedRoomId) {
      setActiveRoomId(savedRoomId);
    }
  }, []);

  // Central step controller engine helper
  const handleStepTransition = (step: 1 | 2 | 3, orderId: string | null, roomId: string | null = null) => {
    setActiveStep(step);
    setCurrentOrderId(orderId);
    setActiveRoomId(roomId);
    
    if (orderId) {
      localStorage.setItem("current_active_order_id", orderId);
      localStorage.setItem("current_active_step", String(step));
    } else {
      localStorage.removeItem("current_active_order_id");
      localStorage.removeItem("current_active_step");
    }

    if (roomId) {
      localStorage.setItem("current_active_room_id", roomId);
    } else {
      localStorage.removeItem("current_active_room_id");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#050b1d] transition-colors duration-300">
      {activeStep === 1 && (
        <IntakeForm 
          onSuccess={(orderId) => handleStepTransition(2, orderId)} 
        />
      )}
      
      {activeStep === 2 && (
        <ExpertMatches 
          orderId={currentOrderId} 
          onBack={() => handleStepTransition(1, null)}
          // 🔥 On success, we transition to step 3 and store the verified room ID
          onUnlock={(roomId) => handleStepTransition(3, currentOrderId, roomId)}
        />
      )}
      
      {activeStep === 3 && (
        <SecureChat 
          orderId={currentOrderId}
          roomId={activeRoomId} // 🔥 Passed active generated chatroom token to your layout
          onReset={() => handleStepTransition(1, null)}
        />
      )}
    </main>
  );
}