import FloatingShape from 'FloatingShape'
import React from 'react'

const ResetPassword = () => {
  return (
    <div
    className={`min-h-screen flex place-items-center justify-center relative overflow-hidden `}
    style={{background: 'radial-gradient(circle at top left, #caf0f8, #70d5ea, #0077b6)'}}>
    ResetPassword
    <FloatingShape color="bg-cyan-400 opacity-50 shadow-lg" size="w-64 h-64" top="-5%" left="10%" delay={0} />
<FloatingShape color="bg-blue-500 opacity-40 shadow-2xl" size="w-64 h-64" top="70%" left="80%" delay={5} />
<FloatingShape color="bg-blue-500 opacity-40 shadow-lg" size="w-64 h-64" top="40%" left="-10%" delay={2} />
<FloatingShape color="bg-white opacity-30 shadow-xl" size="w-52 h-52" top="20%" left="50%" delay={3} />
<FloatingShape color="bg-cyan-300 opacity-50 shadow-lg" size="w-80 h-80" top="60%" left="20%" delay={4} />

    </div>
  )
}

export default ResetPassword