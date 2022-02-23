import { useContext, useRef, useEffect } from "react";
import GlobalState from "../../Context/Context";
import s from "./Carousel.module.css";
import gsap from "gsap";

const Carousel = () => {
  const { text } = useContext(GlobalState);
  const arrayChar = Array.from(text);
  const arrayLength = arrayChar.length;
  const sceneRef = useRef();
  const carouselRef = useRef();
  const carouselCells = gsap.utils.selector(carouselRef);

  useEffect(() => {
    gsap.to(carouselRef.current, {
      rotateY: "-=360",
      duration: "20",
      repeat: "-1",
      ease: "linear",
    });
    gsap.to(carouselRef.current, {
      rotateX: 10,
      duration: "15",
      repeat: -1,
      yoyo: true,
      ease: "elastic.out(2.5, 1)",
    });
  }, []);

  useEffect(() => {
    gsap.to(sceneRef.current, {
      transform: `scale(${1.5 / Math.log(arrayLength)})`,
    });

    carouselCells(carouselRef.current.children).forEach((cell, index) => {
      const deg = (360 / arrayLength) * (index + 1);
      const tz = Math.round(210 / 2 / Math.tan(Math.PI / arrayLength));

      cell.style.transform = `rotateY(${deg}deg) translateZ(${tz}px) `;
    });
  }, [arrayLength, carouselCells, text]);

  return (
    <div className={s.container}>
      <div className={s.scene} ref={sceneRef}>
        <div className={s.carousel} ref={carouselRef}>
          {arrayChar.map((char, index) => {
            return (
              <div key={index} className={s.carousel_cell}>
                <div className={s.carousel_cell_text}>{char}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
