export default function PaymentModal({ paymentModal, setPaymentModal }) {
  return (
    <div className={`${paymentModal ? "fixed" : "hidden"} top-0 left-0 z-20 h-screen w-screen bg-black/60`}>
      <div className="absolute left-1/2 top-1/2 z-10 h-60 w-72 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-100 md:w-96">
        <div className="rounded-t-md py-2 text-center bg-cyan-400 text-white">System</div>
        <div onClick={() => setPaymentModal(false)} className="absolute top-2 right-3 cursor-pointer font-bold">
          ❌
        </div>
        <div className="text-center mt-2 text-xl">The payment sistem is not ready yet</div>
      </div>
    </div>
  );
}
