import {useId} from 'react';

/** Pixel geometry only: callers own physical scales, tick values and labels. */
export function PlotGrid({left,top,width,height,xAxisY=top+height,yAxisX=left,gridSize=20,majorEvery=5,xDirection=1,yDirection=1,showXAxis=true,showYAxis=true}:{left:number;top:number;width:number;height:number;xAxisY?:number;yAxisX?:number;gridSize?:number;majorEvery?:number;xDirection?:1|-1;yDirection?:1|-1;showXAxis?:boolean;showYAxis?:boolean}) {
 const id=useId().replaceAll(':',''), minor=`plot-minor-${id}`, major=`plot-major-${id}`;
 const right=left+width,bottom=top+height,xTip=xDirection===1?right+12:left-12,yTip=yDirection===1?top-12:bottom+12;
 return <g className="plot-grid" aria-hidden="true">
  <defs>
   <pattern id={minor} x={yAxisX} y={xAxisY} width={gridSize} height={gridSize} patternUnits="userSpaceOnUse"><path d={`M${gridSize} 0H0V${gridSize}`} fill="none" stroke="#dfe8ed" strokeWidth=".8"/></pattern>
   <pattern id={major} x={yAxisX} y={xAxisY} width={gridSize*majorEvery} height={gridSize*majorEvery} patternUnits="userSpaceOnUse"><rect width={gridSize*majorEvery} height={gridSize*majorEvery} fill={`url(#${minor})`}/><path d={`M${gridSize*majorEvery} 0H0V${gridSize*majorEvery}`} fill="none" stroke="#bdccd3" strokeWidth="1"/></pattern>
  </defs>
  <rect x={left} y={top} width={width} height={height} fill={`url(#${major})`}/>
  <g fill="#526961" stroke="#526961" strokeWidth="1.5">
   {showXAxis&&<><path d={`M${xDirection===1?left:right} ${xAxisY}H${xTip}`} fill="none"/><path d={`M${xTip} ${xAxisY}l${-xDirection*8} -4v8Z`} stroke="none"/></>}
   {showYAxis&&<><path d={`M${yAxisX} ${yDirection===1?bottom:top}V${yTip}`} fill="none"/><path d={`M${yAxisX} ${yTip}l-4 ${yDirection*8}h8Z`} stroke="none"/></>}
  </g>
 </g>;
}
