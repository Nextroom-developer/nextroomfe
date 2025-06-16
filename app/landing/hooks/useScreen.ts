import { useEffect, useRef, useState } from "react";

const useScreen = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showBtn, setShowBtn] = useState(false); // Btn 컴포넌트의 가시성 상태
  const component1Ref = useRef<HTMLDivElement | null>(null);
  const component7Ref = useRef<HTMLDivElement | null>(null);
  const component9Ref = useRef<HTMLDivElement | null>(null); // Component9의 참조 추가

  const handleScroll = () => {
    if (component1Ref.current) {
      const rect1 = component1Ref.current.getBoundingClientRect();
      setShowBtn(rect1.bottom < window.innerHeight - 230);
    }

    if (component9Ref.current) {
      const rect9 = component9Ref.current.getBoundingClientRect();
      if (rect9.top <= window.innerHeight) {
        // Component9가 화면에 보이면 버튼 숨기기
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
    component7Ref,
    component9Ref,
  };
};

export default useScreen;
