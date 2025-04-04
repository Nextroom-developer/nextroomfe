declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gtag: (...args: any[]) => void;
}
