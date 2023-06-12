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
  cutMarkStart: number | null = null;
  cutMarkEnd: number | null = null;

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

    if (this.cutMarkStart !== null && this.cutMarkEnd !== null) {
      if (
        this.currentTime < this.cutMarkStart ||
        this.currentTime > this.cutMarkEnd
      ) {
        videoPlayer.currentTime = this.cutMarkStart;
      }
    }
  }

  setCutMark() {
    const videoPlayer = this.videoPlayerRef.nativeElement;
    if (this.cutMarkStart === null) {
      this.cutMarkStart = videoPlayer.currentTime;
    } else if (this.cutMarkEnd === null) {
      this.cutMarkEnd = videoPlayer.currentTime;
    }
  }

  trimVideo() {
    if (this.cutMarkStart !== null && this.cutMarkEnd !== null) {
      // Implement logic to trim the video using the cutMarkStart and cutMarkEnd values
      console.log(
        'Video trimmed from',
        this.cutMarkStart,
        'to',
        this.cutMarkEnd
      );
      this.cutMarkStart = null;
      this.cutMarkEnd = null;
    } else {
      console.log('Please set both start and end cut marks before trimming.');
    }
  }
}
