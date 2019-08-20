import { Color } from './color.model';
import { Subject } from 'rxjs';

export class Colors {

  private color: Color[] = [];
  newColor: Color;
  colorChange: Subject<Color> = new Subject();

  constructor() {
    this.color = [
      { name: 'red', value: '#ff0000' },
      { name: 'blue', value: '#0000ff' },
      { name: 'orange', value: '#f09243' },
      { name: 'green', value: '#54b948' },
      { name: 'magenta', value: '#FF00FF' },
      { name: 'black', value: 'rgba(0,0,0,.65)' }
    ];
  }

  getColors() {
    const color = [];
    this.color.forEach(c => {
      color.push({ name: c.name });
    });
    return color;
  }

  get(value: string) {
    const color = this.color.find(c => c.name === value);
    if (!color) {
      return 'rgba(0,0,0,.65)';
    }
    return color.value;
  }

}
