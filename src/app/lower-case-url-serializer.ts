import { DefaultUrlSerializer, UrlTree } from '@angular/router';
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
      console.log(`navigating to ${url}`);
      return super.parse(url.toLowerCase());
    }
}
