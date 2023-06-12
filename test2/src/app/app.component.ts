import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('videoPlayerRef', { static: false }) videoPlayerRef: any;

  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  trimStart: number[] = [];
  trimEnd: number[] = [];
  isTrimming: boolean = false;
  isShowingTrimmedPart: boolean = false;

  togglePlayPause() {
    const videoPlayer = this.videoPlayerRef.nativeElement;
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  }

  updateProgress() {
    const videoPlayer = this.videoPlayerRef.nativeElement;
    this.currentTime = videoPlayer.currentTime;
    this.duration = videoPlayer.duration;

    if (
      !this.isTrimming &&
      this.isShowingTrimmedPart &&
      this.trimStart.length > 0 &&
      this.trimEnd.length > 0
    ) {
      let isInTrimmedPart = false;
      for (let i = 0; i < this.trimStart.length; i++) {
        if (
          this.currentTime >= this.trimStart[i] &&
          this.currentTime <= this.trimEnd[i]
        ) {
          isInTrimmedPart = true;
          break;
        }
      }
      if (!isInTrimmedPart) {
        videoPlayer.currentTime = this.trimStart[0];
      }
    }
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.classList.remove('trimmed');

      for (let i = 0; i < this.trimStart.length; i++) {
        if (
          this.currentTime >= this.trimStart[i] &&
          this.currentTime <= this.trimEnd[i]
        ) {
          progressBar.classList.add('trimmed');
          break;
        }
      }
    }
  }
  setCutMark() {
    const videoPlayer = this.videoPlayerRef.nativeElement;
    if (this.isTrimming) {
      this.trimEnd.push(videoPlayer.currentTime);
      this.isTrimming = false;
    } else {
      this.trimStart.push(videoPlayer.currentTime);
      this.isTrimming = true;
    }
  }
  trimVideo() {
    if (this.trimStart.length > 0 && this.trimEnd.length > 0) {
      const videoPlayer = this.videoPlayerRef.nativeElement;
      // Implement logic to trim the video using the trimStart and trimEnd values
      console.log('Video trimmed from', this.trimStart, 'to', this.trimEnd);
      this.isPlaying = true;
      this.isTrimming = false;
      this.isShowingTrimmedPart = true;
      videoPlayer.currentTime = this.trimStart[0];
      videoPlayer.play();
    } else {
      console.log('Please set both start and end cut marks before trimming.');
    }
  }
}
