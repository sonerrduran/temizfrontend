import { useState } from 'react';
import FastReadingMenu from '../fast-reading/FastReadingMenu';

export default function FastReadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <FastReadingMenu />
    </div>
  );
}
