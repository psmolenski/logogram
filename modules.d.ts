declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}