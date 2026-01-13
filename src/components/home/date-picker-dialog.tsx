import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WheelPicker from "../ui/wheel-picker";
import { days, months, years } from "@/lib/constants";

interface DatePickerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date) => void;
  selectedWeek: number | null;
}

const DatePickerDialog = ({ isOpen, onOpenChange, onConfirm, selectedWeek }: DatePickerDialogProps) => {
  const [tempDay, setTempDay] = useState(new Date().getDate());
  const [tempMonth, setTempMonth] = useState(new Date().getMonth());
  const [tempYear, setTempYear] = useState(new Date().getFullYear());

  const handleConfirmDate = () => {
    const newDate = new Date(tempYear, tempMonth, tempDay);
    onConfirm(newDate);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[500px] bg-white p-0 overflow-hidden gap-0'>
        <div className='p-8 pb-4'>
          <DialogHeader>
            <DialogTitle className='text-[24px] font-medium text-center text-custom-primary mb-8'>
              Please select your start date
            </DialogTitle>
            <DialogDescription className='sr-only'>Select the start date for your schedule</DialogDescription>
          </DialogHeader>

          <div className='flex justify-center items-center gap-0 h-[200px] relative overflow-hidden'>
            <div className='absolute inset-0 pointer-events-none flex items-center justify-center z-10'>
              <div className='w-full h-[40px] border-y border-gray-100 bg-gray-50/30 backdrop-blur-[1px]'></div>
            </div>

            <div className='absolute top-0 left-0 right-0 h-[70px] bg-linear-to-b from-white to-transparent z-20 pointer-events-none'></div>
            <div className='absolute bottom-0 left-0 right-0 h-[70px] bg-linear-to-t from-white to-transparent z-20 pointer-events-none'></div>

            {/* Day Wheel */}
            <div className='flex-1 h-full'>
              <WheelPicker items={days} value={tempDay} onChange={setTempDay} />
            </div>

            {/* Month Wheel */}
            <div className='flex-2 h-full ml-8'>
              <WheelPicker items={months} value={months[tempMonth]} onChange={(val) => setTempMonth(months.indexOf(val as string))} />
            </div>

            {/* Year Wheel */}
            <div className='flex-1 h-full ml-12'>
              <WheelPicker items={years} value={tempYear} onChange={setTempYear} />
            </div>
          </div>

          <div className='mt-8 mb-8'>
            <p className='text-[15px] leading-[24px] text-center text-custom-gray'>
              <span className='font-bold'>NB:</span> You&apos;ve chosen a {selectedWeek !== null ? selectedWeek + 1 : 0}-week schedule
              starting on {months[tempMonth]} {tempDay}, {tempYear}, with sessions on Mon, Tue, Thu, Fri, and Sat. We&apos;ll automatically
              set your end date, and you can renew whenever you like — no worries!
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2 border-t p-6 border-gray-100'>
          <button
            onClick={() => onOpenChange(false)}
            className='flex-1 h-12 text-red-500 rounded font-bold hover:bg-gray-50 cursor-pointer text-[15px]'
          >
            CANCEL
          </button>
          <button
            onClick={handleConfirmDate}
            className='flex-1 h-12 rounded bg-[#5D06E9] text-white font-bold hover:bg-[#4C05C7] text-[15px] cursor-pointer '
          >
            CONFIRM
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DatePickerDialog;
