import React from 'react'

const SummaryCard = (props) => {
    const summaryCardStyle = {
        WebkitBoxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.15)",
        MozBoxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.15)",
        boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.15)"
      };

  return (
    <div className='flex' style={summaryCardStyle}>
        <div className='flex bg-primary text-white justify-center items-center px-4 text-3xl'>
            {props.icon}
        </div>
        <div className='pl-4 py-1'>
            <p className='font-semibold text-lg'>{props.heading}</p>
            <p className='font-bold text-xl'>{props.value}</p>
        </div>
    </div>
  )
}

export default SummaryCard