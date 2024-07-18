import Image from "next/image";
type Props ={
    width:number,
    height:number,
    src:string,
}
export default function ImageServer({width,height,src}: Props) {
  return (
    <Image width={width} height={height} src={`http://localhost:3000${src}`} alt={src}/>
  )
}