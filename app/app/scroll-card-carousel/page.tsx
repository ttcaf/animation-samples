'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function ScrollCardCarousel() {

  gsap.registerPlugin(useGSAP);
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({scope: containerRef});
  const cards = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  let currentIndex = 0;

  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        // toggleClass: {
        //   targets: pinRef.current,
        //   className: 'fixed top-0 left-0',
        // },
        onEnter: () => {
          pinRef.current?.classList.add('fixed', 'top-0', 'left-0');
        },
        onLeave: () => {
          pinRef.current?.classList.remove('fixed', 'top-0', 'left-0');
          pinRef.current?.classList.add('top-auto','bottom-0', 'left-0');
        },
        onEnterBack: () => {
          pinRef.current?.classList.add('fixed', 'top-0', 'left-0');
          pinRef.current?.classList.remove('top-auto','bottom-0', 'left-0');
        },
      }
    })
    const triggers =  gsap.utils.toArray(triggerRef.current?.querySelectorAll('div') || []);
    triggers.forEach((trigger, index) => {
      ScrollTrigger.create({
        trigger: trigger as HTMLElement,
        start: 'top top',
        end: 'bottom top',
        markers: true,
        onEnter: () => {
          currentIndex = index;
          gsap.to(cards.current as HTMLElement, {
            rotate: -index * 3 - 3,
            ease: 'power2.inOut',
          })
        },
        onLeaveBack: () => {
          currentIndex = index;
          gsap.to(cards.current as HTMLElement, {
            rotate: -index * 3,
            ease: 'power2.inOut',
          })
        }
      })
    })
  })

  const handlePrev = contextSafe(() => {
    currentIndex = currentIndex - 1;
    console.log(currentIndex);
    gsap.to(window, 
      {
        duration: 1,
        scrollTo: `#trigger-${currentIndex}`,
        ease: 'none',
        offsetY: 120,
      }
    )
  })
  
  const handleNext = contextSafe(() => {
    currentIndex = currentIndex + 1;
    console.log(currentIndex);
    gsap.to(window, 
      {
        duration: 1,
        scrollTo: `#trigger-${currentIndex}`,
        ease: 'none',
        offsetY: 120,
      }
    )
  })

  return (
    <div className="bg-black font-sans w-full overflow-x-hidden">
      <div ref={containerRef} className="hoge">
        <section className="w-full relative">
          <div ref={pinRef} className="w-full h-screen absolute top-0 left-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px]">
              <div ref={cards} className="origin-[50%_1250%] relative">
                <div className="bg-white w-[320px] h-[560px] relative"></div>              
                <div className="bg-yellow-500 w-[320px] h-[560px] absolute top-0 left-0 rotate-[3deg] origin-[50%_1250%]"></div>
                <div className="bg-blue-500 w-[320px] h-[560px] absolute top-0 left-0 rotate-[6deg] origin-[50%_1250%]"></div>
                <div className="bg-green-500 w-[320px] h-[560px] absolute top-0 left-0 rotate-[9deg] origin-[50%_1250%]"></div>
                <div className="bg-purple-500 w-[320px] h-[560px] absolute top-0 left-0 rotate-[12deg] origin-[50%_1250%]"></div>
              </div>
              <button type="button" onClick={handlePrev} className='text-white w-[80px] h-[80px] bg-sky-500 flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 -left-1/2 cursor-pointer'>Prev</button>
              <button type="button" onClick={handleNext} className='text-white w-[80px] h-[80px] bg-sky-500 flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 -right-1/2 cursor-pointer'>Next</button>
            </div>
          </div>
          <div ref={triggerRef}>
            <div className="h-[100vh]" id="trigger-1"></div>
            <div className="h-[100vh]" id="trigger-2"></div>
            <div className="h-[100vh]" id="trigger-3"></div>
            <div className="h-[100vh]" id="trigger-4"></div>
            <div className="h-[100vh]" id="trigger-5"></div>
          </div>
        </section>
      </div>
      <div className="h-[400vh] bg-red-500"></div>
    </div>
  );
}
