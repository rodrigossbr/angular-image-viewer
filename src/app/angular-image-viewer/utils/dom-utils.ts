

export class DomUtils {

  public static getOffset(elem: any ) {
    return {
      offsetLeft: this.getOffsetLeft(elem),
      offsetTop: this.getOffsetTop(elem),
    }
  }

  public static getOffsetLeft(elem: any )
  {
    var offsetLeft = 0;
    do {
      if (!isNaN(elem.offsetLeft))
      {
        offsetLeft += elem.offsetLeft;
      }
    } while(elem = elem.offsetParent);
    return offsetLeft;
  }

  public static getOffsetTop(elem: any )
  {
    var offsetTop = 0;
    do {
      if (!isNaN(elem.offsetTop))
      {
        offsetTop += elem.offsetTop;
      }
    } while(elem = elem.offsetParent);
    return offsetTop;
  }
}
