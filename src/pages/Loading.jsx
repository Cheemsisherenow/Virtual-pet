import React from 'react'

const Loading = React.forwardRef((props, ref) => {
  // Loading page
  return (
    <div ref={ref} className="absolute text-8xl flex inset-0 bg-[#e3f3ff] z-50 w-screen h-screen items-center justify-center">
      <div className="loader">Loading…</div> 
    </div>
  )
})

export default Loading
