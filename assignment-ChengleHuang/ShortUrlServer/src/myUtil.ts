export const HostDomain: string = "http://xxx.com/";

class MyUtil {
  public validateUrl(str: string): boolean {
    const reg =
      /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
    return reg.test(str);
  }

  public genShortUrl(lengthLimit: number): string {
    const DemoStr: string =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let shortUrl: string = HostDomain;
    for (let i = 0; i < lengthLimit; i++) {
      const index: number = Math.floor(Math.random() * DemoStr.length);
      shortUrl += DemoStr.charAt(index);
    }
    return shortUrl;
  }
}

export const myUtil = new MyUtil();
