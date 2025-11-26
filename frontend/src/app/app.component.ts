import { Component, computed } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SiriusRidge2';

  // Track current route to determine if we should show layout
  private currentUrl = toSignal(
    this.router.events.pipe(
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  // Determine if current route is an auth route (no layout needed)
  isAuthRoute = computed(() => {
    const url = this.currentUrl();
    return url?.startsWith('/login') ||
           url?.startsWith('/register') ||
           url?.startsWith('/setup-family');
  });

  constructor(private router: Router) {}
}
