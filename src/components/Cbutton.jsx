function Cbutton({ label, onClick, className }) {
  return (
    // <button onClick={onClick} className={`btn ${className}`}>
    //   {label}

    // </button>

    <div className="flex justify-center items-center h-screen w-full">
      <iframe
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
        width={800}
        height={450}
        src="https://embed.figma.com/proto/yzW3SNn2EahTKunr4H46nx/Lefay?page-id=0%3A1&node-id=2-10&p=f&viewport=-778%2C99%2C0.56&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2%3A10&embed-host=share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Cbutton;
