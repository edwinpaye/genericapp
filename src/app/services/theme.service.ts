import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = false;
  private themeSubject = new Subject<boolean>();

  public theme$ = this.themeSubject.asObservable();

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.themeSubject.next(this.darkMode);
    this.applyTheme();
  }

  private applyTheme() {
    if (this.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

}
