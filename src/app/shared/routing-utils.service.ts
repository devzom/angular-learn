import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingUtilsService {
  constructor(private router: Router,
  ) {
  }

  appendAQueryParam(key: string,
                    value: string | number,
                    route: string = '',
                    replace: boolean = false,
                    skipChange: boolean = false
  ): void {
    this.router.navigate([route], {
      queryParams: {[key]: value},
      queryParamsHandling: "merge",
      skipLocationChange: skipChange,
      replaceUrl: replace,
    });
  }
}
