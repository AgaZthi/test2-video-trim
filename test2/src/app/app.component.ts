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
  trimStart: number | null = null;
  trimEnd: number | null = null;
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
      this.trimStart !== null &&
      this.trimEnd !== null
    ) {
      if (
        this.currentTime < this.trimStart ||
        this.currentTime > this.trimEnd
      ) {
        videoPlayer.currentTime = this.trimStart;
      }
    }
  }

  setCutMark() {
    const videoPlayer = this.videoPlayerRef.nativeElement;
    if (this.isTrimming) {
      this.trimEnd = videoPlayer.currentTime;
      this.isTrimming = false;
    } else {
      this.trimStart = videoPlayer.currentTime;
      this.isTrimming = true;
    }
  }

  trimVideo() {
    if (this.trimStart !== null && this.trimEnd !== null) {
      const videoPlayer = this.videoPlayerRef.nativeElement;
      // Implement logic to trim the video using the trimStart and trimEnd values
      console.log('Video trimmed from', this.trimStart, 'to', this.trimEnd);
      this.isPlaying = true;
      this.isTrimming = false;
      this.isShowingTrimmedPart = true;
      videoPlayer.currentTime = this.trimStart;
      videoPlayer.play();
    } else {
      console.log('Please set both start and end cut marks before trimming.');
    }
  }
}
