import { useRef, useEffect } from 'react';

export default function AudioTrack({ track }: any) {
  const trackRef: any = useRef();

  useEffect(() => {
    let child = track.attach();
    trackRef.current.classList.add(track.kind);
    trackRef.current.appendChild(child);
    // eslint-disable-next-line
  }, []);

  return <div ref={trackRef}></div>;
}
