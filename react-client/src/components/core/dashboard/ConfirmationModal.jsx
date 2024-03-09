import IconBtn from "../../common/IconBtn";


export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-blue-400 bg-gradient-to-b from-blue-300/25 via-white/35 to-green-200/25  p-6">
        <p className="text-2xl font-semibold ">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 ">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md outline-red-600 outline hover:bg-red-600 py-[8px] px-[20px] font-semibold "
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
