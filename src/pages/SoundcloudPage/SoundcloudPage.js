import React from 'react';
import './SoundcloudPage.css';

export default function SoundcloudPage() {
  return (
    <div className='SoundcloudPage'>
      <h1 className='underline'>Soundcloud</h1>
      <iframe
        id='sc-widget'
        src='http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Fusers%2F2&show_artwork=true&show_comments=false&color=ff00ff&show_playcount=false&liking=false'
        width='100%'
        height='465'
        scrolling='no'
        frameborder='no'
      ></iframe>
    </div>
  );
}
