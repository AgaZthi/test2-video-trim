import { Component, ViewChild } from '@angular/core';

interface Trim {
  start: number;
  end: number;
}

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
  trimStart: number = 0;
  trims: Trim[] = [];
  isTrimming: boolean = false;

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
    const videoPlayer = this.videoPlayerRef?.nativeElement;
    if (videoPlayer) {
      this.currentTime = videoPlayer.currentTime;
      this.duration = videoPlayer.duration;

      const progressBar: HTMLElement | null =
        document.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = `${
          (this.currentTime / this.duration) * 100
        }%`;
      }

      const trimmedProgress: HTMLElement | null =
        document.querySelector('.trimmed-progress');
      if (trimmedProgress && this.trims.length > 0) {
        const firstTrim = this.trims[0];
        trimmedProgress.style.width = `${
          ((this.currentTime - firstTrim.start) / this.duration) * 100
        }%`;
      }

      if (
        this.trims.length > 0 &&
        this.currentTime >= this.trims[this.trims.length - 1].end
      ) {
        videoPlayer.currentTime = this.trims[this.trims.length - 1].end;
      }
    }
  }

  setTrim() {
    if (this.isTrimming) {
      const videoPlayer = this.videoPlayerRef.nativeElement;
      const trimEnd = videoPlayer.currentTime;
      this.trims.push({ start: this.trimStart!, end: trimEnd });
      this.isTrimming = false;
    } else {
      this.trimStart = this.videoPlayerRef.nativeElement.currentTime;
      this.isTrimming = true;
    }
  }

  seekTo(event: MouseEvent) {
    const progressBar = event.target as HTMLElement;
    const progressBarRect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - progressBarRect.left;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickX / progressBarWidth) * this.duration;

    const videoPlayer = this.videoPlayerRef.nativeElement;

    // Check if the clicked position is less than the current time
    if (seekTime < videoPlayer.currentTime) {
      // Navigate to the previous position
      videoPlayer.currentTime = seekTime;
    } else {
      // Seek to the clicked position
      videoPlayer.currentTime = seekTime;
    }
  }
}
