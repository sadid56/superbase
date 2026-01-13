/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import DatePickerDialog from "./date-picker-dialog";
import { calculateEndDate, formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { Container } from "../global/Container";
import { Calendar, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

type HeroItem = {
  value: string;
};

const Hero = () => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const heroItems: HeroItem[] = [
    { value: "$35 for 5 days" },
    { value: "$70 for 10 days" },
    { value: "$105 for 15 days" },
    { value: "$140 for 20 days" },
  ];

  const formattedDate = selectedDate ? formatDate(selectedDate) : "";

  const endDate = useMemo(() => {
    if (!selectedDate || selectedWeek === null) return "";
    return calculateEndDate(selectedDate, selectedWeek);
  }, [selectedDate, selectedWeek]);

  return (
    <div className='flex flex-col'>
      <header
        className={cn(
          "bg-[linear-gradient(180deg,#5D06E905_2%,#1C1DF621_90%)] py-[48px] md:py-[96px] relative overflow-visible md:overflow-hidden",
          selectedWeek === null ? "min-h-[calc(100vh-224px)]" : ""
        )}
      >
        {/* Decorative Stars */}
        <img src='/star.png' alt='' className='absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-12 md:h-12' />
        <img src='/star.png' alt='' className='absolute bottom-[30%] right-4 md:right-16 w-[60px] h-[60px] md:w-[98px] md:h-[98px]' />

        <Container className='relative z-10'>
          <div className='flex items-center gap-2 text-custom-gray mb-6'>
            <ChevronRight className='w-4 h-4 rotate-180' />
            <span className='text-13 md:text-15'>Regular aftercare program</span>
          </div>

          <h2 className='text-[24px] md:text-[32px] leading-[32px] font-medium text-custom-primary mb-2'>
            How many weeks you like to continue?
          </h2>
          <p className='text-custom-gray mb-8 md:mb-10 text-sm md:text-base'>Based on your selection Mon, Tue, Thu, Fri, Sat </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            {heroItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (selectedWeek === idx) {
                    setSelectedWeek(null);
                    setSelectedDate(null);
                  } else {
                    setSelectedWeek(idx);
                  }
                }}
                className={`bg-white p-6 rounded-[8px] border transition-all cursor-pointer relative flex flex-col items-center text-center border-gray-100 shadow-sm hover:border-gray-200`}
              >
                <div
                  className={`absolute top-3 right-3 w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedWeek === idx ? "border-[#5D06E9] bg-[#5D06E9]" : "border-gray-200"
                  }`}
                >
                  {selectedWeek === idx && (
                    <svg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M1 4L4 7L9 1' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  )}
                </div>

                <div className=''>
                  <img src='/image.png' width={100} height={100} alt='' className='w-20 h-20 md:w-24 md:h-24 object-contain' />
                </div>
                <h6 className='font-medium text-15 mt-6 text-custom-primary leading-[12px]'>
                  {idx + 1} WEEK{idx > 0 && "S"}
                </h6>
                <p className='text-custom-gray text-[13px] mt-2'>{item.value}</p>
              </div>
            ))}
          </div>

          {selectedWeek !== null && (
            <div className='bg-white rounded-[8px] p-6 shadow-[0px_20px_40px_0px_#00000005] border border-gray-100'>
              <div className='py-[20px] md:py-[30px] text-center'>
                <h5 className='font-bold text-custom-primary mb-2 text-[15px] leading-[15px]'>
                  {selectedWeek + 1} WEEK{selectedWeek > 0 ? "S" : ""}
                </h5>
                <p className='text-custom-gray text-[13px] mb-6'>
                  ({selectedWeek + 1} Weeks X 5 Days) = {(selectedWeek + 1) * 5} Days
                </p>
              </div>

              <div className={selectedDate ? "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" : "w-full"}>
                <div className='relative'>
                  {selectedDate && (
                    <label className='text-[12px] text-custom-gray absolute -top-2 left-3 bg-white px-1 z-10 font-medium'>Start date</label>
                  )}
                  <div
                    onClick={() => setIsDialogOpen(true)}
                    className='w-full border border-[#DDDDDD] rounded-[4px] py-3 px-4 text-sm flex items-center justify-between cursor-pointer hover:border-custom-primary transition-colors'
                  >
                    <span className={selectedDate ? "text-custom-primary" : "text-custom-gray"}>{formattedDate || "Start Date"}</span>
                    <Calendar className='w-4 h-4 text-gray-400' />
                  </div>
                </div>

                {selectedDate && (
                  <div className='relative'>
                    <label className='text-[12px] text-custom-gray absolute -top-2 left-3 bg-white px-1 z-10 font-medium'>End date</label>
                    <div className='w-full border border-[#DDDDDD] rounded-[4px] py-3 px-4 text-sm flex items-center justify-between bg-gray-50'>
                      <span className={endDate ? "text-custom-primary" : "text-gray-300"}>{endDate || "mm/dd/yyyy"}</span>
                      <Calendar className='w-4 h-4 text-gray-400' />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>

        <img
          src='/dolphin.png'
          alt=''
          className='absolute bottom-0 left-[-40px] md:left-[67px] w-[150px] md:w-[211px] h-auto object-contain z-0 pointer-events-none opacity-50 md:opacity-100'
        />
      </header>

      <section className='bg-white'>
        <Container>
          <div className='py-[32px] flex flex-col sm:flex-row items-center justify-between gap-4'>
            <h3 className='text-15 font-medium text-custom-primary uppercase'>
              {selectedWeek !== null ? heroItems[selectedWeek].value : "$35 for 5 Days"} (1 Activity per Day)
            </h3>
            <div className='flex items-center gap-6'>
              <button
                onClick={() => {
                  setSelectedWeek(null);
                  setSelectedDate(null);
                }}
                className='text-custom-gray uppercase hover:text-custom-primary transition-colors font-medium'
              >
                Back
              </button>
              <Button disabled={!selectedDate} className={`btn-gradient h-12 px-10 ${!selectedDate ? "cursor-not-allowed" : ""}`}>
                Next
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <DatePickerDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onConfirm={setSelectedDate} selectedWeek={selectedWeek} />
    </div>
  );
};

export default Hero;
