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

  togglePlayPause() {
    const videoPlayer = this.videoPlayerRef.nativeElement;
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  }

  ngAfterViewInit() {
    const videoPlayer = this.videoPlayerRef.nativeElement;

    videoPlayer.addEventListener('timeupdate', () => {
      this.currentTime = videoPlayer.currentTime;
      this.duration = videoPlayer.duration;
    });
  }
}
