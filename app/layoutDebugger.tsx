'use client';
import { useEffect } from 'react';

export function LayoutDebugger() {
  useEffect(() => {
    console.log('Layout mounted');
    return () => console.log('Layout unmounted');
  }, []);
  
  return null;
}