import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * HTTP interceptor that adds authentication token to outgoing requests
 * and handles 401 unauthorized responses
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Get the authentication token
  const token = authService.getToken();

  // Clone the request and add the Authorization header if token exists
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  // Pass the cloned request to the next handler
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized responses
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
