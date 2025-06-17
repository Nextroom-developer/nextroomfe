import { useEffect, useRef, useState } from "react";

const useScreen = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showBtn, setShowBtn] = useState(false); // Btn 컴포넌트의 가시성 상태
  const component1Ref = useRef<HTMLDivElement | null>(null);
  const component2Ref = useRef<HTMLDivElement | null>(null);
  const component4Ref = useRef<HTMLDivElement | null>(null);
  const component6Ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (component1Ref.current) {
      const rect1 = component1Ref.current.getBoundingClientRect();
      setShowBtn(rect1.bottom < window.innerHeight - 320);
    }

    if (component4Ref.current) {
      const rect4 = component4Ref.current.getBoundingClientRect();
      if (rect4.top <= window.innerHeight) {
        // Component4가 화면에 보이면 버튼 숨기기
        setShowBtn(false);
      }
    }
  };

  useEffect(() => {
    const { userAgent } = window.navigator;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
    setIsMobile(mobileRegex.test(userAgent));
    setIsLoading(true);
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트되면 이벤트 리스너를 정리
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isMobile,
    isLoading,
    showBtn,
    component1Ref,
    component2Ref,
    component6Ref,
    component4Ref,
  };
};

export default useScreen;
