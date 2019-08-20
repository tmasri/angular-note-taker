import { Font } from './font.model';
import { Subject } from 'rxjs';

export class Fonts {

  private font: Font[] = [];
  newFont: Font;
  fontChange: Subject<Font> = new Subject();

  constructor() {
    this.font = [
      { name: 'Abel', value: 'abel' },
      { name: 'Arimo', value: 'arimo' },
      { name: 'Caveat', value: 'caveat' },
      { name: 'Cinzel', value: 'cinzel' },
      { name: 'Exo', value: 'exo' },
      { name: 'Default', value: '"-apple-system,BlinkMacSystemFont","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"' }
    ];
  }

  getFonts() {
    const fonts = [];
    this.font.forEach(f => {
      fonts.push({ name: f.name });
    });
    return fonts;
  }

  get(value: string) {
    return this.font.find(c => c.name === value).value;
  }

}
